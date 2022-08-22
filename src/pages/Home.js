import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import Navbar from "../components/Navbar";
import { getAnswer } from "../answerBot";
import MessagesBlock from "../components/MessagesBlock";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [search, setSearch] = useState("");

  const sender = auth.currentUser.uid;
  
  useEffect(() => {
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", "not-in", [sender]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
   });
    return () => unsub();
  }, [sender]);

  const selectUser = async (user) => {
    setSearch('');
    setChat(user);
    const receiver = user.uid;
    const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;
    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));
   
    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== sender) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setText("");

    const receiver = chat.uid;
    const status = chat.status;
    const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;
 
    if (text.length > 0) {
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: sender,
      to: receiver,
      createdAt: Timestamp.fromDate(new Date()),
   
    });
    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: sender,
      to: receiver,
      createdAt: Timestamp.fromDate(new Date()),
      unread: true,
    });
  }

  status === "bot" && setTimeout(()=>getAnswer(receiver, sender,id), 5000);

}



let filteredUsers = users.filter((user)=>{
  return user.name.toLowerCase().indexOf(search.toLowerCase())>-1;
})


  return (
    <>
    <Navbar chat={chat} />
    <div className="home_container">
      <div className="users_container">
      <div className='search__panel'>
        <input 
          type="text" 
          placeholder="Search or start new chat" 
          className='search__input'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ></input>
            <div className="chats">Chats</div>
    </div>
  
    {search ? (filteredUsers.map((user) => (
        <User
          key={user.uid}
          user={user}
          selectUser={selectUser}
          sender={sender}
          chat={chat}
        />
    ))) : (users.map((user) => (
        <User
          key={user.uid}
          user={user}
          selectUser={selectUser} 
          sender={sender}
          chat={chat}
         
        />
      ))

    )}
    </div>
      <div className="messages_container">
        {chat ? (
          <>
                <div className="messages">
                  <MessagesBlock msgs={msgs} chat={chat} sender={sender} setMsgs={setMsgs}/>
             
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation...</h3>
        )}
      </div>
    </div>
    </>
  );
};



export {Home};
