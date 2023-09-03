#!/bin/bash

yarn build
scp -r dist/* pi@home.local:/var/www/html
