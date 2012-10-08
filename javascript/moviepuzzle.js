var _image_path;
var _image_width;
var _image_height;

var _num_rows = 4;
var _num_cols = 3;

var _empty_tile = {row:0, col:0};
var _tiles = [];

function randomImage() {
	var myImages = new Array();
	myImages[0] = "images/img1.jpg";
	myImages[1] = "images/img2.jpg";
	myImages[2] = "images/img3.jpg";
	var randInt = Math.floor(Math.random() * myImages.length);
	switch(randInt) {
		case 0:
			_image_path = "images/img1.jpg";
			break;
		case 1:
			_image_path = "images/img2.jpg";
			break;
		case 2:
			_image_path = "images/img3.jpg";
			break;
	}
}

function loadImage(img) {
	var newImg = new Image();
	newImg.src = img;
	console.log(newImg.src);
	var height = newImg.height;
	var width = newImg.width;
	p = $(newImg).load(function(){
		_image_width = newImg.width; 
		_image_height = newImg.height;
		var container = document.getElementById("container");
		container.style.width = newImg.width + 2 + "px";
		container.style.height = newImg.height + 2 + "px";
		createPuzzle();
	});	
}

function emptySide(tile) {
	if ((tile.row - _empty_tile.row) === 1 && tile.col === _empty_tile.col) {
		return "above";
	} 
	if ((_empty_tile.row - tile.row) === 1 && tile.col === _empty_tile.col) {
		return "below";
	}
	if (tile.row === _empty_tile.row && (tile.col - _empty_tile.col) === 1) {
		return "left";
	}
	if (tile.row === _empty_tile.row && (_empty_tile.col - tile.col) === 1) {
		return "right";
	}
}

function createTiles(){
	var width = _image_width/_num_cols;
	var height = _image_height/_num_rows;  
	var i = 0;
	var j = 0;
	_empty_tile = {row: _num_rows-1, col: _num_cols-1};
	for (i = 0; i < _num_rows; i++) {
		for (j = 0; j < _num_cols; j++) {
			if (_empty_tile.row !== i || _empty_tile.col !== j) {
				var new_Tile = createDiv(width, height, i, j);
				_tiles.push(new_Tile);
				var container = document.getElementById("container");
				container.appendChild(new_Tile);
			}
		}
	}
}

function adjacentEmpty(tile) {
	if (Math.abs(tile.row - _empty_tile.row) === 1 && tile.col === _empty_tile.col) {
		return true;
	}
	if (tile.row === _empty_tile.row && Math.abs(tile.col - _empty_tile.col) === 1) {
		return true;
	}
	return false;
}

function randomNonEmptyTile() {
	var index = Math.floor(Math.random() * (_tiles.length - 1));
	return _tiles[index];
}

function createDiv(width, height, row, col){
	var newTile = document.createElement("div");
	newTile.width = width;
	newTile.height = height;
	newTile.row = row;
	newTile.col = col;
	
	newTile.style.position = "absolute";
	newTile.style.left = col * width + "px";
	newTile.style.top = row * height + "px";
	newTile.style.width = width + "px";
	newTile.style.height = height + "px";
	newTile.style.border = "1px solid #000000";
	
	newTile.style.backgroundImage = "url('"+_image_path+"')";
	newTile.style.backgroundPosition = -width*col+"px "+-height*row+"px";

	newTile.onclick = tileClicked;
	
	return newTile;
}

function tileClicked(event){
	var tile = event.target;
	var empty = emptySide(tile);	
	if (empty === "above") {
		$(tile).animate({
			top: '-=' +tile.height
		}, 2000);
		var row_copy = _empty_tile.row;
		_empty_tile.row = tile.row;
		tile.row = row_copy;
	}
	if (empty === "below") {
		$(tile).animate({
			top: '+=' +tile.height
		}, 2000);
		var row_copy = _empty_tile.row;
		_empty_tile.row = tile.row;
		tile.row = row_copy;
	}
	if (empty === "right") {
		$(tile).animate({
			left: '+=' +tile.width
		}, 2000);
		var col_copy = _empty_tile.col;
		_empty_tile.col = tile.col;
		tile.col = col_copy;
	}
	if (empty === "left") {
		$(tile).animate({
			left: '-=' +tile.width
		}, 2000);
		var col_copy = _empty_tile.col;
		_empty_tile.col = tile.col;
		tile.col = col_copy;
	}
}

function shuffleTiles(){
	var numSteps = 1000;
	var i;
	for (i = 0; i < numSteps; i++){
		var randTile = randomNonEmptyTile();
		if (adjacentEmpty(randTile)) {
			if (Math.abs(randTile.row - _empty_tile.row) === 1 && randTile.col === _empty_tile.col) {
				var row_copy = _empty_tile.row;
				_empty_tile.row = randTile.row;
				randTile.row = row_copy;
				randTile.style.top = row_copy * randTile.height + "px";
  			}
			if (randTile.row === _empty_tile.row && Math.abs(randTile.col - _empty_tile.col) === 1) {
				var col_copy = _empty_tile.col;
				_empty_tile.col = randTile.col;
				randTile.col = col_copy;
				randTile.style.left = col_copy * randTile.width + "px";
			}
		}
	}
}

function createPuzzle() {
  	createTiles();
  	shuffleTiles();
}

window.onload = function () {
  	randomImage();
  	loadImage(_image_path);
  	var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var drawing = new Drawing(context);

	var circle = new Circle({
		radius: 40,
		startAngle: 0,
		endAngle: Math.PI*2,
		fillStyle: "black"
	});
	
	var star = new Star ({
		radius: 25,
		fillStyle: "white"
	});
	
	drawing.children.push(circle);
	drawing.children.push(star);
	drawing.draw();
}