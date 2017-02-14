//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.enUS = {
		errors: {
			"prefix": "Shoestring does not support",

			"ajax-url-query": "data with urls that have existing query params",
			"children-selector" : "passing selectors into .child, try .children().filter( selector )",
			"click": "the click method. Try using .on( 'click', function(){}) or .trigger( 'click' ) instead.",
			"css-get" : "getting computed attributes from the DOM.",
			"data-attr-alias": "the data method aliased to `data-` DOM attributes.",
			"each-length": "objects without a length passed into each",
			"has-class" : "the hasClass method. Try using .is( '.klassname' ) instead.",
			"html-function" : "passing a function into .html. Try generating the html you're passing in an outside function",
			"index-shoestring-object": "an index call with a shoestring object argument. Use .get(0) on the argument instead.",
			"live-delegate" : "the .live or .delegate methods. Use .bind or .on instead.",
			"map": "the map method. Try using .each to make a new object.",
			"next-selector" : "passing selectors into .next, try .next().filter( selector )",
			"off-delegate" : ".off( events, selector, handler ) or .off( events, selector ). Use .off( eventName, callback ) instead.",
			"next-until" : "the .nextUntil method. Use .next in a loop until you reach the selector, don't include the selector",
			"on-delegate" : "the .on method with three or more arguments. Using .on( eventName, callback ) instead.",
			"outer-width": "the outerWidth method. Try combining .width() with .css for padding-left, padding-right, and the border of the left and right side.",
			"prev-selector" : "passing selectors into .prev, try .prev().filter( selector )",
			"prevall-selector" : "passing selectors into .prevAll, try .prevAll().filter( selector )",
			"queryselector": "all CSS selectors on querySelector (varies per browser support). Specifically, this failed: ",
			"siblings-selector": "passing selector into siblings not supported, try .siblings().find( ... )",
			"show-hide": "the show or hide methods. Use display: block (or whatever you'd like it to be) or none instead",
			"text-setter": "setting text via the .text method.",
			"toggle-class" : "the toggleClass method. Try using addClass or removeClass instead.",
			"trim": "the trim method. Use String.prototype.trim."
		}
	};

	shoestring.error = function( id, str ) {
		var errors = shoestring.enUS.errors;
		throw new Error( errors.prefix + " " + errors[id] + ( str ? " " + str : "" ) );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
