//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/dom/propFix.js" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.prop = function( name, val ){
		if( !this[0] ){
			return;
		}

		name = shoestring.propFix[ name ] || name;

		if( val !== undefined ){
			return this.each(function(){
				this[ name ] = val;
			});
		}	else {
			return this[ 0 ][ name ];
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
