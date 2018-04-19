

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

  //create references
    var dbRefObject = db.ref().child('imstt')

    var dbRefListUsers = dbRefObject.child('users')

    var dbRefListSoundTracks = dbRefListUsers.child('soundtracks')

// $("#logout-user").hide()




// Login Event

$(document).on("click", "#add-user", function(){
event.preventDefault()

$("#logout-user").show()

//get elements for login
var txtEmail = $("#txtEmail").val()
var txtPassword = $("#txtPassword").val()


var auth = firebase.auth()

var promise = auth.signInWithEmailAndPassword(txtEmail,txtPassword)
promise.catch(e => console.log(e.message))


})


// Register Event

$(document).on("click", "#reg-user", function(){
    event.preventDefault()

    var txtEmail = $("#txtEmail").val()
    var txtPassword = $("#txtPassword").val()

    
    //TODO - Need to check for real email later

    var auth = firebase.auth()

    var registerMe = auth.createUserWithEmailAndPassword(txtEmail,txtPassword)
    registerMe.catch(e => console.log(e.message))

})

function fireoffme(){

console.log("show me the money!")

}
// Real-Time Authentication Listener

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        // console.log("yeah, this is a firebase user:", firebaseUser)
        $("#logout-user").show()
        fireoffme()
        document.getElementById('id01').style.display='none'
        console.log("hello?")
        $("#main-button").hide()
    }
    else{
        console.log("not logged in")
        $("#logout-user").hide()
        $("#main-button").show()
    }
})


// Log out

$(document).on("click", "#logout-user", function(){
    event.preventDefault()
    firebase.auth().signOut()

})

  
  //sync object changes
  // dbRefObject.on('value', snap => console.log(snap.val()))
  
  dbRefObject.on('value', snap => {
  //    preObject.innerText = JSON.stringify(snap.val(),null,3)
  $("#object").text(JSON.stringify(snap.val(),null,3))
  
  })
  
  //.push id can sort. otherwise this shows up as you add them. 
  
  
  // sync list child added
  // dbRefList.on('child_added', snap => console.log(snap.val()))
  // only cares about child added. not removed or changed
  dbRefListSoundTracks.on('child_added', snap => {
      var newLi = $("<li>")
      newLi.attr("id", snap.key) //snap.key adds the database ID
      newLi.attr("class", "soundtrack-item")
      newLi.text(snap.val())
      $("#list").append(newLi)
  
  })
  
  
  
  
  // sync changed items
  
  dbRefListSoundTracks.on('child_changed', snap =>{
      // var liChanged = document.getElementById(snap.key)
      var liChanged = $('#'+snap.key)
      $(liChanged).html(snap.val())
  
  })
  
  
  
  // sync removed items
  
  dbRefListSoundTracks.on('child_removed', snap =>{
      var liRemoved = $('#'+snap.key)
      $(liRemoved).remove()
  })




 

    


var omdbUrl = "https://www.omdbapi.com/?apikey=4171fa9a&type=movie&plot=short&t="
var wikiUrl = "https://en.wikipedia.org/w/api.php?format=json&action=opensearch&search="; //Mary_Poppins_(soundtrack)"

var responder = function(response) {
	      	var title = response.Title;
	      	var actors = response.Actors;
	      	var genre = response.Genre;
	      	var plot = response.Plot;
	      	if (title && plot) {
	      		$("#movie-title").html(title);
	      		$("#movie-plot").html(plot);
	      		getSndTrkData(title);
	      	}
	      	else {
	      		$("#movie-title").html("Movie not found. Please search again.");
	      		$("#movie-plot").html("");
	      	}
	      }

var sndTrkResponder = function(response) {
	      	var sndTrDesc = response[2][0];
	      	var sndTrLnk = response[3][0];
	      	if (sndTrDesc) {
		      	$("#sound-track-desc").html(sndTrDesc);
		    }
		    else {
		    	$("#sound-track-desc").html("Sound track description not found");
		    }
		    if (sndTrLnk) {
		    	$("#sound-track-link").attr("href", sndTrLnk);
		    	$("#sound-track-link").html(sndTrLnk);
		    }
		    else {
		    	$("#sound-track-link").attr("href", "");
		    	$("#sound-track-link").html("");
		    }

	      }

function getSndTrkData(movieName) {
	$.ajax({
        url: wikiUrl + movieName + "_(soundtrack)" + "&callback=?",  // movieName,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json"
      }).then(sndTrkResponder);
}

function getMovieData(search) {
	$.ajax({
        url: omdbUrl + search,
        method: "GET"
      }).then(responder);
}

var readyFn = function() {
	var clicker = function() {
		var searchTerm = $(".search-input").val().trim();
		getMovieData(searchTerm);
	};
	$(".search-submit").click(clicker);	
}

$(document).ready(readyFn)

