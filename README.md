# telemetry-client

## Prerequisites
Downloading and Running the Telemetry Server
git clone ​https://github.com/nasa/openmct-tutorial.git
cd openmct-tutorial
npm install
npm start
This will expose two endpoints
● http://localhost:8080/history​- An http server for “historical” data queries.
● ws://localhost:8080/realtime​- A websocket endpoint for subscribing to realtime data.

You will need to add the following to ​example-server/server.js

app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin",
"http://localhost:3000"); res.header("Access-Control-Allow-Headers", "Origin,
X-Requested-With, Content-Type, Accept"); next();
+});

## Clone
git clone ​https://github.com/nasa/openmct-tutorial.git cd openmct-tutorial

## Installation
cd telemetry-client
npm install
npm run build

View the client by launching the following in your web browser: http://localhost:3000


