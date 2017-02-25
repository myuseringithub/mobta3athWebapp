#!/usr/bin/env bash

production.stack() {
    # 1.
    docker-machine ssh $VM-1
    VolumeBasePath=/mnt/datadisk-1/rethinkdb
    sudo mkdir -p $VolumeBasePath/rethinkdbData

    # 2.
    docker stack deploy -c ./setup/container/production.dockerStack.yml educationwebapp
}

development() {
    # DOESN'T WORK
    # fix issue caused by virtualbox & Windows apparently that don't support sync directory - https://forums.docker.com/t/issues-with-rethinkdb-example-using-volumes/13720/4
    # Download exe and run exe - https://www.rethinkdb.com/docs/install/windows/
    # grab the files created in new directory to the volume that will be mounted to the container.

    # . 
    export DEPLOYMENT=development
    docker-compose -f ./setup/container/development.dockerCompose.yml up -d 
}

deployment.buildDistribution() { # ⭐
    # development / production
    export DEPLOYMENT=production
    docker-compose -f ./setup/container/deployment.dockerCompose.yml up buildDistributionCode
}

deployment.buildImage() { # ⭐
    # 1. development / production
    export DEPLOYMENT=production
    # export DEPLOYMENT=development
    # export COMPOSE_PROJECT_NAME= # Not needed as name is taken from image field.

    # 2. Build Source COde:
    ./setup/run.sh deployment.buildDistribution

    # 3.
    # Problem cannot pass arguments to dockerfile
    docker-compose -f ./setup/container/deployment.dockerCompose.yml build --no-cache buildImage

    # 4. tag image and push
}

# Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/run.sh <functionName>".
$@
