import { useState } from "react";
import { NavBar } from "../components/Navbar"
import { useSocket } from "../hooks/useSocket";

export const JoinRoom = ()=>{
    const [roomId, setRoomId] = useState("");
    const { joinRoom } =useSocket();
    
    function sendJoinRoom(){
        joinRoom(roomId)
    }

    return(
        <div className="bg-black flex flex-col h-screen">
            <div>
                <NavBar/>
            </div>
            <div className="bg-background h-full flex">
                <div className="flex w-full items-center justify-center">
                    <div className="bg-card text-foreground rounded-lg shadow-md w-[50vh] h-[50vh] flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-semibold">Create /Join Room</h2>
                        <div className="w-[40vh] h-[40vh] flex justify-center flex-col">
                            <input onChange={(e)=>{
                                setRoomId(e.currentTarget.value)
                            }} type="text" id="roomId" placeholder="RoomId" className="bg-input h-[5vh]  w-full px-3 py-2 rounded-md border border-input bg-background text-foreground 
                            placeholder:text-muted-foreground 
                            focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring 
                            transition"/>
                            <br />
                            <button onClick={sendJoinRoom} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">Join</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}