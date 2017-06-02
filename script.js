var t = 0;
var y = 0;
var yTemp = 0;
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
		var body = document.body.scrollTop;
		var doc = document.documentElement.scrollTop;
		yTemp =  body ? body : doc;
		y = cont.offsetTop - 50;
		anim();
	}
}

function anim() {
	if (yTemp < y) {
		if(yTemp < y / 2) {
			step = (yTemp / y) * 20;
		}
		else {
			step = (y / yTemp) * 20;
		}
		window.scrollTo(0, yTemp+=step);
		requestAnimationFrame(anim);
		console.log(yTemp)
	}
}

y.onclick = function() { goToSect(1) };
sec2.onclick = function() { goToSect(2) };
sec3.onclick = function() { goToSect(3) };

/* Uses Trianglify library by: Quinn Rohlf *
*  https://github.com/qrohlf/trianglify    */
function trianglify() {
	var w =  window.innerWidth;
	var h = getDocHeight();
	var pattern = Trianglify({
				y_colors: 'Reds',
				x_colors: 'Reds',
				variance: 0.45,
				width: w,
				height: h,
				cell_size: 100
			}).canvas();
	document.body.appendChild(pattern);
}

function getDocHeight() {
	var body = document.body,
    	html = document.documentElement;
	return 1.1 * Math.max(   body.scrollHeight, 
					   body.offsetHeight, 
	                   html.clientHeight, 
	                   html.scrollHeight, 
	                   html.offsetHeight );
}

trianglify();

document.addEventListener("scroll", function(e) {
			if(window.innerWidth > 500) {
				var pos = window.scrollY;
				var max = 2;
				for(var i = 0; i < secs.length; i++) {
					if(pos + secs[i].offsetHeight / 2 > secs[i].offsetTop) {
						max = i;
					}
				}
				tilt(max);	
			}
		});

function tilt(i) {
	for(var j = 0; j < secs.length; j++) {
		var sign = j % 2 == 0 ? -1 : 1;
		secs[j].style.transform = (j == i) ? 
			"perspective(100vw) rotateY(" +
			 sign * window.innerWidth / 250 + "deg)" :
			"perspective(100vw) rotateY(0deg)"
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