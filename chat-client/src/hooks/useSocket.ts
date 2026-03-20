import { useSocketContext } from "../context/SocketProvider";

export function useSocket(){
    const socket = useSocketContext()

    const sendMessage = (data : string)=>{
        if (!socket.ws){
            console.log("socket not present")
            return
        }else{
            socket.sendMessage(data)
        }
    }

    const joinRoom = (data: string)=>{
        if (!socket.ws){
            console.log("socket not present")
            return
        }else{
            socket.ws.send(JSON.stringify({
                type: "join",
                payload:{
                    roomId : data
                }
            }))
        }
    }

    return { socket, sendMessage, joinRoom}

}