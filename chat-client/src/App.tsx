
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages,setMessages] = useState(["welcome to this chat"])
  const wsRef = useRef<WebSocket>();

  function sendMessage(){
    if (!wsRef.current){
      console.log("socket not present")
      return
    }
    const message = inputRef.current?.value || ""
    const SendMessage = JSON.stringify({
      type: "chat",
      payload:{
        message: message
      }
    })
    wsRef.current.send(SendMessage)
  }

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:3000")
    ws.onmessage = (event)=>{
      setMessages( m => [...m, event.data])
    }
    wsRef.current = ws;

    ws.onopen = ()=>{
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "123"
        }
      }))
    }

    return
  },[])

  return (
    <div className='h-screen bg-black p-10'>
      <div className='h-[89vh]'> 
        {messages.map(message => <div className='break-words rounded-xl p-2 mt-1 bg-white text-black w-fit max-w-xs'>
          <span>
            {message}
          </span>
        </div>)}
      </div>
      <div className='w-full bg-white flex'>
          <input className='flex-1 p-4' type="text" ref={inputRef}/>
          <button onClick={sendMessage} className='p-4 bg-blue-300'>Send</button>
      </div>
    </div>
  )
}

export default App


//todo
// websocket connection
// room joining