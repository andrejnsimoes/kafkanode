import express from "express";
import { Kafka, logLevel } from "kafkajs";
import routes from "./routes";

const app = express();

// broker should have a different name, but we are running on localhost 
const kafka = new Kafka({
  clientId: "api",
  brokers: ["localhost:9092"],
  logLevel: logLevel.NOTHING
});


// share producer/producer with the routes
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'certificate-group-receiver' });

app.use((req, res, next) => {
  req.producer = producer;
  req.consumer = consumer;
  
  return next();
});

app.use(routes);

async function run() {
  await producer.connect();

  await consumer.connect();
  await consumer.subscribe({ topic: 'certificate-response', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

    console.log(`[main-service]${message.value}`);

      // console.log({
      //   partition,
      //   offset: message.offset,
      //   value: message.value.toString(),
      // })
    },
  });

  app.listen(3333);
}

run().catch(console.error);
