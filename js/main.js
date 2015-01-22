// Main Game
var Game = function() {
	// Variables
	var canvas, ctx, p1, p2, boardSize, cellSize, board, 
		p1Image, p2Image, numResources, loadedResources;

	// Functions
	var update, movePlayer, loadResource, generateBoard, generateNumbers, 
		drawGrid, drawNumbers, drawPlayers, draw;

	// Game Logic
	movePlayer = function(p, dir) {
		console.log(dir);
		switch (dir) {
		    case 0:
		        p.y -= 1;
		        if(p.y < 0) p.y = 0;
		        break;
		    case 1:
		        p.x += 1;
		        if(p.x > boardSize-1) p.x = boardSize-1;
		        break;
		    case 2:
		        p.y += 1;
		        if(p.y > boardSize-1) p.y = boardSize-1;
		        break;
		    case 3:
		        p.x -= 1;
		        if(p.x < 0) p.x = 0;
		        break;
		}
		
	}

	update = function(p1Move, p2Move) {
		if (p1Move == 0 || p1Move == 1 || p1Move == 2 || p1Move == 3) {
			movePlayer(p1, p1Move);
		}
		if (p2Move == 0 || p2Move == 1 || p2Move == 2 || p2Move == 3) {
			movePlayer(p2, p2Move);
		}

		if(p1Move == 4 && p2Move == 4 && p1.x == p2.x && p1.y == p2.y) {
			board[p1.x][p1.y] = 0;
		}

		if(p1Move == 4) {
			var n = board[p1.x][p1.y]
			if(n != 0) {
				p1.score += n.value;
				if(p1.comboColor == n.color) {
					p1.comboCount += 1;
					p1.score += p1.comboCount-1;
				}
				else {
					p1.comboCount = 1;
					p1.comboColor = n.color;
				}
				board[p1.x][p1.y] = 0;
			}
		}
		if(p2Move == 4) {
			var n = board[p2.x][p2.y]
			if(n != 0) {
				p2.score += n.value;
				if(p2.comboColor == n.color) {
					p2.comboCount += 1;
					p2.score += p2.comboCount-1;
				}
				else {
					p2.comboCount = 1;
					p2.comboColor = n.color;
				}
				board[p2.x][p2.y] = 0;
			}
		}

		document.getElementById("p1score").innerHTML = p1.score;
		document.getElementById("p2score").innerHTML = p2.score;

		draw();
	}

	generateNumbers = function(num, value) {
		var i = 0;
		while(i < num) {
			var x = Math.floor(Math.random()*boardSize);
			var y = Math.floor(Math.random()*boardSize);
			var color = Math.floor(Math.random()*3);

			if(board[x][y] == 0) {
				board[x][y] = new Number(value, color);
				i++;
			}
		}
	}

	generateBoard = function() {
		boardSize = Math.floor(Math.random()*10)+5;
		cellSize = 400/boardSize;

		board = new Array(boardSize);
		for(var i=0; i<boardSize; i++) {
			board[i] = new Array(boardSize);
			for(var j=0; j<boardSize; j++) {
				board[i][j] = 0;
			}
		}

		var fruitNum = boardSize*(Math.random()+1);
		var ones = Math.round(fruitNum*0.5454 + Math.random()*3-1.5);
		var twos = Math.round(fruitNum*0.2727 + Math.random()*2-1);
		var threes = Math.round(fruitNum*0.1818 + Math.random()-0.5);

		generateNumbers(ones, 1);
		generateNumbers(twos, 2);
		generateNumbers(threes, 3);
	}

	drawGrid = function() {
		for(var i = 1; i < boardSize; i++) {
			ctx.fillStyle = "#000000";
			
			ctx.moveTo(i*cellSize,0);
			ctx.lineTo(i*cellSize,400);
			ctx.stroke();
			
			ctx.moveTo(0, i*cellSize);
			ctx.lineTo(400, i*cellSize);
			ctx.stroke();
		}
	}

	drawNumbers = function() {
		for(var i = 0; i < boardSize; i++) {
			for(var j = 0; j < boardSize; j++) {
				if(board[i][j] != 0) {
					var n = board[i][j];

					ctx.fillStyle = "#FFFFAA";
					ctx.fillRect(i*cellSize, j*cellSize, cellSize, cellSize)

					ctx.fillStyle = n.color;
					ctx.font = (20+(15-boardSize)*5)+"px Arial";
					ctx.textBaseline = "middle";
					ctx.textAlign = "center";
					ctx.fillText(n.value, (i+0.5)*cellSize, (j+0.5)*cellSize);
				}
			}
		}
	}

	drawPlayers = function() {
		ctx.drawImage(
			p2Image,
			p2.x*cellSize+10,
			p2.y*cellSize+10,
			cellSize-10,
			cellSize-10);

		ctx.drawImage(
			p1Image,
			p1.x*cellSize,
			p1.y*cellSize,
			cellSize-10,
			cellSize-10);
	}

	// Draw current board
	draw = function() {
		canvas.width = canvas.width;
		ctx.fillStyle = "#EEEEEE";
		ctx.fillRect(0,0,400,400);

		drawNumbers();
		drawPlayers();
		drawGrid();
	}

	// Get players' moves
	this.move = function() {
		var p1Move = document.getElementById("p1move");
		p1Move = parseInt(p1Move.options[p1Move.selectedIndex].value);

		var p2Move = document.getElementById("p2move");
		p2Move = parseInt(p2Move.options[p2Move.selectedIndex].value);

		update(p1Move, p2Move);
	}

	this.reset = function() {
		p1 = new Player();
		p2 = new Player();
		
		generateBoard();

		var startX = Math.floor(Math.random()*boardSize);
		var startY = Math.floor(Math.random()*boardSize);

		while(board[startX][startY] != 0) {
			startX = Math.floor(Math.random()*boardSize);
			startY = Math.floor(Math.random()*boardSize);
		}

		p1.x = startX;
		p1.y = startY;
		p2.x = startX;
		p2.y = startY;

		document.getElementById("p1score").innerHTML = p1.score;
		document.getElementById("p2score").innerHTML = p2.score;

		draw();
	}

	this.init = function() {
		// Initialize Canvas and Context
		canvas = document.getElementById("gameCanvas");
		ctx = canvas.getContext("2d");

		numResources = 2;
		loadedResources = 0;

		p1Image = new Image();
		p1Image.onload = function() {
			loadResource();
		}
		p1Image.src = "img/player1.png";
		

		p2Image = new Image();
		p2Image.onload = function() {
			loadResource();
		}
		p2Image.src = "img/player2.png";
	}

	var parent = this;
	loadResource = function() {
		loadedResources += 1;

		if(loadedResources == numResources) {
			parent.reset();
		}
	}
}

// New Game object
var game = new Game();
game.init();

// Get buttons
document.getElementById("newGame").addEventListener('click', function() {
	game.reset();
});
document.getElementById("move").addEventListener('click', function() {
	game.move();
});
