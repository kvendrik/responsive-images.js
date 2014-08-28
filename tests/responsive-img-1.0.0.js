/*
// @name: Responsive-img.js (http://github.com/kvendrik/responsive-images.js)
// @version: 1.1
//
// Copyright 2013-2014 Koen Vendrik, http://kvendrik.com
// Licensed under a BSD-2-Clause license
*/

var makeImagesResponsive = (function(){

	'use strict';

var makeImagesResponsive = function(options){

	//settings defaults
	var defaults = {
		imgEls: undefined
	};

	var settings = {};
	for(var o in defaults){
		if(defaults.hasOwnProperty(o) && options[o]){
			settings[o] = options[o];
		}
	}

	//get width to measure from
	var viewport = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,

		//get specified img elements
		imgEls = settings.imgEls;

	//get all images
	var images = (imgEls && imgEls[0] && imgEls[0].nodeType === 1) ? imgEls : document.images;
	if( images.length === 0 ) return;

	//define hasAttr function (IE <=7 fix)
	var hasAttr;
	if(!images[0].hasAttribute){

		hasAttr = function(el, attrName){ //IE does not support Object.Prototype
			return el.getAttribute(attrName) !== null;
		};

	} else {

		hasAttr = function(el, attrName){
			return el.hasAttribute(attrName);
		};

	}

	//check if display is retina
	var retina = window.devicePixelRatio ? window.devicePixelRatio >= 1.2 ? 1 : 0 : 0;

	//loop images
	for (var i = 0, imgCount = images.length; i < imgCount; i++) {

		var img = images[i];


		//set attr names
		var srcAttr = ( retina && hasAttr(img, 'data-src2x') ) ? 'data-src2x' : 'data-src';
		var baseAttr = ( retina && hasAttr(img, 'data-src-base2x') ) ? 'data-src-base2x' : 'data-src-base';

		//check image src attributes
		if( !hasAttr(img, srcAttr) ){
			continue;
		}

		//check base path attr
		var basePath = hasAttr(img, baseAttr) ? img.getAttribute(baseAttr) : '';


		//get attributes
		var queries = img.getAttribute(srcAttr);

		//split defined query list
		var queriesArray = queries.split(',');

		//loop queries
		for(var j = 0, queriesLength = queriesArray.length; j < queriesLength; j++){

			//split each individual query
			var query = queriesArray[j].replace(':','||').split('||');

			//get condition and response
			var condition = query[0];
			var path = query[1];


			//set empty variables
			var conditionpx;
			var bool;

			//check if condition is below
			if(condition.indexOf('<') !== -1){

				conditionpx = condition.split('<');

				if(queriesArray[(j -1)]){

					var prevQuery = queriesArray[(j - 1)].split(/:(.+)/);
					var prevCond = prevQuery[0].split('<');

					bool = (viewport <= conditionpx[1] && viewport > prevCond[1]);

				} else {

					bool = (viewport <= conditionpx[1]);

				}

			} else {

				conditionpx = condition.split('>');

				if(queriesArray[(j +1)]){

					var nextQuery = queriesArray[(j +1)].split(/:(.+)/);
					var nextCond = nextQuery[0].split('>');

					bool = (viewport >= conditionpx[1] && viewport < nextCond[1]);

				} else {

					bool = (viewport >= conditionpx[1]);

				}

			}


			//check if document.width meets condition
			if(bool){

				var isCrossDomain = path.indexOf('//') !== -1;

				var newSrc;
				if(isCrossDomain){
					newSrc = path;
				} else {
					newSrc = basePath + path;
				}

				if(img.src !== newSrc){

					//change img src to basePath + response
					img.setAttribute('src', newSrc);

				}

				//break loop
				break;
			}

		}


	}

}

//http://remysharp.com/2010/07/21/throttling-function-calls/
var throttle = function(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

if(window.addEventListener){

	window.addEventListener('load', makeImagesResponsive, false);
	window.addEventListener('resize', throttle(makeImagesResponsive), false);

} else { //ie <=8 fix

	window.attachEvent('onload', makeImagesResponsive);
	window.attachEvent('onresize', throttle(makeImagesResponsive));

}

return makeImagesResponsive;

}());