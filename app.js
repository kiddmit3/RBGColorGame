var	numOfSquares = 6;
var danceMode = false;
var colors = [];
var pickedColor=  null;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var danceButton = document.querySelector("#dance");
var interval = null;


var rgbGame = {

	init: function(){
		//mode button event listeners
		this.setupModeButtons();
		// changes color of each square and event listeners
		this.setupSquares();;	
		this.reset();
		this.dance();
		resetButton.addEventListener("click", this.reset);

	},	

	reset: function(){
		resetButton.textContent = "Reset";
		//generate all new colors
		colors = rgbGame.generateRandomColors(numOfSquares);
		//pick a random color from array
		pickedColor = rgbGame.pickColor();
		//change colorDisplay to match picked Color;
		colorDisplay.textContent = pickedColor;
		//change colors of squares
		for(var i =0; i <squares.length;i++){
			if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}

		h1.style.background = "steelblue";
		messageDisplay.textContent = "";
	},

	randomColor: function(){
		//pick a red from 0 to 255
		var r = Math.floor(Math.random()*256);
		//pick a green from 0 to 255
		var g = Math.floor(Math.random()*256);
		//pick a blue from 0 to 255
		var b = Math.floor(Math.random()*256);

		return "rgb(" + r +", "+ g + ", " + b + ")";
	},
	
	generateRandomColors: function(num){
		//make an array
		var arr = [];
		//add num random colors to arr
		for(var i = 0; i < num ;i++){
			arr.push(this.randomColor());
		}

		//return array
		return arr;
	},

	changeColors: function(color){
		//loop through all squares
		for (var i = 0; i < squares.length; i++) {
			//change each color to match given color
			squares[i].style.background = color;
		}
	},

	pickColor: function(){
		var random = Math.floor(Math.random() * colors.length);
		return colors[random];
	},

	setupModeButtons: function(){
		for (var i=0; i<modeButtons.length;i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			if(this.textContent === "Easy"){
				numOfSquares = 3;
			} 
			else if (this.textContent === "Medium"){
				numOfSquares = 6;
			}
			else if (this.textContent === "Hard"){
				numOfSquares = 9;
			}
			rgbGame.reset();
		});
	}},

	setupSquares: function(){	
	for (var i = 0; i< squares.length; i++) {
		//add initial colors to squares
		squares[i].style.background = colors[i];
		//add click listeners to squares
		squares[i].addEventListener("click", function(){
		//grab color of clicked square
		var clickedColor = this.style.background;
		//compare color to pickedColor
		if (clickedColor === pickedColor){
			messageDisplay.textContent = "Correct!";
			rgbGame.changeColors(clickedColor);
			h1.style.background = clickedColor;
			resetButton.textContent = "Again?";
		} else {
			this.style.background = "#232323";
			messageDisplay.textContent = "Try Again";
		}
		});
	};
	},

	dance: function(){
		danceButton.addEventListener("click", function(){
			if (danceMode){
				clearInterval(interval);
				danceMode = false;
				danceButton.textContent = "DANCE OFF";
			} else {
			danceMode = true;
			interval = setInterval(rgbGame.reset, 200);
			setTimeout(interval,100);
			danceButton.textContent = "DANCE ON";
		}

		});
	}
};

rgbGame.init();