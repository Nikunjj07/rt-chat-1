import type { WebSocket } from "ws";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port : 3000});

const allSockets : WebSocket[] = [];

wss.on("connection",(socket)=>{
    allSockets.push(socket);

    socket.on("message", (e)=>{
        console.log(e.toString());
        allSockets.forEach(s => {
            s.send(e.toString() + ":sent from server")
        })
    })
})  