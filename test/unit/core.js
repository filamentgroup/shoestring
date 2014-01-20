/*
shoestring unit tests - using qUnit
*/
(function(undefined){

module( 'Core' );
test( 'API Properties: shoestring is defined', function() {
	ok( shoestring !== undefined );
});

test( 'API Properties: shoestring.fn is defined', function() {
	ok( shoestring.fn !== undefined );
});

test( 'API Properties: shoestring.qualified is defined', function() {
	ok( shoestring.qualified !== undefined );
});

test( 'API Properties: shoestring.qualify is defined', function() {
	ok( shoestring.qualify !== undefined );
});

test( 'API Properties: shoestring.extend is defined', function() {
	ok( shoestring.extend !== undefined );
});

test( 'API Properties: shoestring.inArray is defined', function() {
	ok( shoestring.inArray !== undefined );
});

test( 'API Properties: shoestring.ready is defined', function() {
	ok( shoestring.ready !== undefined );
});

module( 'Types' );
test( 'API Properties: shoestring is a function', function() {
	ok( typeof(shoestring) === "function" );
});

test( 'API Properties: shoestring.fn is an object', function() {
	ok( shoestring.fn.constructor === Object );
});

test( 'API Properties: shoestring.qualified is a boolean', function() {
	ok( typeof(shoestring.qualified) === "boolean" );
});

test( 'API Properties: shoestring.qualify is a function', function() {
	ok( typeof(shoestring.qualify) === "function" );
});

test( 'API Properties: shoestring.extend is a function', function() {
	ok( typeof(shoestring.extend) === "function" );
});

test( 'API Properties: shoestring.inArray is a function', function() {
	ok( typeof(shoestring.inArray) === "function" );
});

test( 'API Properties: shoestring.ready is a function', function() {
	ok( typeof(shoestring.ready) === "function" );
});

module( 'Core fn Methods' );
test( 'API Properties: shoestring.fn.each, is defined', function() {
	ok( shoestring.fn.each !== undefined );
});

test( 'API Properties: shoestring.fn.children, is defined', function() {
	ok( shoestring.fn.children !== undefined );
});

test( 'API Properties: shoestring.fn.find, is defined', function() {
	ok( shoestring.fn.find !== undefined );
});

module( 'fn Types' );

test( 'API Properties: shoestring.fn.each, is a function', function() {
	ok( typeof(shoestring.fn.each) === "function" );
});

test( 'API Properties: shoestring.fn.children, is a function', function() {
	ok( typeof(shoestring.fn.children) === "function" );
});

test( 'API Properties: shoestring.fn.find, is a function', function() {
	ok( typeof(shoestring.fn.find) === "function" );
});



module( 'Functionality' );
test( 'shoestring with no arguments returns an array', function() {
	ok( shoestring().constructor === Array );
});

test( 'shoestring with no arguments returns an array with core methods', function() {
	ok( shoestring().constructor === Array );
});

test( 'shoestring with no arguments returns an array with one child', function() {
	ok( shoestring().length === 1 );
});

test( 'shoestring with no arguments returns an array with first child of document', function() {
	ok( shoestring()[0] === document );
});

test( 'shoestring with a string argument returns an array', function() {
	ok( shoestring( "body" ).constructor === Array );
});

test( 'shoestring with a string argument returns an array of dom nodes from qsa', function() {
	ok( shoestring( "body" )[ 0 ] === document.querySelectorAll( "body" )[ 0 ] );
});

test( 'shoestring with a string argument starting with "<" returns a generated array', function() {
	ok( shoestring( "<div></div>" ).constructor === Array );
});

test( 'shoestring with a string argument starting with "<" returns a generated array of dom nodes', function() {
	ok( shoestring( "<div></div>" )[0].constructor === HTMLDivElement );
});

test( 'shoestring with a string argument starting with "<" returns a generated array of dom nodes', function() {
	ok( shoestring( "<div></div><h2></h2>" )[1].constructor === HTMLHeadingElement );
});

test( 'shoestring with a function argument returns array', function() {
	ok( shoestring( function(){} ).constructor === Array );
});

test( 'shoestring with a function argument returns array with document child', function() {
	ok( shoestring( function(){} )[ 0 ] === document );
});

test( 'passing a string argument to shoestring with a second argument returns result scoped to second arg', function() {
	ok( shoestring( "body" )[ 0 ] === shoestring( "body", "html" )[ 0 ] );
	ok( shoestring( "body" )[ 0 ] !== shoestring( "body", "body" )[ 0 ] );
	ok( shoestring( ".testel-2" ).length === 2 );
	ok( shoestring( ".testel-2", ".testel" ).length === 1 );
});

module( 'Extensions' );
test( '`.live()` is an alias of `.on()`', function() {
	ok( shoestring( "body" ).live == shoestring( "body" ).on );
});

test( '`.closest()`', function() {
	var $fixture = shoestring( '#qunit-fixture' );
	$fixture.html( '<div class="parent second"><div class="parent first"><div class="child"></div></div></div>' );

	equal( $fixture.find( '.child' ).closest( '.parent' ).length, 1, 'Closest returns only one element.' );

	ok( $fixture.find( '.child' ).closest( '.parent' ).is( '.first' ), 'Closest returns from the bottom up.' );
});

test( '`.insertAfter()`', function() {
	var $fixture = shoestring( '#qunit-fixture' ),
		$sibling;

	$fixture.html( '<div id="sibling"></div>' );
	$sibling = shoestring( '#sibling' );

	shoestring( '<div id="insertAfter">' ).insertAfter( $sibling );

	equal( $fixture.children().length, 2, 'Has two children.' );
	ok( $sibling.next().is( '#insertAfter' ), 'Inserted properly.' );
});

test( '`.insertBefore()`', function() {
	var $fixture = shoestring( '#qunit-fixture' ),
		$sibling;

	$fixture.html( '<div id="sibling"></div>' );
	$sibling = shoestring( '#sibling' );

	shoestring( '<div id="insertBefore">' ).insertBefore( $sibling );

	equal( $fixture.children().length, 2, 'Has two children.' );
	ok( $sibling.prev().is( '#insertBefore' ), 'Inserted properly.' );
});


test( '`.html()`', function() {
	var $fixture = shoestring( '#qunit-fixture' ),
		htmlStr = '<div id="sibling"></div>';

	$fixture.html( htmlStr );
	equal( $fixture[0].innerHTML, htmlStr, '.html(str) set properly.' );
	equal( $fixture.html(), htmlStr, '.html() get properly.' );
});

})();