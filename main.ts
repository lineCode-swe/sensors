/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

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
Comando per collegarsi ai sensori e inviare informazioni => websocat ws://127.0.0.1:8082
Prototipi di messaggio per i sensori:
{ "cmd": "add", "x": "1", "y": "2" }
{ "cmd": "add", "x": "3", "y": "2" }
{ "cmd": "del", "x": "1", "y": "2" }
{ "cmd": "del", "x": "3", "y": "2" }
Per creare nuovi ostacoli => sostituire le coordinate x e y
*/

