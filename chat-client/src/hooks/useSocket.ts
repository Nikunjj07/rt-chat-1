import { useSocketContext } from "../context/SocketProvider";

export function useSocket(){
    const socket = useSocketContext()

    const sendMessage = (data : string)=>{
        if (!socket.ws){
            console.log("socket not present")
            return
        }else{
            sendMessage(data)
        }
    }

    return { socket, sendMessage}

}