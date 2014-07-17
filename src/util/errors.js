//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.enUS = {
		errors: {
			prefix: "Shoestring does not support",
			'has-class' : " the hasClass method. Try using .is( '.klassname' ) instead.",
			'live-delegate' : "the .live or .delegate methods. Use .bind or .on instead.",
			'next-selector' : "passing selectors into .next, try .next().filter( selector )",
			'on-delegate' : " the .on method with three or more arguments. Using .on( eventName, callback ) instead.",
			'prev-selector' : "passing selectors into .prev, try .prev().filter( selector )",
			'text-setter': "setting text via the .text method."
		}
	};

	shoestring.error = function( id ) {
		var errors = shoestring.enUS.errors;
		throw new Error( errors.prefix + " " + errors[id] );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
