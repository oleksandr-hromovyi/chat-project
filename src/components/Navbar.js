import React, { useContext } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";
import avatarIcon from "../img/avatar.jpg";
import Profile from "../pages/Profile";
import logOut from '../img/logOut.png'

const Navbar = ({chat}) => {
 
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.replace("/login");
  };

  return (
    <nav>
      <div className="sender_section">
      <Profile user={user}/>
      <div className="btn_blockLogOut">
        {user ? (
            <button className="btn_logOut" onClick={handleSignout}>
              <img src={logOut} alt="logOut"/>
            </button>
        ) : null }
      </div>
      </div> 
      <div className="recipient_section">{ chat ? (
        <>
        <div style={{position: "absolute"}}>
      <img src={chat.avatar || avatarIcon} alt="avatar" className="avatar" />
      <span
            className={`user_status ${chat.isOnline ? "online" : "offline"}`}
          ></span>
      <h3 className="recipient_section--name">{chat.name}</h3></div></>
      ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
