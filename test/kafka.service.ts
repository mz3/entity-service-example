// import { start } from "../lib/kafka/src/service";
import { entityService } from "../src/service";

// start(entityService)

import { produce } from "../lib/kafka/src/index";
produce("entityService.saveEntity", [{ name: "Entity" }])
