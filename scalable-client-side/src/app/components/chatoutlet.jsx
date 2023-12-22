
'use client'
import { useState } from 'react';
import { useSocket } from '../../context/SocketContextProvider'

const ChatOutlet = () => {
  const {sendMessage , messages} = useSocket();
  const [message,setMessage] = useState('')

  return (
    
    <section className="p-4 bg-white rounded shadow-md" >

     <div>
        <input className="text-black" onChange={e => setMessage(e.target.value)} placeholder="Message...."/>
     </div>

        <div>
           <button className="text-black" onClick={e => sendMessage(message)} >Send</button>
        </div>

      <div className="text-black" >
        {messages.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </div>
    </section>
  )
}

export default ChatOutlet;




// import React from 'react';

// const ChatOutlet = () => {
//   return (
//     <section className="p-4 bg-white rounded shadow-md">
//       <div>
//         <input onChange={e => setMessage(e.target.value)} className={classes["chat-input"]} placeholder="Message...."/>
//         <button onClick={e => sendMessage(message)} className={classes["button"]} >Send</button>
//       </div>

//       <div>
//         {messages.map((e) => (
//           <li key={e}>{e}</li>
//         ))}
//       </div>
//     </section>
//   );
// }
