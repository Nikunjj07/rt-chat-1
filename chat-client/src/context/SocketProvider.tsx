import { createContext, useContext, useEffect, useState, type ReactNode } from "react";


type SocketContextType = {
  ws: WebSocket | null;
  messages: string[];
  sendMessage: (message: string) => void;
};

const SocketContext = createContext<SocketContextType>({
    ws: null,
    messages: [],
    sendMessage: ()=>{}
})

export function SocketProvider( {children} : {children : ReactNode} ){
    const [ws, setWs] = useState<WebSocket | null>(null)
    const [messages,setMessages] = useState(["welcome to this chat","welcome to this chat"])

    useEffect(()=>{
        const socket = new WebSocket("ws://localhost:3000")
        setWs(socket);
    
        socket.onopen = ()=>{
          console.log("socket connected")
        }
        socket.onmessage = (e)=>{
            const data = JSON.parse(e.data)
            switch (data.type){
                case "chat":
                    setMessages((prev) => [...prev, data.payload.message]);
                    break
                case "join":

                    break
            }
        }
        
        socket.onclose = () => console.log("Disconnected");

        return ()=>{
          socket.close()
        }
      },[])
      const sendMessage = (message: string) => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: "chat", payload:{message}}));
            }
      };


    return(
        <SocketContext.Provider value={{ws, messages, sendMessage}}>
            {children}
        </SocketContext.Provider>
    )
}

export function useSocketContext() {
  return useContext(SocketContext);
}