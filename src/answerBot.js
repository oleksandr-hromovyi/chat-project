import {
    collection,
    addDoc,
    Timestamp,
    setDoc,
    doc,
  } from "firebase/firestore";
import { db } from "./firebase";

let getData= async() => {
    const promise = await fetch('https://api.chucknorris.io/jokes/random')
    const result = await promise.json();
 const data = await result.value;
return data;
}
 
 
  async function getAnswer(receiver, sender, id){
   
    let ChuckJoke = await getData();
      try {
        await addDoc(collection(db, "messages", id, "chat"), {
            from: receiver,
            to: sender,
            text: ChuckJoke,
            createdAt: Timestamp.fromDate(new Date())

       
        })
        await setDoc(doc(db, "lastMsg", id), {
          text: ChuckJoke,
          from: receiver,
          to: sender,
          createdAt: Timestamp.fromDate(new Date()),
          unread: true,
        });
    } catch (error) {
        console.error(error);
    }
}

export {getAnswer}