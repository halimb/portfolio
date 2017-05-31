var pattern = Trianglify({
				width: window.outerWidth + 100,
				height: window.outerHeight
			});
			document.body.appendChild(pattern.canvas())

console.log("width = " + window.outerWidth);
console.log("height = " + window.outerHeight);

var y = 0;
var yTemp = 0;
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
	if (yTemp < y) {
		step = 10;
		window.scrollTo(0, yTemp+=step);
		requestAnimationFrame(anim);
	}
}

sec1.onclick = function() { goToSect(1) };
sec2.onclick = function() { goToSect(2) };
sec3.onclick = function() { goToSect(3) };