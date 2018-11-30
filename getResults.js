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

function getOptimalMode() {


}

function populateModeTable() {
  
  // cost per mile ranges
  lyft_min = 1.0
  lyft_max = 3.0
  uber_min = 1.25
  uber_max = 4.50
  drive_min = 0.15
  drive_max = 1.10
  bus_min = 0.10
  bus_max = 0.20
  bike_min = 0.25
  bike_max = 0.75

  // minutes per mile
  rideshare_time = 4;
  drive_time = 3;
  bus_time = 8;
  bike_time = 10;

  n = Math.floor((Math.random() * 10) + 10) * 0.25 

  document.getElementById('lyft_price').innerHTML = '$' + ((n*lyft_max) + lyft_min).toFixed(2)
  document.getElementById('lyft_time').innerHTML = Math.ceil(n*rideshare_time) + ' mins'

  document.getElementById('uber_price').innerHTML = '$' + ((n*uber_max) + uber_min).toFixed(2)
  document.getElementById('uber_time').innerHTML = Math.ceil(n*rideshare_time) + ' mins'

  document.getElementById('drive_price').innerHTML = '$' + ((n*drive_max) + drive_min).toFixed(2)
  document.getElementById('drive_time').innerHTML = Math.ceil(n*drive_time) + ' mins'

  document.getElementById('bus_price').innerHTML = '$' + ((n*bus_max) + bus_min).toFixed(2)
  document.getElementById('bus_time').innerHTML = Math.ceil(n*bus_time) + ' mins'

  document.getElementById('bike_price').innerHTML = '$' + ((n*bike_max) + bus_min).toFixed(2)
  document.getElementById('bike_time').innerHTML = Math.ceil(n*bike_time) + ' mins'
}

window.onload = function() {
  populateModeTable();
};