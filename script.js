
var y = 0;
var yTemp = 0;
var sec1 = document.getElementById("s1");
var sec2 = document.getElementById("s2");
var sec3 = document.getElementById("s3");


var cont1 = document.getElementById("content-1");
var cont2 = document.getElementById("content-2");
var cont3 = document.getElementById("content-3");	

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

/* Uses Trianglify library by: Quinn Rohlf *
*  https://github.com/qrohlf/trianglify    */
function trianglify() {
	var last = document.getElementById('content-'+5);
	var w = 1.2 * window.outerWidth;
	var h = 7000;
	var pattern = Trianglify({
				width: w,
				height: h,
				cell_size: 150
			}).canvas();
	document.body.appendChild(pattern);
}

trianglify();