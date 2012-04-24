# wrap

a simple framework for DOM utilities, targeting modern browsers without failing the rest

* Copyright 2012 @scottjehl, Filament Group, Inc.
* Licensed MIT/GPLv2

wrap is a simple dom wrapper that follows a jQuery-like syntax. also like jQuery, wrap is meant to let you find elements and do things with them. Unlike jQuery, wrap is written in such a way that it'll only do anything at all in modern browsers, like IE8 and up. Other browsers? They'll get a less-enhanced experience. There won't be errors, but there may be less zing. Build with Progressive Enhancement and you should be fine.

also unlike jQuery, wrap is a simple, small, extendable core that handles not much more than the wrapping and iterating of dom nodes. did i mention it's small? it's small. .5kb min/gzippd. it doesn't come with much more than a few essentials, but using those, wrap is easy to extend further.

Open up test/console.html to play around.

# examples

at it's core, wrap is a function and a few utilities. to start, you can find some elements via CSS selectors, like so:

    wrap( "#foo, .bar" )

this will return a `wrap` array of DOM nodes, which allows you to chain `wrap` methods one after another, affecting all elements in the selection. after you've found some elements, you might care to find more of them within your result. the `find` method does just that.

    wrap( "#foo, .bar" ).find( "#baz" );

some sugary syntax for the same result as above:

    wrap( "#baz",  "#foo, .bar" );

perhaps you'd like to iterate through each item that was found, applying scripting to them all. the `each` method has you covered.

    wrap( "#foo, .bar" ).each(function(){
		console.log( this );
		// here, "this" refers to the current element in iteration
	});
	
`each` also supports a passed iteration number, if you please:

    wrap( "#foo, .bar" ).each(function( i ){
		console.log( i );
		// here, "i" refers to the current iteration number (0 or 1 in this case)
	});

...but wait. you'll probably want to hold off on all that until the dom is ready. no worry, just like you would in jQuery, pass a function into wrap and it'll queue it up til the coast is clear.

    wrap(function(){
		// execute code here
	});

Internally, this dom-ready shortcut also provides the benefit of doing nothing at all in browsers that don't mass the `wrap.qualified` boolean (which, by default, checks for `document.querySelectorAll` support).

That same test is exposed in a handy api method as well: `qualify`. The `qualify` method serves two purposes: first, you can run it with no arguments to find out if a browser is qualified to run `wrap`, receiving a boolean answer: 

    var qualifiedBrowser = wrap.qualify();

More useful, you can pass a function to `qualify` and that function will only execute in qualified browsers. If all of your code executes via DOM ready, you won't need this, but if it executes earlier, just wrap your code in a `qualify` callback to safeproof its execution. Basically, you might use `qualify` in place of your typical `IIFE` wrapper:

    wrap.qualify(
		// It's safer in here.
	    wrap( "#foo, .bar" ).each(function(){
			console.log( this );
			// here, "this" refers to the current element in iteration
		});
	);

By default, `qualify` uses the boolean stored in `wrap.qualified` internally, to determine browser qualification. You can override `wrap.qualified` with any combination of features you want. By default, it just needs `document.querySelectorAll` support.

OK, that's all `wrap` has in the way of dom helpers... from there, we'll need extensions.

For extensions, `wrap` comes with a utility function or three. first, the `extend` method, which is just a simple object extender:

    wrap.extend( { foo: "bar" }, { baz: "bam!" } );
	// --> { foo: "bar", baz: "bam!" }

extend doesn't do deep object extensions, but it covers the usual hash mixin use case pretty well. you can use it to extend any object with another, but you might choose use it to add more utility functions to `wrap` itself, like so:

    wrap.extend( wrap, { alertfoo: function(){ alert( "foo" ); } });
	
	wrap.foo();
	
	// --> throws an alert of "foo"

the second utility, `inArray`, will let you know if an item is in an array or not, returning the position of the item in the array (or `-1` if it's not present). This is helpful when returning arrays that should only contain unique entries, like a bunch of dom node references, for instance.

    wrap.inArray( "b", ["a","b","c"] );
	// --> true, "b" is in that array

the third utility function, `fn`, is a bit more interesting, as it is where you add chainable methods to the `wrap` api. it works just like jQuery's fn method. Here's a dumb little `addClass` method, added to `wrap` via the `fn` api:

    wrap.fn.addClass = function( cname ){
      return this.each(function(){
        this.className += " " + cname;
      });
    };

a quick explanation: we've defined a function with a single argument `cname`, representing the class to be added. inside the function, `this` refers to the `wrap`'d set of dom nodes. In order to maintain `wrap`'s chainability, an `fn` function should always return either `this` or a call to `wrap()` or one of its api methods. In this case, we're returning `this`, but we're also chaining on an `each` method to iterate through each item in the selection and add `cname` to its class attribute.

now we can use it!

    wrap( "body" ).addClass( "foo" );
	
	// --> [<body class="foo"></body>]

...and since we returned `this`, we can keep going.

    wrap( "body, #foo" ).addClass( "foo" ).each(function(){
      // do something else here
    });

that's pretty much it. of course, you're going to need a few more methods to make `wrap` useful...

## wrap extensions

the `extensions` folder includes a few prebuilt methods you can grab and chuck into your project. So far, the dom methods include `parent`, `parents`, `children`, `next`, `prev`, `addClass`, `removeClass`, `attr`, `html`.

## miss your dollar?

here you go:

    window.$ = wrap;

now you can `$` it up.

    $( "foo, bar, .baz" ).each(...)