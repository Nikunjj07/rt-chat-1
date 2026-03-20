
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { JoinRoom } from './pages/join';
import { ChatRoom } from './pages/chatRoom';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages,setMessages] = useState(["welcome to this chat"])
  const wsRef = useRef<WebSocket>(null);


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
    document.documentElement.classList.add("dark")
    const ws = new WebSocket("ws://localhost:3000")
    ws.onmessage = (event)=>{
      setMessages( m => [...m, event.data])
    }
    wsRef.current = ws;

    ws.onopen = ()=>{
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "123" //hardcoded rn
        }
      }))
    }

    return ()=>{
      ws.close()
    }
  },[])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<JoinRoom/>}/>
          <Route path='/chat' element = {<ChatRoom/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


//todo
// websocket connection
// room joining

// browserRo
    // <div className='h-screen'>
    //   <div className='h-[89vh] p-10'> 
    //     {messages.map(message => <div className='break-words rounded-xl p-2 bg-accent text-accent-foreground max-w-xs'>
    //       <span>
    //         {message}
    //       </span>
    //     </div>) || null}
    //   </div>
    //   <div className='w-full flex max-w-[90vh] bg-card'>
    //       <input className='flex-1 p-4 bg-input ' type="text" ref={inputRef}/>
    //       <button onClick={sendMessage} className='bg-primary text-primary-foreground px-4 py-4 rounded-lg'>Send</button>
    //   </div>
    // </div>