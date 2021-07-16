#!/usr/bin/env ts-node

import { produce, Consumer } from "../lib/kafka/src/index";
import { start } from "../lib/kafka/src/service";
import { entityService } from "../src/service";

// connections
let consumers: Consumer[];

// start
export async function up() {
  consumers = await start(entityService);
}

// stop
export async function down() {
  await Promise.all(consumers.map((consumer) => consumer.disconnect()));
}

console.log("starting kafka service")
up()
  .then(() => console.log("kafka service is running"))
  .then(() => produce("entityService.saveEntity", [{ name: "Entity" }]))
  .then(down)
  .then(() => console.log("stopping service"));
