import { NavBar } from "../components/Navbar"
import { useSocket } from "../hooks/useSocket"
import { useSocketContext } from "../context/SocketProvider"
import { useRef } from "react";

export const ChatRoom = ()=>{
    const { messages } = useSocketContext();
    const inputRef = useRef<HTMLInputElement>(null);
    const { sendMessage } = useSocket();

    function MessageLogic(){
        const inputMessage = inputRef.current?.value
        sendMessage(inputMessage || "")
        if (inputRef.current) inputRef.current.value = "";
    }

    return(
        <div className="bg-black flex flex-col h-screen">
            <NavBar/>
            <div className="bg-background h-full flex">
                <div className="flex w-full items-center justify-center">
                    <div className="bg-card text-foreground rounded-lg shadow-md w-[100vh] h-[80vh] flex flex-col p-5 ">
                        <h2 className="text-2xl font-semibold">Room</h2>
                        <div className="border border-ring h-full rounded-lg p-5 overflow-y-auto">
                            <div className="">
                                {messages.map((message, i) => <div key={i} className='break-words max-w-xs px-4 py-2 mt-2 rounded-xl bg-primary text-primary-foreground'>
                                   <span>
                                     {message}
                                   </span>
                                 </div>) || null}
                            </div>
                        </div>
                        <div className="p-5 flex justify-center flex-row ">
                            <input type="text" ref={inputRef} id="roomId" placeholder="Hello There!" className="bg-input h-[5vh]  w-full px-3 py-2 rounded border border-input bg-background text-foreground 
                            placeholder:text-muted-foreground 
                            focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring 
                            transition"/>
                            <br />
                            <button onClick={MessageLogic} className="bg-primary text-primary-foreground px-4 py-2 rounded">Join</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}