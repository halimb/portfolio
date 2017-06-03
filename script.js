var t = 0;
var y = 0;
var yTemp = 0;
var pattern;
var secs = [
		 document.getElementById("p1"),
		 document.getElementById("p2"),
		 document.getElementById("p3")
	]


var sec1 = document.getElementById("s1");
var sec2 = document.getElementById("s2");
var sec3 = document.getElementById("s3");	


var cont1 = document.getElementById("content-1");
var cont2 = document.getElementById("content-2");
var cont3 = document.getElementById("content-3");


function goToSect(n) {
	if(n > 0 && n < 5) {
		var cont = document.getElementById("content-" + n);
		var body = document.body.scrollTop + 1;
		var doc = document.documentElement.scrollTop + 1;
		yTemp =  body ? body : doc;
		y = cont.offsetTop - 50;
		anim();
	}
}

function anim() {
	if (yTemp < y) {
		step = (yTemp < y / 2) ?
			20 + (yTemp / (y / 2)) * 40:
			10 + ((y - yTemp) / y) * 40;
		yTemp += step;
		window.scrollTo(0, yTemp);
		requestAnimationFrame(anim);
	}
}

y.onclick = function() { goToSect(1) };
sec2.onclick = function() { goToSect(2) };
sec3.onclick = function() { goToSect(3) };

/* Uses Trianglify library by: Quinn Rohlf *
*  https://github.com/qrohlf/trianglify    */
function trianglify() {
	var w =  window.innerWidth;
	var h = 1.2 * getDocHeight();
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

function init() {
	trianglify();
}

init();

document.addEventListener("scroll", function(e) {
			var pos = window.scrollY;
			if(window.innerWidth > 500) {
				var max = 2;
				for(var i = 0; i < secs.length; i++) {
					if(pos + secs[i].offsetHeight / 2 > secs[i].offsetTop) {
						max = i;
					}
				}
				tilt(max);	
			}
			pattern.style.top =  pos / 3 + "px";
		});

function tilt(i) {
	for(var j = 0; j < secs.length; j++) {
		var sign = (j % 2 == 0) ? 1 : -1;
		secs[j].style.transform = (j == i) ? 
			"perspective(100vw) rotateY(" +
			 sign *  window.innerWidth / 250 + "deg)" :
			"perspective(100vw) rotateY(0deg)";
		if(i == j && i != 1) {
			secs[j].className += (j % 2 == 0) ?
			" slide-left fast" : " slide-right fast";
			console.log(i);
		}
		else {
			secs[j].className = (j == 1) ? 
			"portfolio section slow" : "shadow section slow";
		}
	}

}

window.onresize = function() {
	setTransitions("none");
	window.clearTimeout(t);
	t = setTimeout(function() {
				setTransitions("1s")
		}, 500);
}

function setTransitions(trans) {
	var p = document.getElementsByTagName("p");
	for(var i = 0; i < p.length; i++) {
		p[i].style.transition = trans;
	}
} 