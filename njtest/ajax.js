// spotify 
//omdb 

//top search bar is where we search for the shows, movies , soundtracks 
// movie poster we want to come up as well 

// Summary of the show - 

/* Load the HTTP library */


/* Create an HTTP server to handle responses */


// JavaScript Document


/* so I'm going to get rid of the component of moving/not moving because it's not required
in building this app 
There are only three different divs I'll need - keep the objects for now 
*/


var bear = {
	name: "Bear",
	
}

var owl = {
	name: "Owl",
	
}

var cats = {
	name: "Cats",
	
}

var fish = {
	name: "Fish",
	
}

var frog = {
	name: "Frog",
	
}

//var newAnarr is for pushing new objects into this array. We don't need to do this but we could.
// this variable contains all the objects defined as variables above. 
var newAnArr = [bear,owl,cats,fish,frog];



function loadButton(anObj,animalIndex) {
	//console.log(anObj);
	
	$("#animalButtons").append("<button id='animal-" + animalIndex + "' type='button'>" + anObj.name + "</button>");

}



function loadButtons() {
	for (var i=0; i<newAnArr.length ; i++) {
		var anObj = newAnArr[i];
		loadButton(anObj,i);
		
		
	} 

}


function startUI() {
	loadButtons();
	$("#addAnimal").click(function () {
		// we need to change this to the value that will be entered by the user in the search bar.
		var input = $("#animal-input").val();

		if (input) {
			var anObj = {name:input,moving:false};
			newAnArr.push(anObj);
			console.log(newAnArr);
			var animalIndex = newAnArr.length-1;
			loadButton(anObj,animalIndex);
			$('button').on('click', giphyClicker);	
		}


	});

}



startUI();


function genGiphyUrlFromAnimalName(name) {
	//the specific giphy url  
};

//this is my api key 
// DwvKwzo0OEUe9stMMFLqGVWOOiiz6pfL

function giphyClicker(arg) {
      // Example queryURL for Giphy API
      
      var cai = arg.currentTarget.id;
      
      var tai = cai.replace("animal-", "");
     
      var zai = newAnArr[tai];
     
      var aName = zai.name;
     
      // here is where we need to add the api so we can make the call to OMDB + Spotify 
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=DwvKwzo0OEUe9stMMFLqGVWOOiiz6pfL&limit=10&q=";
      queryURL += aName;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        

        $("#animals").html("")

        response.data.forEach(function(gifObject) {
         

        	// here is where we get the unique items from the JSON object which is OMDB 
          var gid = gifObject.id;
          var rating = gifObject.rating;
          console.log(rating);

          //here we write out our specific append for the specific data we want regarding the movie 
          var giphy = "https://giphy.com/embed/" + gid;
          /// $("#animals").append("<p><iframe src='" + giphy + "' width='390' height='480' frameBorder='0' class='giphy-embed' allowFullScreen></iframe> </p>");
          var div = $("<div style='width:20%'>");
          var img = $('<img>');
          var div2 = $("<div>");
          div.append("<div style='width:140px;'>Rating: " + rating + "</div>");
          div.append(div2);
          div2.append(img);

          img.attr('src', gifObject.images.fixed_height_still.url);
          $(img).click(function(){
          	if (zai.moving) {
          		$(img).attr("src",gifObject.images.fixed_height_still.url);
          		zai.moving = false;
          	}
          	else {
          		$(img).attr("src",gifObject.images.fixed_height.url);
          		zai.moving = true;
          	}
         
          	
          });
          $('#animals').prepend(div);
         } )
	})
}
 $('button').on('click', giphyClicker)	
 // we need to duplicate this to add the API of spotify as well as the specific calls to get
 //the correct information 


