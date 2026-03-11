
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const inputRef = useRef();
  const [socket, setSocket] = useState<WebSocket>()

  function sendMessage(){
    if (!socket){
      console.log("socket not present")
      return
    }
    const message = inputRef.current.value
    socket?.send(message)
  }

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:3000")
    setSocket(ws)
  },[])

  return (
    <>
      <input type="text" placeholder='hello' ref={inputRef}/>
      <button onClick={sendMessage}>Send</button>

      <div  id='history'></div>
    </>
  )
}

export default App
