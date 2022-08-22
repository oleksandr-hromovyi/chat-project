import { loremIpsum } from "lorem-ipsum";
import { auth, db } from "./firebase";
import {addDoc, collection, setDoc, doc} from "firebase/firestore";

let recievers = [
    "ExfvrKZjtqMVpXAQnS3Z",
    "HWn6JnuReOD7TxSi96uV",
    "U0jaSPP4nftU8IZWWBsp",
    "c9UEUzmn0KBNFJiYrmmR",
]

let RandomDate=function(rangeOfDays,startHour,hourRange){
    let today = new Date(Date.now());
    return new Date(today.getYear()+1900,today.getMonth(), today.getDate()+Math.random() *rangeOfDays, Math.random()*hourRange + startHour, Math.random()*60)
}

let generatorMessages= (senderId) =>{

    let ids = recievers.map((item)=>{
            let id =  senderId > item ? `${senderId + item}` : `${item + senderId}`;
            const reciever = item;
        return {id, reciever};
    })

    let generateMessages = async(reciever, id) => {
        let loremSender =  loremIpsum(1);
        let loremReciever = loremIpsum(2);
        let randomDate = RandomDate(0,1,8);
        

        await  addDoc(collection(db, "messages", id, "chat"), {
            text: loremReciever,
            from: reciever,
            to: auth.currentUser.uid,
            createdAt: randomDate,
            
           })

         await setDoc(doc(db, "lastMsg", id), {
            text: loremSender,
            from: auth.currentUser.uid,
            to: reciever,
            createdAt: new Date(),
            unread: true,
        });

        await  addDoc(collection(db, "messages", id, "chat"), {
            text: loremSender,
            from: auth.currentUser.uid,
            to: reciever,
            createdAt: new Date(),
        
           })
    }

    let generatorMessages = ids.forEach((item) =>{
        return generateMessages(item.reciever, item.id)
    })     
    
}

export {generatorMessages}