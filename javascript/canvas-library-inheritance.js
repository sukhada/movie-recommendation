Function.prototype.inheritsFrom = function( parentClassOrObject ){ 
	if ( parentClassOrObject.constructor == Function ) { 
		//Normal Inheritance 
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	} 
	else { 
		//Pure Virtual Inheritance 
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	} 
	return this;
}

function mergeObjects(obj1, obj2) {
    var result = {};
    
    for (var attrname in obj1) {
        result[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
        result[attrname] = obj2[attrname];
    }
    return result;
}

function mergeWithDefault(attrs, dflt) {
    var result = defaultIfUndefined(attrs, dflt);
    result = mergeObjects(dflt, attrs);
    return result;
}

function defaultIfUndefined(val, dflt) {
    if (typeof (val) == 'undefined') {
        return dflt;
    }
    return val;
}

function Drawing (context) {
    this.context = context;
    this.children = [];
}

Drawing.prototype.draw = function() {
	var context = this.context;
	var children = this.children;
	var i;
	for (i = 0; i < children.length; i++) {
		context.save();
		context.translate(children[i].cx, children[i].cy);
		children[i].draw(context);
		context.restore();
	}
};

function Shape(attrs) {
	var dflt = { 
        cx: 25,
        cy: 25,
    };
    attrs = mergeWithDefault(attrs, dflt);
    this.cx = attrs.cx;
    this.cy = attrs.cy;
}

function Circle(attrs) {
	this.radius = attrs.radius;
	this.startAngle = attrs.startAngle;
	this.endAngle = attrs.endAngle;
	this.fillStyle = attrs.fillStyle;
}
Circle.inheritsFrom(Shape);

Circle.prototype.draw = function (context) {
	context.beginPath();
	context.arc(this.cx, this.cy, this.radius, this.startAngle, this.endAngle, true);
	context.fillStyle = this.fillStyle;
	context.fill();
};

function Star(attrs) {
	this.radius = attrs.radius;
	this.fillStyle = attrs.fillStyle;
}
Star.inheritsFrom(Shape);

Star.prototype.draw = function (context) {
	var r = this.radius;
	context.translate(25, 25);
	context.beginPath();
	context.moveTo(r, 0);
	for (var i = 0; i < 9; i++) {
		context.rotate(Math.PI/5);
		if (i%2 == 0) {
			context.lineTo((r/0.525731)*0.200811,0);
		}
		else {
			context.lineTo(r, 0);
		}
	}
	context.closePath();
	context.fillStyle = this.fillStyle;
	context.fill();
}
