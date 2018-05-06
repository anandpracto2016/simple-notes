#!/bin/bash
rm -rf ./build

echo '-----------------------------------------'
echo 'Building scripts in [ DEVELOPMENT ] mode'
echo '-----------------------------------------'

NODE_ENV=development node tools/build/index.js --watch &
echo '\n=> Waiting for build to complete ... \n\n'

spin='-\|/'
i=0

run_server=true

while :
do
  i=$(( (i+1) %4 ))
  printf "\r${spin:$i:1}"
  if [ -d "build/javascripts" ] && [ $run_server ]; then
    echo '\n--------------------------------------------------------'
    echo 'Build completed. Starting server in [ DEVELOPMENT ] mode'
    echo '--------------------------------------------------------\n'
    run_server=false
    pm2 start pm2/pm2.dev.config.js --watch --no-daemon
    break
  fi
  sleep 0.1
done

# trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
