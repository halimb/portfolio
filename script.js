var pattern = Trianglify({
				width: window.outerWidth + 100,
				height: window.outerHeight
			});
			document.body.appendChild(pattern.canvas())

var y = 0;
var yTemp = 0;
var now = Date.now();
var then = 0;
var sec1 = document.getElementById("s1");
var sec2 = document.getElementById("s2");
var sec3 = document.getElementById("s3");

function goToSect(n) {
	if(n > 0 && n < 5) {
		var cont = document.getElementById("content-"+n);
		var body = document.body.scrollTop;
		var doc = document.documentElement.scrollTop;
		yTemp =  body ? body : doc;
		y = cont.offsetTop;
		anim();
	}
}

function anim() {
	now = Date.now();
	if (yTemp < y) {
		if (now - then > 10) {
			step = 10;
			window.scrollTo(0, yTemp+=step);
			then = now;
		}
		requestAnimationFrame(anim);
	}
}

sec1.onclick = function() { goToSect(1) };
sec2.onclick = function() { goToSect(2) };
sec3.onclick = function() { goToSect(3) };
