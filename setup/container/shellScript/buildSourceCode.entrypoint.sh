#!/bin/bash
set -ex; 
echo "Deploying as ${DEPLOYMENT}";

gulp -v;

cd /tmp/build/gulp_buildTool

# ⭐ install dependencies / node modules (from packages.json) in working directory "/tmp/build/gulp_buildTool/" & update to latest versions
npm install; npm install --only=dev; npm update;
(cd /tmp/appDeploymentLifecycle/gulp_buildTool; 
    npm install; npm install --only=dev; npm update;)
(cd /tmp/appDeploymentLifecycle/babel_javascriptTranspilation; 
    npm install; npm install --only=dev; npm update;)

./run.sh build

echo "Gulp watch ? ";
if [ "$DEPLOYMENT" = "development" ]; then
    ./run.sh watch
fi

echo "Debug purposes:";
(cd /app/serverSide; ls -a)
(cd /app/serverSide/node_modules/appscript/; ls -a)

# ⭐ call docker-compose command after entrypoint as they are passed as arguments when entrypoint is set.
exec "$@"
