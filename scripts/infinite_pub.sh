#!/bin/bash

HOST=$1
TOPIC=${2:-test}

i=1
while true; do
  mosquitto_pub -h "$HOST" -t "$TOPIC" -m "hello $i"
  sleep .1
  ((i++))
done
