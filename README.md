# telemetry-client

## Prerequisites
Downloading and Running the Telemetry Server

git clone https://github.com/nasa/openmct-tutorial.git<br>
cd openmct-tutorial<br>
npm install<br>
npm start<br>
This will expose two endpoints<br>
● http://localhost:8080/history​- An http server for “historical” data queries.<br>
● ws://localhost:8080/realtime​- A websocket endpoint for subscribing to realtime data.<br>

You will need to add the following to ​example-server/server.js<br>

app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin",
"http://localhost:3000"); res.header("Access-Control-Allow-Headers", "Origin,
X-Requested-With, Content-Type, Accept"); next();
+});

## Clone
git clone https://github.com/shefalijoshi/telemetry-client.git <br>
cd openmct-tutorial<br>

## Installation
cd telemetry-client<br>
npm install<br>
npm run build<br>

View the client by launching the following in your web browser: http://localhost:3000


