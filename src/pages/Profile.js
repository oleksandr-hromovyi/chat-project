import React, { useState, useEffect } from "react";
import avatarIcon from "../img/avatar.jpg";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";


const Profile = () => {
  
  const [user, setUser] = useState();
  
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
  }
, []);

  return user ? (

      <div className="profile_container">
       
          <img src={user.avatar || avatarIcon} alt="avatar" className="avatar" />
          <span
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          ></span>
   
        <div className="text_container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
      </div>
      </div>
  
  ) : null;
};

export default Profile;
