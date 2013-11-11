	function makeImagesResponsive(){

			var viewport = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		////////GET ALL IMAGES////////

		var images = document.getElementsByTagName('body')[0].getElementsByTagName('img');

		////////LOOP ALL IMAGES////////

		for (var i = 0; i < images.length; i++) {

				var image = images[i];


				//check image attributes

				var base_path;
				if(image.hasAttribute){

					if( !image.hasAttribute('data-src') ){
						//console.error('No data-src attribute specified on ' + image);
						continue;
					}

					base_path = image.hasAttribute('data-src-base') ? image.getAttribute('data-src-base') : '';

				} else { //IE <=7 fix

					if(typeof image['data-src'] === undefined){
						continue;
					}

					base_path = typeof image['data-src'] !== undefined ? image.getAttribute('data-src-base') : '';

				}

				//get attributes

					var queries;

					//check if devicePixelRatio method exists 
					if(window.devicePixelRatio){

						//if devicePixelRatio is above 1.2 and 2x attr exists
						if( window.devicePixelRatio >= 1.2 && (image.hasAttribute ? image.hasAttribute('data-src2x') : typeof image['data-src2x'] !== undefined) ){
							
							//get queries from 2x attr
							queries = image.getAttribute('data-src2x');
						}

					}

					//if queries is undefiend
					if(queries === undefined) {

						//get queries from 1x attr
						queries = image.getAttribute('data-src');
					}

				//split defined query list

					var queries_array = queries.split(',');

				//loop queries

				for(var j = 0; j < queries_array.length; j++){

					//split each individual query
					var query = queries_array[j].split(':');

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

						//console.log('vieport:'+viewport + 'src:' + base_path + response);
						var new_source = base_path + response;

						if(image.src !== new_source){

							//change img src to base_path + response
							image.setAttribute('src', new_source);

						}

						//break loop
						break;
					}

				}


		}

	}

if(window.addEventListener){

	window.addEventListener('load', makeImagesResponsive, false);
	window.addEventListener('resize', makeImagesResponsive, false);

} else { //ie <=8 fix

	window.attachEvent('onload', makeImagesResponsive);
	window.attachEvent('onresize', makeImagesResponsive);

}