//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "ajax/ajax" ], function(){
//>>excludeEnd("exclude");

  shoestring.ajax.dataParams = function(data) {
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
  };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
