//Three plus hours of my life right here. Remember to load document before calling f(x)'s!
$(document).ready(function(){

var winners=0;
var currentLevel = '#round16';

//for looping through sections
var teams = $('.teams').length;
var quartL = $('#quarter div div').length;



var Location1Id; //returns first location for transfer of var


//Function to drag and drop sort teams
 $(function() {
    $( ".sortable" ).sortable({
    	update: function (event, ui){
    		//$(".r"+this).empty();
    		genRound16(); 
    		$('.droppable').empty();

    	}
    });
    $( ".sortable" ).disableSelection();
    $(".draggable").draggable({helper: "clone"});
    


    //restrict quarter final drop functions
    for (var i = 1; i<=quartL; i++) {
	    $('.q'+i).droppable({ 
	    	accept: ".r"+i,
	    	tolerance: "intersect",
	    	drop: function(event, ui) {
	    		if ($(this).html()== $(".q1").html() || $(this).html()==$(".q2").html()){
	    			$(".s1").empty();
	    			$(".t1").empty(); 
	    			$(".f1").empty();
	    			}
	    			else if ($(this).html()==$(".q3").html() || $(this).html()==$(".q4").html()){
	    				$(".s2").empty();
	    				$(".t1").empty();
	    				$(".f1").empty();
	    			}
	    			else if ($(this).html()==$(".q5").html() || $(this).html()==$(".q6").html()){
	    				$(".s3").empty();
	    				$(".t2").empty();
	    				$(".f2").empty();
	    			}
	    			else {
	    				$(".s4").empty();
	    				$(".t2").empty();
	    				$(".f2").empty();
	    			}
	    		$(this).empty();
	            $(this).append($(ui.draggable).html());
	            //if next item is not the same as prev, clear advancing box;
	           
	          //  if ($(".r"+i).html() != $(this).html()) {$('.s'+i).empty();}
	        }
	  	});
	}

	for (var i = 1, j=1; i<=4; i++, j+=2) {
		$('.s'+i).droppable({ 
	    	accept: ".q"+j+", .q"+(j+1),
	    	tolerance: "intersect",
	    	drop: function(event, ui) {
	    		if ($(this).html()==$(".s1").html() || $(this).html()==$(".s2").html()){
	    			$(".t1").empty(); 
	    			$(".f1").empty();
	    			}
	    			else {
	    				$(".t2").empty();
	    				$(".f2").empty();
	    			}
	    		$(this).empty();
	            $(this).append($(ui.draggable).html());
	      	}
	    });
	}

	     $(".t1").droppable({ 
	    	accept: ".s1, .s2",
	    	tolerance: "intersect",
	    	drop: function(event, ui) {
	    	   $(this).empty();
	           $(this).append($(ui.draggable).html());
	        }
	  	});

	     $(".t2").droppable({ 
	    	accept: ".s3, .s4",
	    	tolerance: "intersect",
	    	drop: function(event, ui) {
	    	   $(this).empty();
	           $(this).append($(ui.draggable).html());
	        }
	  	});

	//restrict final drop functions

	    $(".f1").droppable({ 
	    	accept: ".s1, .s2",
	    	tolerance: "intersect",
	    	drop: function(event, ui) {
	    	   $(this).empty();
	           $(this).append($(ui.draggable).html());
	            $(".t1").empty();
	           if ($(ui.draggable).html() == $(".s1").html()) { 
	           		$(".t1").append($(".s2").html());
	           } else {$(".t1").append($(".s1").html());}
	        }
	  	});

	  	$(".f2").droppable({ 
	    	accept: ".s3, .s4",
	    	tolerance: "intersect",
	    	drop: function(event, ui) {
	    	   $(this).empty();
	           $(this).append($(ui.draggable).html());
	           $(".t2").empty();
	           if ($(ui.draggable).html() == $(".s3").html()) { 
	           		$(".t2").append($(".s4").html());
	           } else {$(".t2").append($(".s3").html());}
	        }
	  	});

	  	$("#podium :nth-child(1)").droppable({
	  		accept: ".f1, .f2",
	    	tolerance: "intersect",
	    	drop: function(event, ui) {
	    	   $(this).empty();
	           $(this).append($(ui.draggable).html());
	           $("#podium :nth-child(2)").empty();
	           if ($(ui.draggable).html() == $(".f1").html()) { 
	           		$("#podium :nth-child(2)").append($(".f2").html());
	           } else {$("#podium :nth-child(2)").append($(".f1").html());}
	        }
	  	});
	  	$("#podium :nth-child(2)").droppable({
	  		accept: ".f1, .f2",
	    	tolerance: "intersect",
	    	drop: function(event, ui) {
	    	   $(this).empty();
	           $(this).append($(ui.draggable).html());
	            $("#podium :nth-child(1)").empty();
	           if ($(ui.draggable).html() == $(".f1").html()) { 
	           		$("#podium :nth-child(1)").append($(".f2").html());
	           } else {$("#podium :nth-child(1)").append($(".f1").html());}
	        }
	  	});
  		$("#podium :nth-child(3)").droppable({
	  		accept: ".t1, .t2",
	    	tolerance: "intersect",
	    	drop: function(event, ui) {
	    	   $(this).empty();
	           $(this).append($(ui.draggable).html());
	        }
	  	});
 });


 /*Functions to generate the first two winners for round of 16*/
//Select the 1st, 2nd, etc winners for every box.
function genWinners (place, x){
	this.place = place || 1;
	this.x = x;
    winners = $("div div:nth-child("+this.x+") li:nth-child("+this.place+")").html();
	
	return winners;
}

//insert winners into the next match.
function advance (place, posX, posY){
	this.place = place;   //1st place, 2nd, etc.
	
	//Place all even team 1st place with odd team 2nd place
	//Place all odd team 1st place with even team 2nd place
	this.x = (place%2!=0) ? posX : ((posX%2!=0)? posX+1:posX-1);   //position variables for choosing box insert location;
	this.y = posY;
	this.i = posX; 	 //position for running through team list

	var nextPosition = $(currentLevel+' div:nth-child('+this.x+') div:nth-child('+this.y+')').html(genWinners(this.place, this.i));
}

//create round of 16 winners
function genRound16() {
	for (var i = 1; i <= teams; i++) {
		advance(1,i,1);
		advance(2,i,2);
	}
}


}); //end ready f(x)


//hmmm make an array of objects to store user data
var userData = {};



//Functions for user info
//Save Button- get user email and password. get predictions. save data as JSON
function save(){
	//get predictions and div lengths. 
	var quartL = $("#quarter div div").length;
	var userChoices = []; //user's predictions
	

	for (var i = 1; i<=quartL; i++) {
		userChoices.push($('#round16 div:nth-child('+i+') div:nth-child(1)').html());
		userChoices.push($('#round16 div:nth-child('+i+') div:nth-child(2)').html());
		
	}

	for (var i = 1; i<=quartL; i++) {
		userChoices.push($('.q'+i).html());
	}


	for (var i = 1, j=1; i<=4; i++, j+=2) {
		userChoices.push($(".s"+i).html());
	}

	userChoices.push($(".t1").html());
	userChoices.push($(".t2").html());
	userChoices.push($(".f1").html());
	userChoices.push($(".f2").html());
	
	//insert into an object. //push email first.
	//userData;
	userData[$("#email").val()] = {
	  		password: $("#password").val(),
	  		predict: userChoices			
  	};

  	//Cookie Craziness
userString = JSON.stringify(userData);
document.cookie = userString+"; expires=Thu, 18 Dec 2016 12:00:00 GMT";
}



///unexpected end of input when parsing json?????


//Load Button - get user email and password. compare to JSON Data. return predictions.
function load(){
	JSONobj = JSON.parse(document.cookie);
	//console.log(JSON.parse(userData));
	
//	email = $("#email").val();
//	alert(JSONobj.s);
	if (JSONobj[$("#email").val()].password === $("#password").val()) {
		var quartL = $("#quarter div div").length;
		var userPredict =JSONobj[$("#email").val()].predict;
		for (var i = 1, j=0; i<=quartL; i++, j+=2) {
			$('#round16 div:nth-child('+i+') div:nth-child(1)').html(userPredict[j]);
			$('#round16 div:nth-child('+i+') div:nth-child(2)').html(userPredict[j+1]);
			
		}
		for (var i = 1; i<=quartL; i++) {
			$(".q"+i).html(userPredict[i+15]);
		}

		for (var i = 1; i<=4; i++) {
			$(".s"+i).html(userPredict[quartL+i+15]);
		}

		$(".t1").html(userPredict[quartL+20]);
		$(".t2").html(userPredict[quartL+21]);
		$(".f1").html(userPredict[quartL+22]);
		$(".f2").html(userPredict[quartL+23]);

	}
	else {alert("Please type a valid password");}
}

//Reset Button - reset all data?
function rset(){
	window.location.href = window.location.href;//reload page
}



