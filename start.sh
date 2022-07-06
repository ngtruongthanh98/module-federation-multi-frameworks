#!/bin/bash
npm i
cd container && npm i
cd ../payment && npm i
cd ../products && npm i
cd ../ && npm run start