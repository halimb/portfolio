
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

var navButtons = [
		document.getElementById("s1"),
		document.getElementById("s2"),
		document.getElementById("s3")	
	] 

var down;
var up = document.getElementById("up");
var bar = document.getElementById("bar");
var profile = document.getElementById("profile");

up.onclick = function() { goToSect(1) };
navButtons[0].onclick = function() { goToSect(1) };
navButtons[1].onclick = function() { goToSect(2) };
navButtons[2].onclick = function() { goToSect(3) };

function goToSect(n) {
	if(n > 0 && n <= 3) {
		var cont = document.getElementById("c" + n);
		var body = document.body.scrollTop + 1;
		var doc = document.documentElement.scrollTop + 1;
		yTemp =  body ? body : doc;
		y = n == 1 ? 0 : cont.offsetTop - 75;
		down = (yTemp - y < 0) ? true : false;
		anim();
	}
}

function anim() {
	var cond = down ? (yTemp < y) : (yTemp > y);
	if(cond) {
		step = 80;
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


document.addEventListener("scroll", function(e) {

			var pos = window.scrollY;
			down = (pos - prev > 0) ? true : false;
			prev = pos;
			bar.className = down ?
			"bar shadow hid" : "bar shadow vis"
			up.className = (pos > 400) ?
			"shadow up show" : "shadow up hide";
			var max = 2;
			for(var i = 0; i < secs.length; i++) {
				var focus = pos + window.innerHeight/ 2;
				var divTop = secs[i].offsetTop; 
				if(focus > divTop || pos == 1) {
					max = i;
				}
			}
			highlight(max);
			profile.className = max == 0 ? 
				"profile anim-profile" : "profile";
			refreshFocus(e);
		});

function highlight(i) {
	for(var j = 0; j < secs.length; j++) {
		navButtons[j].className = (j == i) ?
			"item underline" : "item";
			
		if(window.innerWidth > 600) {
			var sign = (j % 2 == 0) ? 1 : -1;
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


/* Mousetracking Background*/


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

/* inflate the right number of divs in order  *
 * to fill the whole screen                   */
function init() {
	var w = window.innerWidth; 
	var dim = w / 5;
	h = getDocHeight();
	if( w > 600) {
		bg.innerHTML = "";
		// var d = dim * w / 1360
		main = document.getElementById("main");
		ROWS = Math.ceil(h / dim);
		COLS = Math.ceil(ROWS * (w / h));
		var rowH = h / ROWS;
		for(var i = 0; i < ROWS; i++) {
			bg.innerHTML += '<div class="row" style="height: '+rowH+'px"></div>';
		}
		rows = document.getElementsByClassName('row');
		for(var i = 0; i < ROWS; i++) {
			for(var j = 0; j < COLS; j++) {
				var cell = '<div class="cell" style="padding: '+
								dim/3.5 + 'px">'+
								'<div class="inner"></div>'+
							'</div>';
				rows[i].innerHTML += cell;
			}
		}
		cells = document.querySelectorAll(".cell");
		focusOn(w/2, h/2);
		profile.className = "profile anim-profile";
	}
}

window.onresize = function() {
			window.clearTimeout(t);
			t = setTimeout(init, 400);
		}

document.onmousemove = refreshFocus
document.addEventListener("mouseup", refreshFocus);

function refreshFocus(e){
	if(window.innerWidth > 600) {
		xpos = e.pageX;
		ypos = e.pageY;
		focusOn(xpos, ypos);
	}	
}

function focusOn(a, b) {
	for(var i = 0; i < cells.length; i++) {
		var div = cells[i]
		var x = div.offsetLeft + div.offsetWidth / 2;
		var y = div.offsetTop + div.offsetHeight / 2;
		var p = new Point(x, y);
		var curr = p.angleTo(a, b)
		div.style.transform = 'rotate(' + -curr + 'deg)';
	}
}

