var t = 0;
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
var sec1 = document.getElementById("s1");
var sec2 = document.getElementById("s2");
var sec3 = document.getElementById("s3");	

sec1.onclick = function() { goToSect(1) };
sec2.onclick = function() { goToSect(2) };
sec3.onclick = function() { goToSect(3) };

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
			down = (pos - prev > 0) ? true : false;
			prev = pos;
			bar.className = down ?
			"bar shadow hid" : "bar shadow vis"
			up.className = (pos > 400) ?
			"shadow up show" : "shadow up hide";

			if(window.innerWidth > 500) {
				var max = 2;
				for(var i = 0; i < secs.length; i++) {
					if(pos + secs[i].offsetHeight / 2 > secs[i].offsetTop) {
						max = i;
					}
				}
				tilt(max);
				profile.className = max == 0 ? 
					"profile anim-profile" : "profile";
			}
			pattern.style.top =  pos / 3 + "px";
		});

function tilt(i) {
	for(var j = 0; j < secs.length; j++) {
		var sign = (j % 2 == 0) ? 1 : -1;
		secs[j].style.transform = (j == i) ? 
			"perspective(100vw) rotateY(" +
			 sign *  window.innerWidth / 400 + "deg)" :
			"perspective(100vw) rotateY(0deg)";
		var title = document.getElementById('t'+(j+1));
		var d = (i == j) ?
			((i == 2) ? "5vw" : 
				(i == 1) ? "0vw" : "-9vw") : "0vw";
		title.style.transform = "translateX(" + d + ")";
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