import {
    collection,
    addDoc,
    setDoc,
    doc,
    serverTimestamp
  } from "firebase/firestore";
import { db } from "../firebase";

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
            text: ChuckJoke,
            from: receiver,
            to: sender,
            createdAt: serverTimestamp(),
        })

          await setDoc(doc(db, "lastMsg", id), {
          text: ChuckJoke,
          from: receiver,
          to: sender,
          createdAt: serverTimestamp(),
          unread: true,
        });
    } catch (error) {
        console.error(error);
    }
}

export {getAnswer}