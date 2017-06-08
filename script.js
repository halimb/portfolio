


var ti = 0;
var y = 0;
var prev = 0;
var yTemp = 0;
var pattern;
var secs = [
		 document.getElementById("c1"),
		 document.getElementById("c2"),
		 document.getElementById("c3")
	]

var profile = document.getElementById("profile");
var navButtons = [
		document.getElementById("s1"),
		document.getElementById("s2"),
		document.getElementById("s3")	
	] 

navButtons[0].onclick = function() { goToSect(1) };
navButtons[1].onclick = function() { goToSect(2) };
navButtons[2].onclick = function() { goToSect(3) };

var down;
var bar = document.getElementById("bar");
var up = document.getElementById("up");
up.onclick = function() { goToSect(1) };

function goToSect(n) {
	console.log("inside goToSect");
	if(n > 0 && n <= 3) {
		var cont = document.getElementById("c" + n);
		var body = document.body.scrollTop + 1;
		var doc = document.documentElement.scrollTop + 1;
		yTemp =  body ? body : doc;
		y = n == 1 ? 0 : cont.offsetTop - 50;
		console.log(y);
		down = (yTemp - y < 0) ? true : false;
		anim();
	}
}

function anim() {
	var cond = down ? (yTemp < y) : (yTemp > y);
	if(cond) {
		step = 40;
		yTemp += down ? step : -step;
		window.scrollTo(0, yTemp);
		requestAnimationFrame(anim);
	}
}


/* Uses Trianglify library by: Quinn Rohlf *
*  https://github.com/qrohlf/trianglify    */
function trianglify() {
	var w =  window.innerWidth;
	var h = getDocHeight();
	pattern = Trianglify({
				y_colors: 'Reds',
				x_colors: 'Blues',
				variance: 0.45,
				width: w,
				height: h,
				cell_size: 100
			}).canvas();
	pattern.id = "pattern";
	document.body.appendChild(pattern);
}

function getDocHeight() {
	var body = document.body,
    	html = document.documentElement;
	return .8 * Math.max(   body.scrollHeight, 
					   body.offsetHeight, 
	                   html.clientHeight, 
	                   html.scrollHeight, 
	                   html.offsetHeight );
}


// function init() {
// 	//trianglify();
// 	window.scrollTo(0,1);
// }

// init();

document.addEventListener("scroll", function(e) {
			var pos = window.scrollY;
			down = (pos - prev > 0) ? true : false;
			prev = pos;
			bar.className = down ?
			"bar shadow hid" : "bar shadow vis"
			up.className = (pos > 400) ?
			"shadow up show" : "shadow up hide";

			if(window.innerWidth > 500) {
				var max = 2;
				for(var i = 0; i < secs.length; i++) {
					var focus = pos + window.innerHeight/ 2;
					var divTop = secs[i].offsetTop; 
					if(focus > divTop || pos == 1) {
						max = i;
					}
				}
				focusOn(max);
				profile.className = max == 0 ? 
					"profile anim-profile" : "profile";
			}
			// pattern.style.top =  pos / 3 + "px";
		});

function focusOn(i) {
	for(var j = 0; j < secs.length; j++) {
		var sign = (j % 2 == 0) ? 1 : -1;
		console.log(i);
		navButtons[j].className = (j == i) ?
			"item underline" : "item";
		secs[j].style.transform = (j == i) ? 
			"perspective(100vw) rotateY(" +
			 sign *  window.innerWidth / 400 + "deg)" :
			"perspective(100vw) rotateY(0deg)";

		var title = document.getElementById('t'+(j+1));
		var d = "0vw";
		if(i == j) {
			switch(i) {
				case 0:
					d = "-12vw";
					break;
				case 1: 
					d = "-23vw";
					break;
				case 2:
					d = "5vw";
					break;
			}
		}
		title.style.transform = "translateX(" + d + ")";
	}
}

window.onresize = function() {
	setTransitions("none");
	window.clearTimeout(ti);
	ti = setTimeout(function() {
				setTransitions("1s")
		}, 500);
}

function setTransitions(trans) {
	var p = document.getElementsByTagName("p");
	for(var i = 0; i < p.length; i++) {
		p[i].style.transition = trans;
	}
} 



const dim = 60;
const GUTTER = 80;
var xpos = 0, ypos = 0;
var prevXpos = 0, prevYpos = 0;
var grid = document.getElementById('grid');
var rows, cellDim, cells, prev, laps, 
	prevYs, maxDist, w, h, ROWS, COLS;
var t = 0;

function Point(x, y) {
	this.x = x;
	this.y = y;

	this.getDist = function(xb, yb) {
		var distance = 
			Math.sqrt(
				Math.pow( (yb - this.y), 2 ) +
				Math.pow( (xb - this.x), 2 )
			);
		return distance;
	}

	this.angleTo = function(xb, yb) {
		var dist = this.getDist(xb, yb);
		var normX = (xb - this.x) / dist;
		var normY = (this.y - yb) / dist;
		var acos = parseInt( Math.acos(normX) * 180 / Math.PI);
		var asin = parseInt( Math.asin(normY) * 180 / Math.PI);
		var angle = (normY > 0) ? acos : 
						((normX < 0) ? 180 - asin : 
										360 + asin);
		return angle;
	}
}

init();
/* Given a div height and a gutter dimension  *
 * inflate the right number of divs in order  *
 * to fill the whole screen                   */
function init() {
	console.log("init()")
	grid.innerHTML = "";
	w = window.innerWidth;
	h = window.innerHeight
	ROWS = Math.floor(window.innerHeight / (dim + GUTTER));
	COLS = Math.floor(window.innerWidth / (dim/2 + GUTTER));
	for(var i = 0; i < ROWS; i++) {
		grid.innerHTML += '<div class="row"></div>';
	}
	rows = document.getElementsByClassName('row');
	cellDim = Math.floor(h / ROWS - GUTTER);
	cellDim = cellDim * 100 / w;
	for(var i = 0; i < ROWS; i++) {
		for(var j = 0; j < COLS; j++) {
			var cell = '<div class="cell" style="margin: '+ 
			 GUTTER / 2+'px;' + 
			'height: '+cellDim+'vw; width: '+cellDim/2+'vw"></div>';
			rows[i].innerHTML += cell;
		}
	}
	cells = document.querySelectorAll(".cell");
	prev = Array(cells.length).fill(0);
	laps = Array(cells.length).fill(0);
	prevYs = Array(cells.length).fill(0);
	maxDist = Math.sqrt(
				Math.pow( document.body.offsetWidth, 2 ) +
				Math.pow( document.body.offsetHeight, 2 )
			);
	rotateTo(w/2, h/2);
}; 

// window.onresize = function() {
// 			window.clearTimeout(t);
// 			t = setTimeout(init, 400);
// 			console.log("t = " + t);
// 		}

document.onmousemove = function(e){
				xpos = e.clientX;
				ypos = e.clientY;
				if( Math.abs(prevXpos - xpos) > 10||
					Math.abs(prevYpos - ypos) > 10 ) {
					prevXpos = xpos;
					prevYpos = ypos;
					rotateTo(xpos, ypos);
				}
			}

function rotateTo(a, b) {
	for(var i = 0; i < cells.length; i++) {
		var div = cells[i]
		var dim = div.offsetHeight;
		var x = div.offsetLeft + div.offsetWidth / 2;
		var y = div.offsetTop + div.offsetHeight / 2;
		var p = new Point(x, y);
		var curr = p.angleTo(a, b) + laps[i] * 360;

		/*Uncomment this block if transitions	*
		  are enabled in css. this forces the 	*
		  divs to always choose the shortest 	*
		  rotation path							*/
		var dir = prevYs[i] - y;
		if(Math.abs(prev[i] - curr) > 180) {
			curr = dir > 0 ? 
				curr + 360 : -360 + curr;
			laps[i] += dir > 0 ? 1 : -1;
		}
		prevYs[i] = b;
		prev[i] = curr;

		var normalDist = p.getDist(a, b) / maxDist;
		var c = 255// - Math.floor(100 * normalDist) ;
		var color = 'rgba(' + c + ',' + c + ',' + c + ', 1)';
		var d = ".1vw"//(parseFloat(.3 + normalDist * 6).toFixed(4)) + 'vw';

		var border = d + ' solid ' + color;
		div.style.borderTop = border;

		div.style.transform = 'rotate(' + -curr + 'deg)';
	}
}

