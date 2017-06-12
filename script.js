


var ti = 0;
var y = 0;
var prev = 0;
var yTemp = 0;
var pattern;
var main;
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
	if(n > 0 && n <= 3) {
		var cont = document.getElementById("c" + n);
		var body = document.body.scrollTop + 1;
		var doc = document.documentElement.scrollTop + 1;
		yTemp =  body ? body : doc;
		y = n == 1 ? 0 : cont.offsetTop - 50;
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


function getDocHeight() {
	var body = document.body,
    	html = document.documentElement;
	return  Math.max(  body.scrollHeight, 
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
			refreshFocus(e);
		});

function focusOn(i) {
	for(var j = 0; j < secs.length; j++) {
		var sign = (j % 2 == 0) ? 1 : -1;
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
					d = "-20.5vw";
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


/* MOUSETRACKING */

const dim = 200;

var xpos = 0, ypos = 0;
var bg = document.getElementById('bg');
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
	main = document.getElementById("main");
	bg.innerHTML = "";
	w = window.innerWidth;
	h = getDocHeight();
	ROWS = Math.ceil(h / dim);
	COLS = Math.ceil(ROWS * (w / h));
	var rowH = h / ROWS;
	for(var i = 0; i < ROWS; i++) {
		bg.innerHTML += '<div class="row" style="height: '+rowH+'px"></div>';
	}
	rows = document.getElementsByClassName('row');
	for(var i = 0; i < ROWS; i++) {
		for(var j = 0; j < COLS; j++) {
			var cell = '<div class="cell">'+
							'<div class="inner"></div>'+
						'</div>';
			rows[i].innerHTML += cell;
		}
	}
	cells = document.querySelectorAll(".cell");
	prev = Array(cells.length).fill(0);
	laps = Array(cells.length).fill(0);
	prevYs = Array(cells.length).fill(0);
	var origin = new Point(0, 0);
	maxDist = origin.getDist(w, h);
	focusOn(w/2, h/2);
}

window.onresize = function() {
			window.clearTimeout(t);
			t = setTimeout(init, 400);
		}

document.onmousemove = refreshFocus
document.addEventListener("mouseup", refreshFocus);

function refreshFocus(e){
			xpos = e.pageX;
			ypos = e.pageY;
			focusOn(xpos, ypos);
		}

function focusOn(a, b) {
	for(var i = 0; i < cells.length; i++) {
		var div = cells[i]
		var x = div.offsetLeft + div.offsetWidth / 2;
		var y = div.offsetTop + div.offsetHeight / 2;
		var p = new Point(x, y);
		var dist = p.getDist(a, b) / maxDist;
		var curr = p.angleTo(a, b) /*  +  dist * 180  /* + laps[i] * 360 */;
 

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

		// var c = 255 - Math.floor(150 * dist) ;
		// var color = 'rgba(' + c + ',' + c + ',' + c + ', 1)';
		// div.childNodes[0].style.borderColor = color;
		div.style.transform = 'rotate(' + -curr + 'deg)';
	}
}

