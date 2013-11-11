var hud = document.getElementById('current-src'),
img = document.getElementsByTagName('img')[0];

function checkSrc(){

	hud.innerHTML = img.getAttribute('src') + '<br>('+(img.naturalWidth + 'x' + img.naturalHeight)+') Viewport: ' + (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);

}

if(window.addEventListener){
	img.addEventListener('load', checkSrc, false);
	img.addEventListener('resize', checkSrc, false);
} else {
	img.attachEvent('onload', checkSrc);
	img.attachEvent('onresize', checkSrc);
}