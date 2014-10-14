# outline

- intro
  - motto
  - demo link
- philosophy
  - why shoestring
  - modularity
  - wire weight
- features
  - dom
    - example
  - events
    - example
  - ajax
    - example
- extensions
  - extension
    - example
  - module definition
    - example
  - dependencies (minimize)
    - example
- builds
  - production
  - development
  - custom
  - tracker
- contributing
  - link to guidelines

# Shoestring

[![Filament Group](http://filamentgroup.com/images/fg-logo-positive-sm-crop.png) ](http://www.filamentgroup.com/)

A lightweight, simple DOM utility made to run on a tight budget.

Shoestring is part of the [Southstreet workflow](https://github.com/filamentgroup/southstreet) at Filament Group.

# Philosophy

Shoestring is built to be lightweight, but not as broadly compatible as many common DOM toolkits. For example, many invocation patterns for common methods are ignored in favor of the most ubiquitous use. Similarly the selector engine delegates to modern browsers' native `document.querySelectorAll`, though you can plug-in an engine like Sizzle.

We're still considering the benefits of this approach and looking for a good balance of code weight, runtime speed, browser support, and developer convenience.

# Feature Set

Shoestring's API is inspired by jQuery.

Technically, shoestring.js is a very small, extendable core function. That core function doesn't come with much more than a means of finding and/or generating HTML elements, a DOM-ready handler, and a few essential element-traversal methods like `each`, `find`, `children`. Using its `shoestring.fn` API, its core is easy to extend further, and several extensions are available in the Shoestring codebase for you to include in your build.

If you are concerned about compatibility issues/pitfalls consider using the development build releases (`-dev` in the [releases](https://github.com/filamentgroup/shoestring/releases)). We've endeavored to throw exceptions where a particular invocation pattern or feature isn't supported as a means to document the disparity. We recommend that you use the development version in development and the regular non-`-dev` version in production.

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
