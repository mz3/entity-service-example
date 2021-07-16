import { produce, consume } from "./index";

const TOPIC_NAME = "test";
const TOPIC_HANDLER = async (obj) => {
  obj.foo = new Date();
  obj.bar = Math.round(Math.random() * 100)
  console.log(obj)
  return obj;
}
const interval = setInterval(() => {
  produce(TOPIC_NAME, [{ name: "michael" }]);
}, 2000);

consume(TOPIC_NAME, TOPIC_HANDLER).then(consumer => {
  setTimeout(async () => {
    clearInterval(interval);
    await consumer.disconnect();
  }, 9000);
  
});
