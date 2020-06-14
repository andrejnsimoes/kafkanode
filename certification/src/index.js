const { Kafka, logLevel } = require("kafkajs");

const kafka = new Kafka({
  clientId: "certificate",
  brokers: ["localhost:9092"],
  logLevel: logLevel.NOTHING
});

const consumer = kafka.consumer({ groupId: "certificate-group" });
const producer = kafka.producer();

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "issue-certificate", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const payload = JSON.parse(message.value);

      setTimeout(() => {
        producer.send({
          topic: "certificate-response",
          messages: [
            {
              value: `[${payload.id}] Certificate generated: ${payload.course} | User: ${payload.user.name}`,
            },
          ],
        });

        console.log(
          `[certification-service][${payload.id}] Received to generate: ${payload.course} | User: ${payload.user.name}`
        );

      }, 3000);

      //   console.log({
      //     partition,
      //     offset: message.offset,
      //     value: message.value.toString(),
      //   });
    },
  });
};

run().catch(console.error);
