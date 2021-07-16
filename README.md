# Entity Manager Service example

Requirements:

* node+yarn
* docker+compose
* ports 5432 and 9092 available

Key concepts:

* [Service class definition](lib/service/src/index.ts)
* [Entity service class instance](src/service.ts)
* [Express service factory](lib/http/src/service.ts)
* [Kafka service factory](lib/kafka/src/service.ts)

Getting started:

```bash
# install yarn deps (root and package folders)
# todo: refactor (lerna?)
for dir in . lib/*; do (cd $dir && yarn)

# set your private ip in docker-compose.yml
code docker-compose.yml

# start service dependencies
docker compose up

# start http service
bin/http.ts

# start kafka service
bin/http.ts
```
