// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	
	var xmlHttp = (function() {
		var xmlhttpmethod = false;	
		try {
			xmlhttpmethod = new XMLHttpRequest();
		}
		catch( e ){
			xmlhttpmethod = new ActiveXObject( "Microsoft.XMLHTTP" );
		}
		return function(){
			return xmlhttpmethod;
		};
	})();
	
	wrap.ajax = function( url, options ) {
		var req = xmlHttp(),
		settings = wrap.ajax.settings;
		
		if( options ){
			wrap.extend( settings, options );
		}
		if( !url ){
			url = settings.url;
		}
		
		if( !req || !url ){
			return;
		}	
		
		req.open( settings.method, url, settings.async );
		
		req.onreadystatechange = function () {
			if ( req.readyState !== 4 || req.status !== 200 && req.status !== 304 ){
				return settings.error( req.responseText, req.status, req );
			}
			settings.success( req.responseText, req.status, req );
		}
		if( req.readyState === 4 ){
			return;
		}

		req.send( null );
	};
	
	wrap.ajax.settings = {
		success: function(){},
		error: function(){},
		method: "GET",
		async: true,
		data: null
	};
	
	wrap.get = function( url, callback ){
		return wrap.ajax( url, { success: callback } );
	};
	
	wrap.post = function( url, data, callback ){
		return wrap.ajax( url, { data: data, method: "POST", success: callback } );
	};
	
	wrap.fn.load = function( url, callback ){
		var self = this,
			args = arguments,
			intCB = function( data ){
				self.each(function(){
					wrap( this ).html( data );
				});
				if( callback ){
					callback.apply( self, args );
				}
		};
		wrap.ajax( url, { success: intCB } );
		return this;
	};
	

})();