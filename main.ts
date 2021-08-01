const ws = require('ws');
import * as WebSocket from 'ws';
/*
enum OBJECTS {
    FREE = 0,
    BASE = 1,
    POI = 2,
    FURNISH = 3
}
*/
const obstacles: any = [];

const wss = new ws.Server({ port: 8082 }, () => {
    console.log("WebSocket Server Listening to port 8082!");
});

function broadcastData(): void {
    wss.clients.forEach(function each(client: any) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            console.log("Sending data");
            client.send(JSON.stringify(obstacles));
        }     
    })
}

wss.on('connection', function connection(ws: any) {
    ws.on('message', function incoming(message: any) {
        console.log('received: %s', message);
        let JSONmessage = JSON.parse(message);
        let new_obs_pos = { "x": JSONmessage.x, "y": JSONmessage.y };
        if(JSONmessage.cmd == "add") {
            obstacles.push(new_obs_pos);
            broadcastData();
        } else if(JSONmessage.cmd == "del") {
            obstacles.forEach(function (obstacle: any) {
                if(obstacle.x == JSONmessage.x && obstacle.y == JSONmessage.y) {
                    obstacles.splice(obstacle, 1);
                }
                broadcastData();
            });
        }
    })
});

/*
msg prototype
{ "cmd": "add", "x": "2", "y": "4" }
{ "cmd": "del", "x": "2", "y": "4" }
*/

