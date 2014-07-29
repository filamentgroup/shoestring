(function(undefined){
  var config, ss = shoestring;
	var $fixture = shoestring( '#qunit-fixture' );

	module( 'dom', config = {
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
		var $css = $fixture.find( ".css" ),
			$otherCss = $fixture.find( ".othercss" );

		$css.css({
			foo: "bar",
			baz: "bak",
			"float": "left",
			"margin-right": "1px",
			"transform": "rotateX(0)",
			"WebkitTransform": "rotateX(0)",
			"box-sizing": "border-box",
			"WebkitBoxSizing": "border-box"
		});

		$css.css( 'margin-left', "2px" );

		// computed style should ignore spurious styles
		equal( ss._getStyle($css[0], 'baz'), undefined );

		// width is defined in the page
		equal( ss._getStyle($css[0], 'width'), "200px", "width should show value set from <style> tag." );

		// margin-right is defined in the object assignment above
		equal( ss._getStyle($css[0], 'margin-right'), "1px", "margin-right should be set" );

		// margin-left is defined in the property assignment above
		equal( ss._getStyle($css[0], 'margin-left'), "2px", "margin-left should be set" );

		equal( ss._getStyle($css[0], "float"), "left", "float is a special case (cssFloat in JS)." );

		equal(	ss._getStyle($css[0], 'box-sizing'), 'border-box', 'Box-sizing should default to content-box.' );

		if( document.defaultView ) { // CTM for this vendor prefix test.
			notEqual( ss._getStyle($css[0], 'transform'), undefined, 'transform should **NOT** be undefined (get vendor prefixes correctly).' );
		}

		notEqual( ss._getStyle($otherCss[0], 'width'), undefined, 'Width should **NOT** have a value because it’s not set.' );
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

	test('`.index()`', function() {
		var $indexed = $fixture.find( ".index div" );
		equal( $indexed.index( ".first" ), 0 );
		equal( $indexed.index( ".second" ), 1 );

		var $second = $fixture.find( ".index .second" );
		equal( $second.index(), 1 );
	});

	test('`.is()`', function() {
		ok( $fixture.is("#qunit-fixture") );
		ok( !$fixture.is(".jacky-jormp-jomp") );
	});

	test('`.last()`', function() {
		equal( $fixture.eq( $fixture.length - 1 )[0], $fixture.last()[0] );
	});

	test( '`.next()`', function() {
		var $first, $all;

		$first = $fixture.find( ".next .first" );
		$all = $fixture.find( ".next > div" );


		equal( $first.next().length, 1 );
		equal( $first.next()[0], $fixture.find(".next .second")[0]);

		equal( $all.next().length, 2 );
		equal( $all.next()[0], $fixture.find(".next .second")[0]);
		equal( $all.next()[1], $fixture.find(".next .third")[0]);
		equal( $all.next()[2], undefined );
	});

	test( '`.not()`', function() {
		var $divs = $fixture.find( ".not div" );

		equal( $divs.not( ".is-not" ).length, 1 );
		equal( $divs.not( ".is-so" ).length, $divs.length - 1 );
	});

	test( '`.parent()`', function() {
		var $children, $parent;

		$parent = $( "#qunit-fixture > .parent" );
		$children = $parent.find( ".child" );

		// double parent
		equal( $children.parent()[0],	 $parent[0] );
		equal( $children.parent()[1],	 $parent[0] );

		// default to document element
		equal( $( "html" ).parent()[0], document.documentElement );
	});

	test( '`.parents()` ... with an s', function() {
		var $children, $parent;

		$parent = $( "#qunit-fixture > .parents" );
		$children = $parent.find( ".child" );

		// the shared parents of the first and second child
		// +1 for the second parent which is unique
		equal( $children.parents().length, 6);
		equal( $children.parents()[0], $(".parents > .first-parent")[0] );
		equal( $children.parents()[2], $("#qunit-fixture")[0] );
		equal( $children.parents()[4], $("html")[0] );
		equal( $children.parents()[5], $(".parents > .second-parent")[0] );
	});

	test( '`.prepend() adds a first child element', function() {
		var tmp, $prepend = $fixture.find( ".prepend" );

		tmp = $(	"<div class='first'></div>" );
		$prepend.append( tmp[0] );
		$prepend.append( "<div class='second'></div>" );
		$prepend.append( ".testel" );

		equal( $prepend.find( ".first" )[0], tmp[0] );
		equal( $prepend.find( ".second" ).length, 1 );
		equal( $prepend.find( ".testel" ).length, 1 );
	});

	test( '`.prependTo() adds the all elements to the selected element` ', function() {
		var tmp, $prepend = $fixture.find( ".prepend" );

		tmp = $(	"<div class='first'></div>" );

		tmp.appendTo( "#qunit-fixture > .prepend" );

		equal( $prepend.find( ".first" )[0], tmp[0] );
	});

	test( '`.prev()`', function() {
		var $last, $all;

		$last = $fixture.find( ".prev div.third" );
		$all = $fixture.find( ".prev > div" );

		equal( $last.prev().length, 1 );
		equal( $last.prev()[0], $fixture.find(".prev .second")[0]);

		// ordering correct according to jquery api
		// http://api.jquery.com/prev/
		equal( $all.prev().length, 2 );
		equal( $all.prev()[0], $fixture.find(".prev .first")[0]);
		equal( $all.prev()[1], $fixture.find(".prev .second")[0]);
		equal( $all.prev()[2], undefined );
	});

	test( '`.prevAll()`', function() {
		var $last;

		$last = $fixture.find( ".prevall div.third" );

		equal( $last.prevAll().length, 2 );

		// ordering correct according to jquery api
		// http://api.jquery.com/prevall/
		equal( $last.prevAll()[0], $fixture.find(".prevall .second")[0]);
		equal( $last.prevAll()[1], $fixture.find(".prevall .first")[0]);
		equal( $last.prevAll()[2], undefined );
	});

	test( '`.prop()` returns undefined on empty set', function(){
		var $element = $( '#this_will_not_match' );

		equal( $element.prop( 'class' ), undefined );
	});

	test( '`.prop()` gets the attribute', function(){
		var $element = $fixture.find( '.prop' );

		equal( $element.prop( 'class' ), "prop" );
	});

	test( '`.prop()` sets the attribute', function(){
		var $element = $fixture.find( '.prop' );

		equal( $element.prop( 'class', "bar" )[0].className, "bar" );
	});

	test( '`.remove()`', function(){
		var $el, $fixture;

		$fixture = shoestring( '#qunit-fixture' );
		$fixture.html( '<div id="el"></div>' );
		$el = $( "#el" );

		equal( $fixture.children().length, 1 );
		$el.remove();

		equal( $fixture.children().length, 0 );
	});

	test( '`.remove()` on unattached nodes', function(){
		var $el;
		$el = $( document.createElement( "div" ) );

		$el.remove();
		ok( true );
	});

	// here to test for ie8
	test( '`.removeAttr()`', function() {
		var $removeAttr = $fixture.find( ".remove-attr" );

		equal( $removeAttr.attr( "data-foo" ), "bar" );
		$removeAttr.removeAttr( "data-foo" );
		equal( $removeAttr.attr( "data-foo" ), undefined );
	});

	test( '`.removeClass()` removes the class', function() {
		var $removeClass = $fixture.find( ".remove-class" );

		ok( $removeClass.is( ".foo" ) );
		$removeClass.removeClass( "foo" );
		ok( !$removeClass.is( ".foo" ) );
	});

	test( '`.removeClass()` leaves no extra whitespace', function() {
		var $removeClass = $fixture.find( ".remove-class" );

		$removeClass.addClass( "foo" );
		$removeClass.removeClass( "foo" );
		$removeClass.addClass( "foo" );
		$removeClass.removeClass( "foo" );

		equal( $removeClass[0].className, "remove-class" );
	});

	test( '`.removeProp()`', function() {
		var $removeProp = $fixture.find( ".remove-prop" );

		equal( $removeProp.attr( "class" ), "remove-prop" );
		$removeProp.removeProp( "class" );

		// NOTE this is bullshit, unquoted undefined works in everything but phantom
		equal( $removeProp.attr( "class"), "undefined" );
	});

	test( '`.replaceWith()`', function() {
		var $replaceWith = $fixture.find( ".replace-with" );

		equal( $fixture.find( ".replace-with" ).length, 1 );

		$replaceWith.replaceWith( "<div class='relacement'></div>" );

		equal( $fixture.find( ".replace-with" ).length, 0 );
		equal( $fixture.find( ".replacement" ).length, 0 );
	});

  // TODO make this suck less
	test( '`.serialize()`', function() {
		var data, input, type, $serialize = $fixture.find( ".serialize" );

		for( var i = 0; i < shoestring.inputTypes.length; i++ ) {
			type = shoestring.inputTypes[i];
			input = "<input type='" + type + "'" +
				"name='" + type + "'" +
				"value='" + type + "'></input>";

			$serialize.append( input );
		}

		data = $serialize.serialize();

		for( var val in data ) {
			ok( data[ val ] || data[ val ] === "" );
		}
	});

	test( '`.siblings()`', function() {
		var $fixture = shoestring( '#qunit-fixture' );
		$fixture.html( '<div></div><div id="sibling"></div><div></div>' );

		strictEqual( $( '#imaginary_element' ).siblings().length, 0, '.siblings runs on an empty set.' );
		equal( $( '#sibling' ).siblings().length, 2, '.siblings returns non-empty set.' );
	});

	test( '`.text()` returns content properly', function(){
		var container = $( "<div class='text-test'><div class='demo-box'>Demonstration Box</div><ul><li>list item 1</li><li>list <strong>item</strong> 2</li></ul></div></div>" );
		var content = "Demonstration Boxlist item 1list item 2";

		equal( container.text(), content, "should return nested text properly" );
	});

	test( '`.val()` returns correct value of element', function(){
		var value = "happy";
		var input = document.createElement( "input" );
		input.type = "text";
		input.value = value;

		equal( $( input ).val(), value, ".val should return the equivalent of the input's value" );
	});

	test( '`.val()` returns correct value of select element', function(){
		var select = document.createElement( "select" );
		var option1 = document.createElement( "option" );
		var option2 = document.createElement( "option" );

		option1.value = "1";
		option2.value = "2";

		option2.selected = "selected";

		select.appendChild( option1 );
		select.appendChild( option2 );

		equal( $( select ).val(), "2", ".val should return the equivalent of the select's selected option's value" );
	});

	test( '`$( input ).val(value)` inserts value into input', function(){
		var value = "happy";
		var input = document.createElement( "input" );
		input.type = "text";
		$( input ).val( value );

		equal( input.value, value, ".val should be the equivalent of setting the input's value" );
	});

	test( '`$( select ).val(value)` selects the option that matches the value', function(){
		var select = document.createElement( "select" );
		var option1 = document.createElement( "option" );
		var option2 = document.createElement( "option" );
		var option3 = document.createElement( "option" );

		option1.value = "1";
		option2.value = "2";
		option3.value = "3";

		option2.selected = "selected";

		select.appendChild( option1 );
		select.appendChild( option2 );
		select.appendChild( option3 );

		$( select ).val( "3" );


		equal( $( select ).val(), "3", ".val should set the correct option" );
	});

	test('`.width()`', function() {
		var $width = $fixture.find( ".width" );

		// returns the value without param
		equal( $width.width(), 200 );

		// works with integers
		$width.width( 300 );
		equal( $width.width(), 300 );

		// works with strings
		$width.width( "400px" );
		equal( $width.width(), 400 );
	});

	test('`.wrapInner()`', function() {
		var $wrapInner = $fixture.find( ".wrap-inner" );

		$wrapInner.wrapInner( "<div class='wrapper'></div>" );
		equal( $wrapInner.find( ".wrapper > .inner" ).length, 1 );
		equal( $wrapInner.find( ".wrapper" ).length, 1 );
	});

	module( 'events', config );

	asyncTest( '`.bind()` and `.trigger()`', function() {
		expect( 2 );

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );

		$( "#el" ).bind( "click", function( e ) {
			ok( true, 'event callback should execute.' );
			ok( e.target, 'event.target should exist.' );
			start();
		}).trigger( "click" );
	});

	asyncTest( '`.bind()` and `.trigger()` with data', function() {
		expect( 2 );

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );

		$( "#el" ).bind( "click", { key: "test-value" }, function( e ) {
			ok( true, 'event callback should execute.' );
			equal( e.data.key, "test-value", "Data should be present on event object" );
			start();
		}).trigger( "click" );
	});

	asyncTest( '`.on()` and click event bubbles to parent', function() {
		expect( 1 );

		shoestring( '#qunit-fixture' ).html( '<div id="parent"><div id="child"></div></div>' );

		$( '#parent' ).on( "click", function() {
			ok( true, 'event callback should execute.' );
			start();
		});

		$( '#child' ).trigger( "click" );
	});

	asyncTest( '`.bind()` and `.trigger()` with custom events', function() {
		expect( 1 );

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );

		$( "#el" ).bind( "aCustomEvent", function() {
			ok( true, 'event callback should execute.' );
			start();
		}).trigger( "aCustomEvent" );
	});

	asyncTest( '`.bind()` and `.trigger()` with custom events and data', function() {
		expect( 2 );

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );

		$( "#el" ).bind( "aCustomEvent", { key: "custom" }, function(e) {
			ok( true, 'event callback should execute.' );
			equal( e.data.key, "custom" );
			start();
		}).trigger( "aCustomEvent" );
	});

	asyncTest( '`.bind()` doesn’t `.trigger()` with custom events', function() {
		expect( 1 );

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );

		$( "#el" ).bind( "aCustomEvent", function() {
			ok( false, "Should not execute without being triggered." );
		}).bind( "anotherCustomEvent", function() {
			ok( false, "Should not execute without being triggered." );
		});

		setTimeout(function() {
			ok( true );

			start();
		}, 30);
	});

	asyncTest( '`.on()` and custom events bubble to parent', function() {
		expect( 1 );

		shoestring( '#qunit-fixture' ).html( '<div id="parent"><div id="child"></div></div>' );

		$( '#parent' ).on( "aCustomEvent", function() {
			ok( true, 'event callback should execute.' );
			start();
		});

		$( '#child' ).trigger( "aCustomEvent" );
	});

	asyncTest( '`.bind()` and `.trigger()` with multiple of the same event on a single element', function() {
		expect( 3 );
		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );

		$( "#el" ).bind( "click", function() {
			counter++;
			equal( counter, 1, 'event callback should execute first.' );
		}).bind( "click", function() {
			counter++;
			equal( counter, 2, 'event callback should execute second.' );
		}).bind( "click", function() {
			counter++;
			equal( counter, 3, 'event callback should execute third.' );
			start();
		}).trigger( "click" );
	});

	asyncTest( '`.bind()` and `.trigger()` with multiple of the same event on a single element, bubbles to parent', function() {
		expect( 3 );
		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="parent"><div id="child"></div></div>' );

		$( "#parent" ).bind( "click", function() {
			counter++;
			equal( counter, 1, 'event callback should execute first.' );
		}).bind( "click", function() {
			counter++;
			equal( counter, 2, 'event callback should execute second.' );
		}).bind( "click", function() {
			counter++;
			equal( counter, 3, 'event callback should execute third.' );
			start();
		});

		$( "#child" ).trigger( "click" );
	});

	asyncTest( '`.bind()` and `.trigger()` with multiple of the same event on different elements', function() {
		expect( 2 );
		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="el1"></div><div id="el2"></div>' );

		$( "#el1" ).bind( "click", function() {
			counter++;
			equal( counter, 1, 'event callback should execute first.' );
		});
		$( "#el2" ).bind( "click", function() {
			counter++;
			equal( counter, 2, 'event callback should execute second.' );
			start();
		});
		$( "#el1" ).trigger( "click" );
		$( "#el2" ).trigger( "click" );
	});

	asyncTest( '`.bind()` and `.trigger()` with multiple of the same custom event on a single element', function() {
		expect( 2 );
		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );

		$( "#el" ).bind( "aCustomEvent", function() {
			counter++;
			equal( counter, 1, 'event callback should execute first.' );
		}).bind( "aCustomEvent", function() {
			counter++;
			equal( counter, 2, 'event callback should execute second.' );
			start();
		}).trigger( "aCustomEvent" );
	});

	asyncTest( '`.bind()` and `.trigger()` with multiple of the same custom event on a single element, bubbles to parent', function() {
		expect( 2 );
		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="parent"><div id="child"></div></div>' );

		$( "#parent" ).bind( "aCustomEvent", function() {
			counter++;
			equal( counter, 1, 'event callback should execute first.' );
		}).bind( "aCustomEvent", function() {
			counter++;
			equal( counter, 2, 'event callback should execute second.' );
			start();
		});

		$( "#child" ).trigger( "aCustomEvent" );
	});

	asyncTest( '`.bind()` and `.trigger()` with multiple of the same custom event on different elements', function() {
		expect( 2 );

		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="el1"></div><div id="el2"></div>' );

		$( "#el1" ).bind( "aCustomEvent", function() {
			counter++;
			equal( counter, 1, 'event callback should execute first.' );
		});
		$( "#el2" ).bind( "aCustomEvent", function() {
			counter++;
			equal( counter, 2, 'event callback should execute second.' );
			start();
		});
		$( "#el1" ).trigger( "aCustomEvent" );
		$( "#el2" ).trigger( "aCustomEvent" );
	});

	asyncTest( '`.bind()` should not trigger', function() {
		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );

		$( '#el' )
			.bind( "dragmove.carousel", function( e, data ){
				ok( false, "Should not execute without being triggered.");
			});

		setTimeout(function() {
			ok( true );

			start();
		}, 30);
	});

	asyncTest( '`.unbind()`', function() {
		expect( 1 );
		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );
		var f = function() {
			counter++;
		};

		$( "#el" ).bind( "click", f )
			.trigger( "click" )
			.unbind( "click", f )
			.trigger( "click" );

		setTimeout(function() {
			equal( counter, 1, "callback should have fired once." );
			start();
		}, 30);
	});

	asyncTest( '`.unbind()` without callback', function() {
		expect( 1 );
		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );
		var f = function() {
			counter++;
		};

		$( "#el" ).bind( "click", f )
			.trigger( "click" )
			.unbind( "click" )
			.trigger( "click" );

		setTimeout(function() {
			equal( counter, 1, "callback should have fired once." );
			start();
		}, 30);
	});

	asyncTest( '`.unbind()` custom event', function() {
		expect( 1 );
		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );
		var f = function() {
			counter++;
		};

		$( "#el" ).bind( "aCustomEvent", f )
			.trigger( "aCustomEvent" )
			.unbind( "aCustomEvent", f )
			.trigger( "aCustomEvent" );

		setTimeout(function() {
			equal( counter, 1, "callback should have fired once." );
			start();
		}, 30);
	});

	asyncTest( '`.unbind()` without callback, custom event', function() {
		expect( 1 );
		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );
		var f = function() {
			counter++;
		};

		$( "#el" ).bind( "aCustomEvent", f )
			.trigger( "aCustomEvent" )
			.unbind( "aCustomEvent" )
			.trigger( "aCustomEvent" );

		setTimeout(function() {
			equal( counter, 1, "callback should have fired once." );
			start();
		}, 30);
	});

	asyncTest( '`.unbind()` in a `.bind()` callback', function() {
		expect( 1 );
		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="el"></div>' );
		var f = function() {
			counter++;
			$( this ).unbind( "aCustomEvent", f );
		};

		$( "#el" ).bind( "aCustomEvent", f )
			.trigger( "aCustomEvent" )
			.trigger( "aCustomEvent" );

		setTimeout(function() {
			equal( counter, 1, "callback should have fired once." );
			start();
		}, 30);
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

	test( '`.one()` with multiple custom events', function() {
		var $fixture = shoestring( '#qunit-fixture' ),
			triggerCount = 0,
			$el;

		$fixture.html( '<div id="el"></div>' );
		$el = $( "#el" );

		$el.one( "aCustomEvent anotherCustomEvent yetAnotherCustomEvent", function() {
			triggerCount++;
		});

		$el.trigger( "aCustomEvent" );
		$el.trigger( "anotherCustomEvent" );

		strictEqual( triggerCount, 1, 'only one event callback should execute.' );
	});

	asyncTest( '`.bind()` bubbling event order', function() {
		expect( 2 );

		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="parent"><div id="child"></div></div>' );

		$( '#parent' ).bind( "click", function() {
			counter++;
			equal( counter, 2, 'event callback should execute second.' );
		});

		$( '#child' ).bind( "click", function() {
			counter++;
			equal( counter, 1, 'event callback should execute first.' );
		}).trigger( "click" );

		setTimeout(function() {
			start();
		}, 15);
	});


	asyncTest( '`.bind()` bubbling custom event order', function() {
		expect( 2 );

		var counter = 0;

		shoestring( '#qunit-fixture' ).html( '<div id="parent"><div id="child"></div></div>' );

		$( '#parent' ).bind( "aCustomEvent", function() {
			counter++;
			equal( counter, 2, 'event callback should execute second.' );
		});

		$( '#child' ).bind( "aCustomEvent", function() {
			counter++;
			equal( counter, 1, 'event callback should execute first.' );
		}).trigger( "aCustomEvent" );

		setTimeout(function() {
			start();
		}, 15);
	});

	if( window.JSON && 'localStorage' in window ) {
		module( "util", config );

		test( "when a shoestring.fn method is called it gets tracked", function() {
			var tracked;

			window.localStorage.setItem( shoestring.trackedMethodsKey,	"{}" );

			$fixture.find( "div" ).remove();

			tracked = JSON.parse( window.localStorage.getItem(shoestring.trackedMethodsKey) );

			ok( tracked.find );
			ok( tracked.remove );
		});
	}

	// TODO test events + arguments on callbacks and trigger
	// TODO unbind events by namespace only
})();
