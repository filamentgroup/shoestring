//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

  shoestring.enUS = {
    errors: {
      'prev-selector' : "Shoestring does not support passing selectors into .prev, try .prev().filter(selector)",
			'hasClass' : "Shoestring does not support the hasClass method. Try using .is( '.klassname' ) instead"
    }
  };

  shoestring.error = function( id ) {
    throw new Error( shoestring.enUS.errors[id] );
  };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
