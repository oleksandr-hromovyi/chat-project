import React, { useEffect, useState } from "react";
import avatarIcon from "../img/avatar.jpg";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

const User = ({ sender, user, selectUser, chat }) => {
  const receiver = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div className={`user_wrapper ${chat.name === user.name ? "selected_user" : ""}`}
            onClick={() => {selectUser(user)}}>
        <div className="user_info">
          <div className="user_detail">
            <img src={user.avatar || avatarIcon} alt="avatar" className="avatar" />
            <span className={`user_status ${user.isOnline ? "online" : "offline"}`}></span>
          </div>
          <div className="box"><div className="innerBox" >
            <h4>{user.name}</h4>
            {data && (
              <Moment format="MMM D, YYYY">{data.createdAt.toDate()}</Moment>)}
          </div>
          <div className="innerBox second">
             {data ? (
             <p className="truncate">
             {data.text.slice(0,50)+"..."}
             </p>) : null}
            {data?.from !== sender && data?.unread && (
              <small className="unread">New</small>
            )}
          </div>
          </div>
      </div>
      </div>
    </>
  );
};

export default User;
