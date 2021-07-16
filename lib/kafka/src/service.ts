import { Service } from "../../service/src";
import { consume, produce } from ".";
import { Consumer } from "kafkajs";

const TEST_CLIENT_ID = "testClient"; // todo: make unique per-client (uuid?)
export async function start(service: Service): Promise<Consumer[]> {
  // Connect to dependencies (i.e. database)
  if (service.connect) await service.connect();

  // Attach handlers to request queues
  return await Promise.all(Object.keys(service.handlers).map(async (handlerName) => {
    const handler = service.handlers[handlerName]; // i.e. createEntity() {}
    const requestTopic = `${service.name}.${handlerName}`; // i.e. "entityService.createEntity"

    // get clientId
    const clientId = TEST_CLIENT_ID;
    console.log("start consuming", requestTopic, "with", handlerName);
    const consumer = await consume(requestTopic, async (requestObj: any) => {
      console.log("start received request", requestObj);
      const responseObj = await handler(requestObj);
      const responseTopic = `${service.name}.${handlerName}.${clientId}`;
      console.log('sending response to', responseTopic)
      await produce(responseTopic, [responseObj]);
    });

    return consumer;
  }));
}

export async function client(
  service: Service,
  clientId: string = TEST_CLIENT_ID
): Promise<any> {
  // Create RPC client
  const client = Object.keys(service.handlers).reduce((client, handlerName) => {
    // Request queue
    const requestTopic = `${service.name}.${handlerName}`; // i.e. "entityService.createEntity"

    // Response queue
    const responseTopic = `${service.name}.${handlerName}.${clientId}`;

    // Create RPC request/reply function for each handler
    client[handlerName] = async (requestObj: any) => {
      console.log("rpc client handler called with object", requestObj);
      const responseObj = await new Promise(async (resolve, reject) => {
        try {
          // Connect to response queue
          console.log("client connecting to response queue", responseTopic);
          const consumer = await consume(
            responseTopic,
            async (responseObj: any) => {
              console.log("client received response", responseObj);
              resolve(responseObj);
              await consumer.disconnect();
            }
          );
          console.log("client response queue ready for messages")

          // Send request objects to request queue
          console.log(
            "client sending request",
            requestTopic,
            Object.assign({ _clientId: clientId }, requestObj)
          );
          await produce(requestTopic, [
            Object.assign({ _clientId: clientId }, requestObj),
          ]);
        } catch (err) {
          reject(err);
        }
      });

      return responseObj;
    };
    return client;
  }, {});
  return client;
}
