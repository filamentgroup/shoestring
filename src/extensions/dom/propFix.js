//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/dom/propFix.js" ], function(){
//>>excludeEnd("exclude");

	// Property normalization, a subset taken from jQuery src
	shoestring.propFix = {
		"class": "className",
		contenteditable: "contentEditable",
		"for": "htmlFor",
		readonly: "readOnly",
		tabindex: "tabIndex"
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
