#!/usr/bin/env ts-node

import { entityService } from "../src/service";
import { start } from "../lib/http/src/service";

export async function up () {
  await start(entityService);
}

export async function down () {

}

up()
