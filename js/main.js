// Main Game
var Game = function() {
	// Variables
	var canvas, ctx, p1, p2, boardSize, board;

	// Functions
	var update, draw;

	// Initialize Canvas and Context
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");
	
	// Game Logic
	update = function() {
		alert("Never");
	}

	// Draw current board
	draw = function() {
		canvas.width = canvas.width;
		
		var cellSize = 400/boardSize;
		for(var i = 1; i < boardSize; i++) {
			ctx.fillStyle = "#000000";
			
			ctx.moveTo(i*cellSize,0);
			ctx.lineTo(i*cellSize,400);
			ctx.stroke();
			
			ctx.moveTo(0, i*cellSize);
			ctx.lineTo(400, i*cellSize);
			ctx.stroke();
		}
		
		for(var i = 0; i < boardSize; i++) {
			for(var j = 0; j < boardSize; j++) {
				if(board[i][j] != 0) {
					var n = board[i][j];
					
					ctx.fillStyle = n.color;
					ctx.font = (20+(15-boardSize)*5)+"px Arial";
					ctx.textBaseline = "middle";
					ctx.textAlign = "center";
					ctx.fillText(n.value, (i+0.5)*cellSize, (j+0.5)*cellSize);
				}
			}
		}
		
		
	}

	// Get players' moves
	this.move = function() {
		// TODO
	}

	// Initialize Game
	this.init = function() {
		p1 = new Player();
		p2 = new Player();
		
		boardSize = Math.floor(Math.random()*10)+5;
		
		board = new Array(boardSize);
		for(var i=0; i<boardSize; i++) {
			board[i] = new Array(boardSize);
			for(var j=0; j<boardSize; j++) {
				board[i][j] = 0;
			}
		}

		board[1][1] = new Number(2, "#FF0000");
		
		draw();
	}
}

// New Game object
var game = new Game();
game.init();

// Get buttons
document.getElementById("newGame").addEventListener('click', function() {
	game.init();
});
document.getElementById("move").addEventListener('click', function() {
	game.move();
});
