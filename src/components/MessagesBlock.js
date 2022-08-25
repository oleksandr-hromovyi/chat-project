import React, { useEffect } from 'react'
import Message from './Message'
import {
    collection,
    query,
    onSnapshot,
    orderBy,
    limit
  } from "firebase/firestore";
  import { db } from "../firebase";
const MessagesBlock = ({msgs, sender, chat, setMsgs}) => {
    
    useEffect(()=>{
        const receiver = chat.uid;
        const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;
        const msgsRef = collection(db, "messages", id, "chat");
        const q = query(msgsRef, orderBy("createdAt", "asc"));
       
        let unsub = onSnapshot(q, (querySnapshot) => {
          let msgs = [];
          querySnapshot.forEach((doc) => {
            msgs.push(doc.data());
          });
          
          setMsgs(msgs);
        })
        
     return ()=> unsub();
    },[chat])

  return (
    <>
    {msgs.length
        ? msgs.map((msg, i) => (
            <Message key={i} msg={msg} time={msg.createdAt} sender={sender} avatar={chat.avatar} />
          ))
        : null}
        </>
  )
}

export default MessagesBlock;