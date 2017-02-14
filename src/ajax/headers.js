//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "ajax/ajax" ], function(){
//>>excludeEnd("exclude");

	shoestring.ajax.headers = function(req, settings) {
		for( var key in settings.headers ){
			if( settings.headers.hasOwnProperty( key ) ){
				req.setRequestHeader(key, settings.headers[ key ]);
			}
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
