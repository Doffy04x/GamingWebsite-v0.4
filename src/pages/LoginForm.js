import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './login.css'; // Import your CSS file

const firebaseConfig = {
  apiKey: "AIzaSyAbiIBs16w1xT-7jnepaN2DvWu2t_6E7yg",
  authDomain: "tic-tac-toe-88718.firebaseapp.com",
  projectId: "tic-tac-toe-88718",
  storageBucket: "tic-tac-toe-88718.appspot.com",
  messagingSenderId: "340009264879",
  appId: "1:340009264879:web:c90a8685a907ceb9f9dd1a",
  measurementId: "G-WQ71DDGXH8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const LoginForm = () => {
  useEffect(() => {
    const loginText = document.querySelector(".title-text .login");
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector("label.login");
    const signupBtn = document.querySelector("label.signup");
    const signupLink = document.querySelector("form .signup-link a");

    const handleSignupClick = () => {
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
    };

    const handleLoginClick = () => {
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    };

    const handleSignupLinkClick = () => {
      signupBtn.click();
      return false;
    };

    signupBtn.addEventListener('click', handleSignupClick);
    loginBtn.addEventListener('click', handleLoginClick);
    signupLink.addEventListener('click', handleSignupLinkClick);

    return () => {
      signupBtn.removeEventListener('click', handleSignupClick);
      loginBtn.removeEventListener('click', handleLoginClick);
      signupLink.removeEventListener('click', handleSignupLinkClick);
    };
  }, []);


  const [loginMessage, setLoginMessage] = useState('');
  const [signupMessage, setSignupMessage] = useState('');




  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoginMessage('Logged in successfully!');
      setTimeout(() => {
        setLoginMessage('');
        window.location.href = '/games';
      }, 2000);
    } catch (error) {
      setLoginMessage('Email or password is incorrect.');
      setTimeout(() => {
        setLoginMessage('');
      }, 2000);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const confirmPassword = e.target[2].value;

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setSignupMessage('Signed up successfully! Please log in.');
      setTimeout(() => {
        setSignupMessage('');
        window.location.href = '/SignIn';
      }, 2000);
    } catch (error) {
      setSignupMessage('Error signing up. Please try again.');
      setTimeout(() => {
        setSignupMessage('');
      }, 2000);
    }
  };


  return (
    <div className="wrapper">
      {loginMessage && <div className="login-message">{loginMessage}</div>}
      {signupMessage && <div className="signup-message">{signupMessage}</div>}

      <div className="title-text">
        <div className="title login">Login Form</div>
        <div className="title signup">Signup Form</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" defaultChecked />
          <input type="radio" name="slide" id="signup" />
          <label htmlFor="login" className="slide login">Login</label>
          <label htmlFor="signup" className="slide signup">Signup</label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          <form action="#" className="login" onSubmit={handleLoginSubmit}>
            <div className="field">
              <input type="text" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">Not a member? <a href="">Signup now</a></div>
          </form>
          <form action="#" className="signup" onSubmit={handleSignupSubmit}>
            <div className="field">
              <input type="text" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Confirm password" required />
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Signup" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default LoginForm;