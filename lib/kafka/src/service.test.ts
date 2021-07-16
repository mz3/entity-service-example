import { myService } from "../../service/src/index.test";
import { start, client } from "./service";
import assert from "assert";

(async () => {
  await start(myService) // service is now running
  
  await client(myService).then(myKafkaService => {
    myKafkaService.getUser({id: 1}).then((user) => {
      console.log('RECEIVED RESPONSE!!!', user);
      return assert.strictEqual(user.name, "Michael");
    });
  })
})();
