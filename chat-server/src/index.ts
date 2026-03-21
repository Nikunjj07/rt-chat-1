import { parseJsonText } from "typescript";
import type { WebSocket } from "ws";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port : 3000});

interface User {
    [roomId : string] : WebSocket[]
}

let allSockets : User = {}

wss.on("connection",(socket)=>{
    socket.on("message",(message)=>{

        const parsedMessage = JSON.parse(message as unknown as string)

        if(parsedMessage.type === "join"){
            const roomId = parsedMessage.payload.roomId;
            if(!allSockets[roomId]){
                allSockets[roomId] = []
            }

            allSockets[roomId].push(socket);
            console.log(allSockets)
        }

        if(parsedMessage.type === "chat"){

            let currentRoom = "";
            for (const roomId in allSockets){
                if(allSockets[roomId]?.includes(socket)){
                    currentRoom = roomId;
                    break;
                }
            }

            if(!currentRoom) return;
            
            allSockets[currentRoom]?.forEach(sock =>{
                sock.send(JSON.stringify(parsedMessage))
            })
                
        }
    })
})  