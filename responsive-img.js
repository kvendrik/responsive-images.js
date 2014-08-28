/*
// @name: Responsive-img.js
// @version: 1.1
// 
// Copyright 2013-2014 Koen Vendrik, http://kvendrik.com
// Licensed under the MIT license
*/

(function () {
	var isArray = Array.isArray || function (obj) {
		return Object.prototype.toString.call(obj) == '[object Array]';
	};

	var isString = function (obj) {
		return Object.prototype.toString.call(obj) == '[object String]';
	}

	var isImage = function (obj) {
		return Object.prototype.toString.call(obj) == '[object HTMLImageElement]';
	}

	var hasAttr;

	if(!Image.prototype.hasAttribute){ //IE <=7 fix

		hasAttr = function(el, attrName){ //IE does not support Object.Prototype
			return el.getAttribute(attrName) !== null;
		};

	} else {

		hasAttr = function(el, attrName){
			return el.hasAttribute(attrName);
		};

	}

	////////POLYFILL FOR document.querySelectorAll////////
	// https://github.com/inexorabletash/polyfill/blob/master/polyfill.js#L671
	if (!document.querySelectorAll) {
		document.querySelectorAll = function (selectors) {
			var style = document.createElement('style');
			var elements = [];
			var element;

			document.documentElement.firstChild.appendChild(style);
			document._qsa = [];

			style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
			window.scrollBy(0, 0);
			style.parentNode.removeChild(style);

			while (document._qsa.length) {
				element = document._qsa.shift();
				element.style.removeAttribute('x-qsa');
				elements.push(element);
			}

			delete document._qsa;
			return elements;
		};
	}


	function makeImagesResponsive(targets){

		var viewport = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		////////RESOLVE TARGETS////////
		var images;

		if (isArray(targets)) {
			images = targets;
		} else if (isString(targets)) {
			images = document.querySelectorAll(targets);
		} else if (isImage(targets)) {
			images = [targets];
		} else {
			images = document.getElementsByTagName('body')[0].getElementsByTagName('img');
		}

		if( images.length === 0 ){
			return;
		}

		////////CHECK IF DISPLAY IS RETINA////////

		var retina = window.devicePixelRatio ? window.devicePixelRatio >= 1.2 ? 1 : 0 : 0;

		////////LOOP ALL IMAGES////////

		for (var i = 0; i < images.length; i++) {

				var image = images[i];


				//set attr names

				var srcAttr = ( retina && hasAttr(image, 'data-src2x') ) ? 'data-src2x' : 'data-src';
				var baseAttr = ( retina && hasAttr(image, 'data-src-base2x') ) ? 'data-src-base2x' : 'data-src-base';

				//check image attributes

				if( !hasAttr(image, srcAttr) ){
					continue;
				}

				var basePath = hasAttr(image, baseAttr) ? image.getAttribute(baseAttr) : '';


				//get attributes

				var queries = image.getAttribute(srcAttr);



				//split defined query list

					var queries_array = queries.split(',');

				//loop queries

				for(var j = 0; j < queries_array.length; j++){

					//split each individual query
					var query = queries_array[j].replace(':','||').split('||');

					//get condition and response
					var condition = query[0];
					var response = query[1];


					//set empty variables
					var conditionpx;
					var bool;


					//check if condition is below
					if(condition.indexOf('<') !== -1){

						conditionpx = condition.split('<');

						if(queries_array[(j -1)]){

							var prev_query = queries_array[(j - 1)].split(/:(.+)/);
							var prev_cond = prev_query[0].split('<');

							bool =  (viewport <= conditionpx[1] && viewport > prev_cond[1]);

						} else {

							bool =  (viewport <= conditionpx[1]);

						}

					} else {

						conditionpx = condition.split('>');

						if(queries_array[(j +1)]){

							var next_query = queries_array[(j +1)].split(/:(.+)/);
							var next_cond = next_query[0].split('>');
							
							bool = (viewport >= conditionpx[1] && viewport < next_cond[1]);

						} else {

							bool = (viewport >= conditionpx[1]);

						}

					}


					//check if document.width meets condition
					if(bool){

						var isCrossDomain = response.indexOf('//') !== -1 ? 1 : 0;

						var new_source;
						if(isCrossDomain === 1){
							new_source = response;
						} else {
							new_source = basePath + response;
						}

						if(image.src !== new_source){

							//change img src to basePath + response
							image.setAttribute('src', new_source);

						}

						//break loop
						break;
					}

				}


		}

	}
	
	window.makeImagesResponsive = makeImagesResponsive;

	if(window.addEventListener){

		window.addEventListener('load', makeImagesResponsive, false);
		window.addEventListener('resize', makeImagesResponsive, false);

	} else { //ie <=8 fix

		window.attachEvent('onload', makeImagesResponsive);
		window.attachEvent('onresize', makeImagesResponsive);

	}
})();
