var hud = document.getElementById('current-src'),
img = document.getElementsByTagName('img')[0];

function checkSrc(){

	hud.innerHTML = img.getAttribute('src') + '<br>('+(img.naturalWidth + 'x' + img.naturalHeight)+')';

}

if(window.addEventListener){
	window.addEventListener('load', checkSrc, false);
	window.addEventListener('resize', checkSrc, false);
} else {
	window.attachEvent('onload', checkSrc);
	window.attachEvent('onresize', checkSrc);
}