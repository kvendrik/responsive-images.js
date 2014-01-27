Responsive image replacement
============================

Check out the example [here](http://kvendrik.github.io/responsive-images.js).

resonsive-img.js is a lightweight plugin for fast, clean and easy responsive image replacement using to the viewport your visitor's browser. 
This way you can reduce the payload for your users by only letting them download the appropriate images for their device.

Have a look at the blog post [here](http://davidwalsh.name/responsive-design) for a more in-depth description.


Usage
-----

####Setting it up

To start using the plugin we only have to include the script in the footer of our document.

	<script src='responsive-img.min.js'></script>


####HTML Structure

In the `data-src` attribute we specify the different breakpoints in combination with the image source it should use. In the `data-src-base`(optional) attribute we specify the base of our source urls.

	<img alt='kitten!' data-src-base='demo/images/' data-src='<480:smallest.jpg,
														 	  <768:small.jpg,
														 	  <960:medium.jpg,
														 	  >960:big.jpg' />

Using the HTML above the browser would load demo/images/smallest.jpg if the size of the viewport is below 480 pixels, demo/images/small.jpg if the size of the viewport is above 480 pixels and below 768 pixels, demo/images/medium.jpg if the size of viewport above 768 pixels and below 960 pixels and demo/images/big.jpg if the size of viewport above 960 pixels.

Let's also create a fallback for non-javascript browsers:

	<noscript><img alt='kitten!' src='demo/images/medium.jpg' /></noscript>

That's all! We're up and running! ;)



Options
-------

The only required option is the data-src attribute. All of the options below can be used additionally.

| Name            | Type      | Description
| --------------- | --------- | ---------------------------------------------------- |
| `data-src-base` | attribute | Adds a specified path before every image source path |
| `data-src2x` 	  | attribute | Can be used instead of `data-src` if devicePixelRatio is above 1.2 (retina displays). Syntax is the same as `data-src`. |
| `data-src-base2x` 	  | attribute | Can be used instead of `data-src-base` to specify a custom base path for devices were devicePixelRatio is above 1.2 (retina displays). Can be used in combination with both `data-src` and `data-src-base` or either one |

Browser support
---------------

There are no known unsupported browsers. The plugin has currently been tested in the following browsers:

####Desktop

| Browser                   		 | Status | 
| ---------------------------------- | ------ |
| IE 11 Desktop                		 | Works! |
| IE 11 Release Preview     		 | Works! |
| IE 10   			        		 | Works! |
| IE 9   			        		 | Works! |
| IE 8                    			 | Works! |
| IE 7                    			 | Works! |
| IE 6                         		 | Works! |
| IE 5 (IE 10 desktop documentmode)  | Works! |
| Opera 10.6                		 | Works! |
| Opera 12.16               		 | Works! |
| Opera 15.0                		 | Works! |
| Opera 18.0 dev            		 | Works! |
| Safari 4.0                		 | Works! |
| Safari 5.0                		 | Works! |
| Safari 5.1                		 | Works! |
| Firefox 3                 		 | Works! |
| Firefox 12                		 | Works! |
| Firefox 24                		 | Works! |
| Firefox 26 aurora         		 | Works! |
| Chome 14                		     | Works! |
| Chome 19                		     | Works! |
| Chome 30                		     | Works! |
| Chome 31 dev            		     | Works! |


####Mobile

| OS               								  | Status |
| ----------------------------------------------- | ------ |
|  Windows Phone 8.0 (IE 10 desktop documentmode) | Works! |
|  Windows Phone 7.0 (IE 10 desktop documentmode) | Works! |
|  Android 1.5     							      | Works! |
|  Android 1.6     								  | Works! |
|  Android 2.2     								  | Works! |
|  Android 2.3     								  | Works! |
|  Android 4.0     								  | Works! |
|  Android 4.0 (tablet) 				          | Works! |
|  Android 4.1     							      | Works! |
|  Opera Mobile    							      | Works! |
|  iOS 3.0         							      | Works! |
|  iOS 3.2 (tablet) 							  | Works! |
|  iOS 4.0         							      | Works! |
|  iOS 4.3.2 (tablet) 						      | Works! |
|  iOS 5.1         								  | Works! |
|  iOS 6.0         								  | Works! |
|  iOS 7.0         								  | Works! |


####Notes

######iOS
Without meta `width=device-width;` some mobile devices will apply a standard width to it's viewport of 960px and return this to the javascript. This might cause the script to load an image which is to big for your visitors screen. Make sure to set a meta tag with `width=device-width;` in your website's head.


Comments
--------

Let me know if you have idea’s or notice something, I would love to hear your feedback!