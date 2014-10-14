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

A lightweight, simple DOM utility made to run on a tight budget. You can find the API documentaiton [here](http://filamentgroup.github.io/shoestring/dist/docs/)

Shoestring is part of the [Southstreet workflow](https://github.com/filamentgroup/southstreet) at Filament Group.

## Philosophy

Shoestring is built to be lightweight, but not as broadly compatible as many common DOM toolkits. For example, many invocation patterns for common methods are ignored in favor of the most ubiquitous use. Similarly the selector engine delegates to modern browsers' native `document.querySelectorAll`, though you can plug-in an engine like Sizzle.

We're still considering the benefits of this approach and looking for a good balance of code weight, runtime speed, browser support, and developer convenience.

## Feature Set

Shoestring's API is inspired by jQuery.

Technically, shoestring.js is a very small, extendable core function. That core function doesn't come with much more than a means of finding and/or generating HTML elements, a DOM-ready handler, and a few essential element-traversal methods like `each`, `find`, `children`. Using its `shoestring.fn` API, its core is easy to extend further, and many extensions are available for you to include in your build.

If you are concerned about compatibility issues/pitfalls consider using the development build releases (`-dev` in the [releases](https://github.com/filamentgroup/shoestring/releases)). We've endeavored to throw exceptions where a particular invocation pattern or feature isn't supported as a means to document the disparity. We recommend that you use the development version in development and the regular non-`-dev` version in production.

## Features

There are three sets of extensions to the Shoestring core: DOM manipulation, events, and ajax. 

### DOM

If you've used jQuery, the structure and behavior of the DOM manipulation methods will be immediately familiar:

```javascript
shoestring( ".foo" ).addClass( "bar" ).attr( "data-baz", "bak" );
```

Construct a sequence of elements from the DOM and invoke each method on all the elements of sequence in turn. You can find a full list of the supported DOM methods in the [API docs](http://filamentgroup.github.io/shoestring/dist/docs/) under the `dom/*` subdirectory.

### 


## Shoestring extensions

```javascript
/**                                                                           
 * Remove the current set of elements from the DOM.                                                                           
 *                                                                           
 * @return shoestring                                                                           
 * @this shoestring                                                                         
 */                                                                           
shoestring.fn.remove = function(){                                                                           
  return this.each(function(){                                                                           
    if( this.parentNode ) {                                                                         
      this.parentNode.removeChild( this );                                                                          
    }                                                                           
  });                                                                           
}; 
```

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
