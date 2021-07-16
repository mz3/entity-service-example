import { Service } from ".";

async function getUser(obj: any) {
  return { name: "Michael" };
}

export const myService = new Service("myService", { getUser });

import assert from "assert";
myService.handlers
  .getUser(1)
  .then((user) => assert.strictEqual(user.name, "Michael"));
