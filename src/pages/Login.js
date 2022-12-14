import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { updateDoc, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { generatorMessages } from "../functions/randomConversations";

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

   const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }

  };
 
   const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
     signInWithPopup(auth, provider).then((result) => {
     const user = result.user;
   
     user.metadata.lastLoginAt - user.metadata.createdAt < 10 && generatorMessages(user.uid)

     setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
      email: user.email,
      isOnline: true,
     })


    navigate("/")
  }).catch((error) =>{
    console.log(error)
  });
}

const redirectToRegister = () => navigate("/register")
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate("/");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  return (
    <section>
      <h3>Log into your Account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn" disabled={loading}>
            {loading ? "Logging in ..." : "Login"}
          </button>
        </div>
        <div className="input_container-span">
          <span >Don't have account yet? Click <a onClick={redirectToRegister} className="input_container_link">here</a>.</span>
        
        <span>Connect with social media:</span>
        </div>
        <GoogleButton className="google_btn" onClick={handleGoogleSignIn}/>        
      </form>
    </section>
  );
};

export default Login;
