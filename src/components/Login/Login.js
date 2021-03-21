import React from 'react';
import './Login.css'
import fbIcon from "../../images/fbIcon.png";
import GoogleIcon from "../../images/GoogleIcon.png";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { useState } from 'react/cjs/react.development';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';



if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}else{
    firebase.app();
}

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      email: '',
      password: '',
      error: '',
      success: false,
    });

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // google sign in method..................
    const handelGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email};
            setUser(signedInUser);
            setLoggedInUser(signedInUser);
            history.replace(from);
        }).catch((error) => {
            console.log(error)
        });
    }


    // facebook sign in method.............................
    const handelFacebookSignIn = () => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            const {displayName, email} = result.user;
            const fbSignedInUser = {name: displayName, email};
            setUser(fbSignedInUser);
            setLoggedInUser(fbSignedInUser);
            history.replace(from);
        })
        .catch((error) => { 
            console.log(error)         
        });
    }


    // Email & password sign in method..................
    const handelBlur = (event)=> {
        let isFormValid = true;
        if(event.target.name === "email"){
          isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
          
        }
        if(event.target.name === "password"){
          const isPasswordValid = event.target.value.length > 6;
          const passwordHasNumber = /\d{1}/.test(event.target.value);
          isFormValid = isPasswordValid && passwordHasNumber;
        }
        if(event.target.name === "name") {
          isFormValid = event.target.value.length > 8;
          
        }
        if(isFormValid){
          let newUserInfo = {...user};
          newUserInfo[event.target.name] = event.target.value;
          setUser(newUserInfo);
          
        }
      }


      const handelSubmit = (e) => {
        if( user.name && user.email && user.password){
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            const newUserInfo = {...user};
            newUserInfo.error = "";
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            updateUserName(user.name);
            history.replace(from);
            console.log(res)
           
          })
          .catch((error) => {
            const newUserInfo = {...loggedInUser};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setLoggedInUser(newUserInfo)
            console.log(error)
          });
  
        }
        if(!newUser && user.email && user.password){
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            const newUserInfo = {...user};
            newUserInfo.error = "";
            newUserInfo.success = true;
            setUser(newUserInfo)
            setLoggedInUser(newUserInfo)
            updateUserName(user.name);
            history.replace(from);
            console.log('sign in info', res.user);
          })
          .catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo)
          });
        }
        e.preventDefault()
    }

    // const handelSignOut = () => {
    //   firebase.auth().signOut()
    //   .then(() => {
    //     const signedOutUser = {
    //       isSignedIn : false,
    //       name: "",
    //       email: '',
    //       photo: ""
    //     }
    //     setUser(signedOutUser)
    //   }).catch((error) => {
    //     // An error happened.
    //   });
    // }
    
    const updateUserName = name => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: name
        }).then(function() {
          console.log('user name Update successful.') 
        }).catch(function(error) {
          console.log(error)
        });
      }


    return (
        <div className="container login-container">
            <div className="form-container">
                <h5> {newUser ? 'Create an account' : 'Login'}</h5>
              <form onSubmit={handelSubmit}>
                  {newUser && <input  type="text" onBlur={handelBlur} name="name" placeholder="Your name" required/>}
                  <br/>
                  <input  type="email" onBlur={handelBlur} name="email"  placeholder="Your email" required/>
                  <br/>
                  <input  type="password" onBlur={handelBlur} name="password" placeholder="Password" required/>
                  <br/>
                  <input id="submitBtn" type="submit" value={newUser ? 'Create an account' : 'Login'}/>
              </form>

               <div className="loginToggle">
               <span>{newUser ?'Alrady have an account? ' : 'Need an account?  '}</span>
                <strong onClick={()=> setNewUser(!newUser)}>{newUser ? 'Login' : 'Create account'}</strong>
               </div>

            </div>
                <br/>
                <h6>Or</h6>
                <button onClick={handelFacebookSignIn} className="fb-btn"><img src={fbIcon} alt=""/> Continue With Facebook</button>
                <br/>
                <button onClick={handelGoogleSignIn} className="google-btn"><img src={GoogleIcon} alt=""/> Continue With Google</button>
        
                <footer>
                <p>Copyright <span><FontAwesomeIcon icon={faCopyright}></FontAwesomeIcon></span> 2021 by Trip Tickets</p>
                </footer>
        </div>
    );
};

export default Login;