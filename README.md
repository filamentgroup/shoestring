# Shoestring

A lightweight, simple utility made to run on a tight budget. Out of the box, all you can really do with it is make loops, but you can easily tie it to other things too.

* Copyright 2012 @scottjehl, Filament Group, Inc.
* Licensed MIT/GPLv2

Shoestring is a simple framework for organizing, creating, and using DOM-based utilities. It's a throwback to the days of building websites using a small set of utilities that you need, and not much more. The utilities are wrapped in a handy and familiar API, making it more of a pleasure to work with.  

Shoestring supports a small set of features, and almost that entire set is optional. It is aimed particularly at cases where you need a small set of JavaScript utilities but not a heavyweight toolkit. It is designed for making user experience enhancements in modern browsers, while quietly stepping aside and letting things "be" in the older ones. 

Shoestring is part of the Southstreet workflow at Filament Group.

### Shoestring is in early development and may not be ready for production use. 

Shoestring is still in its experimental, alpha development days, and is sure to have plenty of quirks we've yet to uncover. We're excited about its philosophy, but are well-aware that its implementation needs improvements. If you're able, we'd love your help!

# Philosophy

Shoestring is designed with a minimalist, mobile-first philosophy.

One unique aspect of Shoestring is that its source code tends to favor terseness over completeness, allowing it to be very lightweight, but not as fault-tolerant or broadly compatible as many common DOM toolkits. For example, a given method might support one or two argument types, and not provide logic to support others that are deemed less common. These decisions are made based on the opinion of the developers and what they found most necessary, but all methods are easily overrideable if you'd like to do so. 

Shoestring also favors terseness in its string-based selector engine, which it merely offloads to modern browsers' native `document.querySelectorAll` (though you can easly plug-in an engine like Sizzle if you'd like) function. In this way, DOM selections will sometimes be a little slower than they would be in other libraries, but conversely, Shoestring's simpler logic makes it lighter in overall weight, and faster in initial load time. 

We're still assessing the benefits of these ideas and are generally looking for a good balance of code weight, runtime speed, browser support, and developer convenience.

# Feature Set

Shoestring's API is inspired by jQuery, because we absolutely love working with jQuery, but there are times when we only need a subset of its features and browser support. 

Technically, shoestring.js is a very small, extendable core function. That core function doesn't come with much more than a means of finding and/or generating HTML elements, a DOM-ready handler, and a few essential element-traversal methods like `each`, `find`, `children`. Using its `shoestring.fn` API, its core is easy to extend further, and several extensions are available in the Shoestring codebase for you to include in your build.

# Examples

At it's core, Shoestring is a function and a few utilities. to start, you can find some elements via CSS selectors, like so:

    shoestring( "#foo, .bar" )

this will return a `shoestring` array of DOM nodes, which allows you to chain `shoestring` methods one after another, affecting all elements in the selection. after you've found some elements, you might care to find more of them within your result. the `find` method does just that.

    shoestring( "#foo, .bar" ).find( "#baz" );

some sugary syntax for the same result as above:

    shoestring( "#baz",  "#foo, .bar" );

perhaps you'd like to iterate through each item that was found, applying scripting to them all. the `each` method has you covered.

    shoestring( "#foo, .bar" ).each(function(){
		console.log( this );
		// here, "this" refers to the current element in iteration
	});
	
`each` also supports a passed iteration number, if you please:

    shoestring( "#foo, .bar" ).each(function( i ){
		console.log( i );
		// here, "i" refers to the current iteration number (0 or 1 in this case)
	});

...but wait. you'll probably want to hold off on all that until the dom is ready. Pass a function into Shoestring and it'll queue it up til the coast is clear.

    shoestring( function(){
		// execute code here
	} );

Internally, this dom-ready shortcut also provides the benefit of doing nothing at all in browsers that don't mass the `Shoestring.qualified` boolean (which, by default, checks for `document.querySelectorAll` support).

That same test is exposed in a handy api method as well: `qualify`. The `qualify` method serves two purposes: first, you can run it with no arguments to find out if a browser is qualified to run `shoestring`, receiving a boolean answer: 

    var qualifiedBrowser = shoestring.qualify();

More useful, you can pass a function to `qualify` and that function will only execute in qualified browsers. If all of your code executes via DOM ready, you won't need this, but if it executes earlier, just Shoestring your code in a `qualify` callback to safeproof its execution. Basically, you might use `qualify` in place of your typical `IIFE` Shoestringper:

    shoestring.qualify(
		// It's safer in here.
	    shoestring( "#foo, .bar" ).each(function(){
			console.log( this );
			// here, "this" refers to the current element in iteration
		});
	);

By default, `qualify` uses the boolean stored in `Shoestring.qualified` internally, to determine browser qualification. You can override `Shoestring.qualified` with any combination of features you want. By default, it just needs `document.querySelectorAll` support.

OK, that's all `shoestring` has in the way of dom helpers... from there, we can add extensions.

For extensions, `shoestring` comes with a utility function or three. First, the `extend` method, which is just a simple object extender:

    shoestring.extend( { foo: "bar" }, { baz: "bam!" } );
	// --> { foo: "bar", baz: "bam!" }

`extend` doesn't do deep object extensions, but it covers the usual hash mixin use case pretty well. You can use it to extend any object with another, but you might choose use it to add more utility functions to `shoestring` itself, like so:

    shoestring.extend( Shoestring, { alertfoo: function(){ alert( "foo" ); } });
	
	shoestring.foo();
	
	// --> throws an alert of "foo"

the second utility, `inArray`, will let you know if an item is in an array or not, returning the position of the item in the array (or `-1` if it's not present). This is helpful when returning arrays that should only contain unique entries, like a bunch of dom node references, for instance.

    shoestring.inArray( "b", ["a","b","c"] );
	// --> true, "b" is in that array

The third utility function, `fn`, is a bit more interesting, as it is where you add chainable methods to the `shoestring` api. Here's a simple little `addClass` method, added to `shoestring` via the `fn` api:

    shoestring.fn.addClass = function( cname ){
      return this.each(function(){
        this.className += " " + cname;
      });
    };

A quick explanation: we've defined a function with a single argument `cname`, representing the class to be added. Inside the function, `this` refers to the `shoestring`'d set of dom nodes. In order to maintain `shoestring`'s chainability, an `fn` function should always return either `this` or a call to `Shoestring()` or one of its api methods. In this case, we're returning `this`, but we're also chaining on an `each` method to iterate through each item in the selection and add `cname` to its class attribute.

Now we can use it.

    shoestring( "body" ).addClass( "foo" );
	
	// --> [<body class="foo"></body>]

...and since we returned `this`, we can keep chaining.

    shoestring( "body, #foo" ).addClass( "foo" ).each(function(){
      // do something else here
    });

That's pretty much it. Of course, you're probably going to need a few more methods to make Shoestring useful...

## Shoestring extensions

The `src/extensions` folder includes a few prebuilt methods you can grab and chuck into your project. 

## Custom Builds

Each extension is defined an AMD module and the dependencies are sort out during the build by requirejs. The all inclusive build is `build/main.js` and can act as a reference for a custom build. To creat a custom build:

1. Copy `build/main.js` to `build/custom/my-build.js`
2. Edit `build/custom/my-build.js` and remove any extensions you're not using
3. Run `grunt build`
4. View `dist/my-build.js`


## Want a dollar?

here you go:

    window.$ = shoestring;

    $( "foo, bar, .baz" ).each(...)
	
	
