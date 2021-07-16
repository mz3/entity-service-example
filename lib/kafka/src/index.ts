require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

import { Kafka, KafkaConfig } from "kafkajs";

export const config: KafkaConfig = {
  clientId: process.env.KAFKA_NAME,
  brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
};
console.log(config);

export const client = new Kafka(config);

export async function getProducer() {
  const producer = client.producer();
  await producer.connect();
  return producer;
}

export const produce = async (topic: string, objects: any[]) => {
  console.log("kafka.produce", topic, objects);
  try {
    const messages = objects.map((obj) => ({ value: JSON.stringify(obj) }));
    const producer = await getProducer();
    await producer.send({
      topic,
      messages,
    });

    await producer.disconnect();
  } catch (err) {
    // TODO: handle error
    throw err;
  }
};

const CONSUMER_GROUP_ID = "test-group-id";
export const consume = async (topic: string, fn: any) => {
  try {
    console.log("creating new consumer");
    const consumer = client.consumer({ groupId: CONSUMER_GROUP_ID + topic });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    console.log("starting consumer run...");
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("kafka.consume", topic, message.value.toString());
        let val: any;
        try {
          val = JSON.parse(message.value.toString());
        } catch (err) {
          val = message.value.toString();
        }
        try {
          const result = await fn(val);
        } catch (err) {
          throw err;
        }
      },
    });
    console.log("consumer ready");
    return consumer;
  } catch (err) {
    // TODO: handle error
    throw err;
  }
};

export { Consumer, Producer } from "kafkajs";
