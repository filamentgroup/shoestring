/*
shoestring unit tests - using qUnit
*/
(function(undefined){

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