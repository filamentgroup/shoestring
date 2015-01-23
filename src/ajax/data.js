//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "ajax/ajax" ], function(){
//>>excludeEnd("exclude");

	shoestring.ajax.data = {
		params: function(data) {
			var key, params = "";

			// create parameter string from data object
			if( data ){
				for( key in data ){
					if( data.hasOwnProperty( key ) ){
						if( params !== "" ){
							params += "&";
						}
						params += encodeURIComponent( key ) + "=" +
							encodeURIComponent( data[key] );
					}
				}
			}

			return params;
		},

		url: function(url, params, settings) {
			// append params to url for GET requests
			if( settings.method === "GET" && params ){
				//>>includeStart("development", pragmas.development);
				if( url.indexOf("?") >= 0 ){
					shoestring.error( 'ajax-url-query' );
				}
				//>>includeEnd("development");

				url += "?" + params;
			}

			return url;
		},

		headers: function(params, req, settings) {
			if( !req.setRequestHeader ){
				return;
			}

			// Set 'Content-type' header for POST requests
			if( settings.method === "POST" && params ){
				req.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
			}
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
