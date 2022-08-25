import React, { useRef, useEffect } from "react";
import Moment from "react-moment";


const Message = ({ msg, sender, avatar, time }) => {

  const scrollRef = useRef();
  const isOwnMessage = msg.from === sender;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  return (
    <div className={`${!isOwnMessage ? "messageComponent" : "" }` }>
    <img src={avatar} alt="avatar" className="avatar" style={{display: `${isOwnMessage ?'none': "block" }`}}/>
    <div className={`message_wrapper ${isOwnMessage  ? "own" : ""}`} ref={scrollRef}>
        <p className={isOwnMessage  ? "me" : "friend"}>{msg.text}</p>
         <small><Moment format="M/DD/YY  h:mm:ss a ">{ time?.toDate()}</Moment></small>
    </div>
    </div>
  );
};

export default Message;
