import React from "react";
import send from "../img/send.png"

const MessageForm = ({ handleSubmit, text, setText }) => {
  return (
  
    <form className='message__box' onSubmit={handleSubmit}>
    <div className='inputWrapper'>
             <input 
                type="text" 
                placeholder="Type your message" 
                className='message__input'
                value={text}
                onChange={(e) => setText(e.target.value)}
                ></input>
             <button type="submit" className='sendBtn'><img src={send} height="25" width="25"/></button>
             </div>    
        </form>
  
  );
};

export default MessageForm;
