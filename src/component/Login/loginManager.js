
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}
const setUserToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    sessionStorage.setItem('token', idToken);
  }).catch(function(error) {
    
  });
}
// signIn part
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { displayName, photoURL, email } = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                success: true,
                photo: photoURL
            }
            // sessionStorage.setItem('token', signedInUser.email)
            setUserToken();
            return signedInUser;
            // console.log(displayName, photoURL, email);
        })
}

//  sign out part
export const handleSignOut = () => {
    return firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isSignedIn: false,

          name: '',
          email: '',
          photo: '',
          error: '',
          success: false

        }
        return signOutUser;
      })
    // console.log('SignOut Clicked');
  }


//fb sign in
export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {

            var credential = result.credential;
            var user = result.user;
            var accessToken = credential.accessToken;
            user.success = true;
            return user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });  
}
//create new user
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res => {
          // Signed in 
        //   var user = userCredential.user;
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          updateUserName(name);
          return newUserInfo;
        })
        .catch((error) => {
          // var errorCode = error.code;
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
        });
}
//signIn with existing account
export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email,password)
        .then(res => {
          // var user = userCredential.user;
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          return newUserInfo;
          // console.log('sign in user info', userCredential.user);
        })
        .catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
        });

}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name

    }).then(function () {
      // Update successful.
      console.log('User name updated')
    }).catch(function (error) {
      // An error happened.
      console.log(error)
    });
  }