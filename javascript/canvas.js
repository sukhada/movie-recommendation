window.onload = function () {
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