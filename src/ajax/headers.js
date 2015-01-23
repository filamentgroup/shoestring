//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "ajax/ajax" ], function(){
//>>excludeEnd("exclude");

	shoestring.ajax.headers = function(req, headers) {
		for( var key in headers ){
			if( headers.hasOwnProperty( key ) ){
				req.setRequestHeader(key, headers[ key ]);
			}
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
