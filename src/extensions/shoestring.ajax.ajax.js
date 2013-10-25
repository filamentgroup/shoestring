// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	
	var xmlHttp = function() {
		try {
			return new XMLHttpRequest();
		}
		catch( e ){
			return new ActiveXObject( "Microsoft.XMLHTTP" );
		}
	};
	
	shoestring.ajax = function( url, options ) {
		var req = xmlHttp(),
		settings = shoestring.ajax.settings;
		
		if( options ){
			shoestring.extend( settings, options );
		}
		if( !url ){
			url = settings.url;
		}
		
		if( !req || !url ){
			return;
		}	
		
		req.open( settings.method, url, settings.async );

		if( req.setRequestHeader ){
			req.setRequestHeader( "X-Requested-With", "XMLHttpRequest" );
		}
		
		req.onreadystatechange = function () {
			// Trim the whitespace so shoestring('<div>') works
			var res = (req.responseText || '').replace(/^\s+|\s+$/g, '');
			if ( req.readyState !== 4 || req.status !== 200 && req.status !== 304 ){
				return settings.error( res, req.status, req );
			}
			settings.success( res, req.status, req );
		};
		if( req.readyState === 4 ){
			return;
		}

		req.send( null );
	};
	
	shoestring.ajax.settings = {
		success: function(){},
		error: function(){},
		method: "GET",
		async: true,
		data: null
	};
}());