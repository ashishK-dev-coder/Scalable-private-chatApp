'use client'
import { useState } from 'react';
import { useSocket } from '../context/SocketContextProvider'
import classes from './page.module.css'

export default function Page() {
  const {sendMessage , messages} = useSocket();
  const [message,setMessage] = useState('')

  return (
    <div>
       <header className={classes["header"]}>
        <nav className={classes["nav"]}>
            <div className={classes["container"]}>
                <div className={classes["logo"]}>ChatApp</div>
            </div>
        </nav>
    </header>
      <div>
        <h1>All Messages will appear here</h1>
      </div>
      <div>
        <input onChange={e => setMessage(e.target.value)} className={classes["chat-input"]} placeholder="Message...."/>
        <button onClick={e => sendMessage(message)} className={classes["button"]} >Send</button>
      </div>
      <div>
        {messages.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </div>

      <footer className={classes["footer"]}>
        <div >
            <p>&copy; 2023 Your ChatApp. All rights reserved.</p>
        </div>
    </footer>

    </div>

    
     
  )
}