#!/bin/bash

yarn build

if [ $? -ne 0 ]
then
    echo Build error
    exit 1
fi

ping -t 1 -c 1 home.local > /dev/null

if [ $? -eq 0 ]
then
    # Antho
    TARGET=pi@home.local:/var/www/html
else
    # Papa
    TARGET=bb@192.168.1.222:/var/www/html
fi

scp -r dist/* $TARGET

