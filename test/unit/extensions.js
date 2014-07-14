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

	test( '`.append()` inserts a child in the current obj element', function(){
		var $element = $fixture.find( '.append' );

		equal( $element.find( '.foo-append' ).length, 0 );
		$element.append( "<div class='foo-append'></div> ");
		equal( $element.find( '.foo-append' ).length, 1 );
	});

	test( '`.insertAfter()` inserts after the selector', function(){
		var $element = $fixture.find( '.append' );

		equal( $element.find( '.foo-append' ).length, 0 );
		shoestring( "<div class='foo-append'></div> ").appendTo( $element );
		equal( $element.find( '.foo-append' ).length, 1 );
	});

	test( '`.attr()` returns undefined on empty set', function(){
		var $element = $( '#this_will_not_match' );

		equal( $element.attr( 'class' ), undefined );
	});

	test( '`.attr()` gets the attribute', function(){
		var $element = $fixture.find( '.attr' );

		equal( $element.attr( 'class' ), "attr" );
	});

	test( '`.attr()` sets the attribute', function(){
		var $element = $fixture.find( '.attr' );

		equal( $element.attr( 'class', "foo" ).attr( 'class' ), "foo" );
	});

	test( '`.before()` inserts a sibling before the current obj element', function(){
		expect( 3 );
		var $element = $fixture.find( '.before' );

		equal( $fixture.find( '.foo-before' ).length, 0 );
		$element.before( "<div class='foo-before'></div> ");
		equal( $fixture.find( '.foo-before' ).length, 1 );

		// sibling to .foo-before
		$fixture.children().each(function(i) {
			if( shoestring( this ).is( '.before' ) ){
				equal( $fixture.children()[i-1].className, "foo-before" );
			}
		});
	});

	test( '`.insertBefore()` inserts before the selector', function(){
		expect( 3 );

		equal( $fixture.find( '.foo-before' ).length, 0 );
		shoestring( "<div class='foo-before'></div> ").insertBefore( '.before' );
		equal( $fixture.find( '.foo-before' ).length, 1 );

		// sibling to .foo-before
		$fixture.children().each(function(i) {
			if( shoestring( this ).is( '.before' ) ){
				equal( $fixture.children()[i-1].className, "foo-before" );
			}
		});
	});

	test( '`.clone()` prevents alteration of original', function() {
		var $clone, $element;

		$element = $fixture.find( ".clone" );
		$clone = $element.clone();

		equal( $element.attr( "class" ), "clone" );
		equal( $clone.attr( "class" ), "clone" );
		$clone.attr( "class", "foo" );
		equal( $element.attr( "class" ), "clone" );
		equal( $clone.attr( "class" ), "foo" );
	});

	test( '`.closest()`', function() {
		var $fixture = shoestring( '#qunit-fixture' );

		var $child = $fixture.find( '.closest .child' );

		equal( $child[0], $child.closest( '.child' )[0], 'Closest returns current element on match' );

		equal( $child.closest( '.parent' ).length, 1, 'Closest returns only one element when original nodelist has one element.' );

		var $children = $fixture.find( '.closest .second-child' ).add( $child );

		equal( $children.closest( '.parent' ).length, 2, 'Closest returns only two elements when original nodelist has two element.' );

		ok( $child.closest( '.parent' ).is( '.first' ), 'Closest returns from the bottom up.' );

		ok( $child.closest( '.parent.second' ).is( '.second' ), 'Closest will traverse at least two parents correctly.' );
	});

	test('`.css()`', function() {
		var $css = $fixture.find( ".css" );

		$css.css({
			foo: "bar",
			baz: "bak"
		});

		equal( $css[0].style.foo, "bar" );

		// computed style should ignore spurious styles
		equal( $css.css('baz'), undefined );

		equal( $css.css('width'), "200px" );
	});

	test('`.eq()`', function() {
		equal( $fixture.eq( 0 )[0], $fixture[0] );
		equal( $fixture.eq( 1000000 )[0], undefined );
	});

	test('`.filter()`', function() {
		var $divs = $fixture.find( "div" );

		equal( $divs.filter( ".filter" ).length, 1 );
		equal( $divs.filter( ".filter" )[0], $fixture.find( ".filter" )[0] );

		var $withoutParent = $( "<div class='filter'></div><div></div>" );

		equal( $withoutParent.filter( ".filter" ).length, 1 );
		equal( $withoutParent.filter( ".filter" )[0], $withoutParent[0] );
	});

	test('`.first()`', function() {
		equal( $fixture.eq( 0 )[0], $fixture.first()[0] );
	});

	test('`.get()`', function() {
		equal( $fixture[0], $fixture.get(0) );
	});

	test('`.height()`', function() {
		var $height = $fixture.find( ".height" );

		// returns the value without param
		equal( $height.height(), 200 );

		// works with integers
		$height.height( 300 );
		equal( $height.height(), 300 );

		// works with strings
		$height.height( "400px" );
		equal( $height.height(), 400 );
	});

	test( '`.html()`', function() {
		var $old = shoestring( '.html .old' ),
			$new = shoestring( '.html .new' ),
			htmlStr = '<div id="sibling"></div>';

		$old[0].innerHTML = htmlStr;
		$new.html( htmlStr );

		ok( !!$old[0].innerHTML );
		equal( $new[0].innerHTML, $old[0].innerHTML, '.html(str) set properly.' );
		equal( $new.html(), $old[0].innerHTML, '.html() get properly.' );
	});

	test( '`.live()` is an alias of `.on()`', function() {
		ok( shoestring( "body" ).live == shoestring( "body" ).on );
	});

	test( '`.siblings()`', function() {
		var $fixture = shoestring( '#qunit-fixture' );
		$fixture.html( '<div></div><div id="sibling"></div><div></div>' );

		strictEqual( $( '#imaginary_element' ).siblings().length, 0, '.siblings runs on an empty set.' );
		equal( $( '#sibling' ).siblings().length, 2, '.siblings returns non-empty set.' );
	});

	asyncTest( '`.bind()` and `.trigger()`', function() {
		// Note this test currently fails in IE8
		expect( 1 );

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );

		$( "#el" ).bind( "click", function() {
			ok( true, 'event callback should execute.' );
			start();
		}).trigger( "click" );
	});

	asyncTest( '`.bind()` and `.trigger()` with custom events', function() {
		expect( 1 );

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );

		$( "#el" ).bind( "aCustomEvent", function() {
			ok( true, 'event callback should execute.' );
			start();
		}).trigger( "aCustomEvent" );
	});

	test( '`.one()` with multiple events (see #13)', function() {
		var $fixture = shoestring( '#qunit-fixture' ),
			triggerCount = 0,
			$el;

		$fixture.html( '<div id="el"></div>' );
		$el = $( "#el" );

		$el.one( "hover mousedown", function() {
			triggerCount++;
		});

		$el.trigger( "hover" );
		$el.trigger( "mousedown" );

		strictEqual( triggerCount, 1, 'only one event callback should execute.' );
	});

	test( '`.data` works on empty nodelists', function() {
		var $fixture = shoestring( '#qunit-fixture' ),
			$el;

		$fixture.html( '<div id="el"></div>' );
		$el = $( "#el" );

		strictEqual( $( '#thiswontmatch' ).data(), undefined, 'should be undefined on an empty result set.' );
		strictEqual( $( '#thiswontmatch' ).data( "somekey" ), undefined, 'should be undefined on an empty result set with a key passed in.' );

		deepEqual( $( '#el' ).data(), {}, 'should be an empty object on an nonempty result set.' );
		strictEqual( $( '#el' ).data( "somekey" ), undefined, 'should be undefined on an nonempty result set with a key passed in.' );
	});

})();
