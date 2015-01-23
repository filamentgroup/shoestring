//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "ajax/ajax" ], function(){
//>>excludeEnd("exclude");

	shoestring.ajax.data = {
		params: function(url, req, settings) {
			var key, data, params = "";

			data = settings.data;

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

			// append params to url for GET requests
			if( settings.method === "GET" && params ){
				//>>includeStart("development", pragmas.development);
				if( url.indexOf("?") >= 0 ){
					shoestring.error( 'ajax-url-query' );
				}
				//>>includeEnd("development");

				url += "?" + params;
			}

			return {
				url: url,
				params: params
			};
		},

		headers: function(params, req, settings) {
			// Set 'Content-type' header for POST requests
			if( settings.method === "POST" && params ){
				req.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
			}

		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
