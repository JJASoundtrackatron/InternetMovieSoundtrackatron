$( document ).ready(function() {
    // Initialize Firebase
    // Make sure to match the configuration to the script version number in the HTML
    // (Ex. 3.0 != 3.7.0)
    var config = {
        apiKey: "AIzaSyA93eGC8XVYhXUnEUoU7v5ICK34G6A1kAQ",
        authDomain: "carrering-first-project.firebaseapp.com",
        databaseURL: "https://carrering-first-project.firebaseio.com",
        projectId: "carrering-first-project",
        storageBucket: "",
        messagingSenderId: "305269109643"
      }
      firebase.initializeApp(config)
      
    // Assign the reference to the database to a variable named 'database'
    // var database = ...
    
    var db = firebase.database()

    })

    