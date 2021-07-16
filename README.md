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
# it's an unfortunate quirk of this particular kafka image
# use your network ip (i.e. 192.168.0.10), not localhost/127.0.0.1
code docker-compose.yml

# start service dependencies
docker compose up

# setup your kafka environment
echo "KAFKA_NAME=entityService
KAFKA_HOST=
KAFKA_PORT=9092" >> lib/kafka/.env

# start http service
bin/http.ts

# start kafka service
bin/http.ts
```

Todo:

* HTTP request documentation (i.e. curl commands)
* [Kafka integration test](test/kafka.service.ts)
* [Http integration test](test/http.service.ts)
* Fix kafka weirdness
