//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	var xmlHttp = function() {
		try {
			return new XMLHttpRequest();
		}
		catch( e ){
			return new ActiveXObject( "Microsoft.XMLHTTP" );
		}
	};

	shoestring.ifdef = function(options) {
		if( !options.call ){
			return options.default;
		}

		return options.call.apply(this, options.args);
	};

	/**
	 * Make an HTTP request to a url.
	 *
	 * **NOTE** the following options are supported:
	 *
	 * - *method* - The HTTP method used with the request. Default: `GET`.
	 * - *data* - Raw object with keys and values to pass with request as query params. Default `null`.
	 * - *headers* - Set of request headers to add. Default `{}`.
	 * - *async* - Whether the opened request is asynchronouse. Default `true`.
	 * - *success* - Callback for successful request and response. Passed the response data.
	 * - *error* - Callback for failed request and response.
	 * - *cancel* - Callback for cancelled request and response.
	 *
	 * @param {string} url The url to request.
	 * @param {object} options The options object, see Notes.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.ajax = function( url, options ) {
		var params = "", req = xmlHttp(), settings;

		settings = shoestring.extend( {}, shoestring.ajax.settings );

		if( options ){
			shoestring.extend( settings, options );
		}

		if( !url ){
			url = settings.url;
		}

		if( !req || !url ){
			return;
		}

		params = shoestring.ifdef({
			call: shoestring.ajax.data.params,
			args: [settings.data],
			default: ""
		});

		url = shoestring.ifdef({
			call: shoestring.ajax.data.url,
			args: [url, params, settings.method],
			default: url
		});

		req.open( settings.method, url, settings.async );

		shoestring.ifdef({
			call: shoestring.ajax.data.headers,
			args: [params, req, settings.method]
		});

		if( req.setRequestHeader ){
			req.setRequestHeader( "X-Requested-With", "XMLHttpRequest" );

			shoestring.ifdef({
				call: shoestring.ajax.headers,
				args: [req, settings.headers]
			});
		}

		req.onreadystatechange = function () {
			if( req.readyState === 4 ){
				// Trim the whitespace so shoestring('<div>') works
				var res = (req.responseText || '').replace(/^\s+|\s+$/g, '');
				if( req.status.toString().indexOf( "0" ) === 0 ){
					return settings.cancel( res, req.status, req );
				}
				else if ( req.status.toString().match( /^(4|5)/ ) && RegExp.$1 ){
					return settings.error( res, req.status, req );
				}
				else if (settings.success) {
					return settings.success( res, req.status, req );
				}
			}
		};

		if( req.readyState === 4 ){
			return req;
		}

		// Send request
		if( settings.method === "POST" && params ){
			req.send( params );
		} else {
			req.send();
		}

		return req;
	};

	shoestring.ajax.settings = {
		success: function(){},
		error: function(){},
		cancel: function(){},
		method: "GET",
		async: true,
		data: null,
		headers: {}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
