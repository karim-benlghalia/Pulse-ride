// var config = {
//   apiKey: "AIzaSyBT10F4vX8JxcYKhdJfoi3JqhdWduWVNbk",
//   authDomain: "pulse-ride.firebaseapp.com",
//   databaseURL: "https://pulse-ride.firebaseio.com",
//   projectId: "pulse-ride",
//   storageBucket: "pulse-ride.appspot.com",
//   messagingSenderId: "350869264943"
// };
// firebase.initializeApp(config)
var config = {
  apiKey: "AIzaSyDYk2XKh2RrlfyYSfBP7tdD0_wHoziCBFU",
  authDomain: "pulse-ride188.firebaseapp.com",
  databaseURL: "https://pulse-ride188.firebaseio.com",
  projectId: "pulse-ride188",
  storageBucket: "pulse-ride188.appspot.com",
  messagingSenderId: "1040848890807"
};
firebase.initializeApp(config);
console.log('Javascript file is connected')

function registerUser(){
  let email = document.getElementById('register_email').value;
  let password = document.getElementById('register_password').value;
  console.log(email, password);

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(
    function() { // A hacky way to navigate to the next page
      window.location.href = window.location.href.replace("registration.html", "welcome-map.html")
    }
  )
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}


function loginUser() {
  let userEmail = document.getElementById('username_input').value
  let userPassword = document.getElementById('password_input').value
  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(
    function() { // A hacky way to navigate to the next page
      // window.location.href = window.location.href.replace("index.html", "welcome-map.html")
      window.location.href = "welcome-map.html";
    }
  )
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode)
    window.alert(errorMessage)
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user)
  } else {

  }
});
