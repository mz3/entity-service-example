// database
import { createConnection, getConnection } from "typeorm";

// service
import { Service } from "../lib/service/src";
import { Entity } from "./entity/Entity";

// example handler
async function saveEntity(obj: Entity) {
  const connection = getConnection();
  const entity = connection.manager.save(Entity, obj);
  console.log(`Saved entity to database`, {entity})
  return entity;
}

// define and export service
export const entityService = new Service(
  "entityService",
  { saveEntity },
  () => createConnection(),
);
