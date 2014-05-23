(function(undefined){
	var $fixture = shoestring( '#qunit-fixture' );

	module( 'Extensions', {
		setup: function() {
			$fixture = shoestring( '#qunit-fixture' );
		}
	});

	test( '`.add()` adds selected elements to the set', function(){
		var length, count;

		length = $fixture.length;
		count = shoestring( '.add' ).length;
		$fixture = $fixture.add( '.add' );

		equal( $fixture.length, length + count );
	});

	test( '`.addClass()` adds a classes when they doesnt exit', function(){
		var $element = $fixture.find( '.add-class' );

		$element.addClass( 'foo bar baz' );
		equal( $element.attr( "class" ), "add-class foo bar baz" );
	});

	test( '`.addClass()` doesnt duplicate classes', function(){
		var $element = $fixture.find( '.add-class' );

		$element.addClass( 'add-class' );
		equal( $element.attr( "class" ), "add-class" );
	});

	test( '`.after()` inserts a sibling after the current obj element', function(){
		expect( 3 );
		var $element = $fixture.find( '.after' );

		equal( $fixture.find( '.foo-after' ).length, 0 );
		$element.after( "<div class='foo-after'></div> ");
		equal( $fixture.find( '.foo-after' ).length, 1 );

		// sibling to .foo-after
		$fixture.children().each(function(i) {
			if( shoestring( this ).is( '.after' ) ){
				equal( $fixture.children()[i+1].className, "foo-after" );
			}
		});
	});

	test( '`.insertAfter()` inserts after the selector', function(){
		expect( 3 );

		equal( $fixture.find( '.foo-after' ).length, 0 );
		shoestring( "<div class='foo-after'></div> ").insertAfter( '.after' );
		equal( $fixture.find( '.foo-after' ).length, 1 );

		// sibling to .foo-after
		$fixture.children().each(function(i) {
			if( shoestring( this ).is( '.after' ) ){
				equal( $fixture.children()[i+1].className, "foo-after" );
			}
		});
	});

	test( '`.live()` is an alias of `.on()`', function() {
		ok( shoestring( "body" ).live == shoestring( "body" ).on );
	});

	test( '`.closest()`', function() {
		var $fixture = shoestring( '#qunit-fixture' );
		$fixture.html( '<div class="parent second"><div class="parent first"><div class="child"></div></div></div>' );

		var $child = $fixture.find( '.child' );

		equal( $child[0], $child.closest( '.child' )[0], 'Closest returns current element on match' );

		equal( $child.closest( '.parent' ).length, 1, 'Closest returns only one element.' );

		ok( $child.closest( '.parent' ).is( '.first' ), 'Closest returns from the bottom up.' );
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

	test( '`.siblings()`', function() {
		var $fixture = shoestring( '#qunit-fixture' );
		$fixture.html( '<div></div><div id="sibling"></div><div></div>' );

		strictEqual( $( '#imaginary_element' ).siblings().length, 0, '.siblings runs on an empty set.' );
		equal( $( '#sibling' ).siblings().length, 2, '.siblings returns non-empty set.' );
	});

})();
