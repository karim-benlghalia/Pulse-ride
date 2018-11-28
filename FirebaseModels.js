var config = {
  apiKey: "AIzaSyBT10F4vX8JxcYKhdJfoi3JqhdWduWVNbk",
  authDomain: "pulse-ride.firebaseapp.com",
  databaseURL: "https://pulse-ride.firebaseio.com",
  projectId: "pulse-ride",
  storageBucket: "pulse-ride.appspot.com",
  messagingSenderId: "350869264943"
};
firebase.initializeApp(config)

console.log('Javascript file is connected')

function loginUser() {
  let userEmail = document.getElementById('username_input').value
  let userPassword = document.getElementById('password_input').value
  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(
    function() { // A hacky way to navigate to the next page
      window.location.href = window.location.href.replace("index.html", "welcome-map.html")
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



