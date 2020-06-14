import express from "express";

const routes = express.Router();

routes.post("/certifications", async (req, res) => {
  await req.producer.send({
    topic: "issue-certificate",
    messages: [
      {
        value: JSON.stringify({
          id: new Date(),
          user: { id: 1, name: "andré" },
          course: "Kafka",
          grade: 5,
        }),
      },
    ],
  });

  // call service
  return res.json({ ok: true });
});

export default routes;
