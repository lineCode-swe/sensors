"use strict";
exports.__esModule = true;
var ws = require('ws');
var WebSocket = require("ws");
/*
enum OBJECTS {
    FREE = 0,
    BASE = 1,
    POI = 2,
    FURNISH = 3
}
*/
var obstacles = [];
var wss = new ws.Server({ port: 8082 }, function () {
    console.log("WebSocket Server Listening to port 8082!");
});
function broadcastData() {
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            console.log("Sending data");
            client.send(JSON.stringify(obstacles));
        }
    });
}
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        var JSONmessage = JSON.parse(message);
        var new_obs_pos = { "x": JSONmessage.x, "y": JSONmessage.y };
        if (JSONmessage.cmd == "add") {
            obstacles.push(new_obs_pos);
            broadcastData();
        }
        else if (JSONmessage.cmd == "del") {
            obstacles.forEach(function (obstacle) {
                if (obstacle.x == JSONmessage.x && obstacle.y == JSONmessage.y) {
                    obstacles.splice(obstacle, 1);
                }
                broadcastData();
            });
        }
    });
});
/*
msg prototype
{ "cmd": "add", "x": "2", "y": "4" }
{ "cmd": "del", "x": "2", "y": "4" }
*/
