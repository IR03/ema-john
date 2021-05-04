import React from 'react';

import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: ''

  });
  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  //Google sign in
  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  //Google sign out
  const googleSignOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  //fb sign in
  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  //form validation
  const handleSubmit = (event) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })

    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
    })

}
event.preventDefault();

  }

  const handleResponse = (res, redirect) =>{
    setUser(res);
        setLoggedInUser(res);
        if(redirect){
          history.replace(from);
        }
  }

//collect value from input & detect field
const handleBlur = (event) => {
  // console.log(event.target.name,event.target.value);
  let isFormValid = true;
  if (event.target.name === 'email') {
    isFormValid = /\S+@\S+\.\S+/.test(event.target.value);

  }
  if (event.target.name === 'password') {
    const isPasswordValid = event.target.value.length > 6;
    const passwordHasNumber = /\d{1}/.test(event.target.value);
    isFormValid = isPasswordValid && passwordHasNumber;

  }
  if (isFormValid) {
    // [...cart, newItem]
    const newUserInfo = { ...user };
    newUserInfo[event.target.name] = event.target.value;
    setUser(newUserInfo);
  }
  // console.log(event.target.value);
}

return (
  <div style={{ textAlign: "center" }}>
    {/* click button */}

    {
      user.isSignedIn ? <button onClick={googleSignOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign In</button>
    }
    <br />
    <button onClick={fbSignIn}>Sign in using facebook</button>

    {/*After sign in display option */}
    {
      user.isSignedIn && <div>
        <p>Welcome, {user.name}</p>
        <p>Your email : {user.email}</p>
        <img src={user?.photo} alt=""></img>

      </div>
    }

    <h1>Our own Authentication</h1>
    <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
    <label htmlFor="newUser">New User Sign Up</label>
    {/* Input Form */}
    <form onSubmit={handleSubmit}>
      {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name" />}
      <br />
      <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email Address" required />
      <br />
      <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
      <br />
      <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
    </form>
    <p style={{ color: 'red' }}>{user.error}</p>
    {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} Successfully</p>}
  </div>
);
};

export default Login;
