/*
wrap unit tests - using qUnit
*/
(function(undefined){
	
test( 'API Properties: wrap is defined', function() { 
	ok( wrap !== undefined );
});

test( 'API Properties: wrap.fn is defined', function() { 
	ok( wrap.fn !== undefined );
});

test( 'API Properties: wrap.qualified is defined', function() { 
	ok( wrap.qualified !== undefined );
});

test( 'API Properties: wrap.qualify is defined', function() { 
	ok( wrap.qualify !== undefined );
});

test( 'API Properties: wrap.extend is defined', function() { 
	ok( wrap.extend !== undefined );
});

test( 'API Properties: wrap.inArray is defined', function() { 
	ok( wrap.inArray !== undefined );
});

test( 'API Properties: wrap.ready is defined', function() { 
	ok( wrap.ready !== undefined );
});

// Types
test( 'API Properties: wrap is a function', function() { 
	ok( typeof(wrap) === "function" );
});

test( 'API Properties: wrap.fn is an object', function() { 
	ok( wrap.fn.constructor === Object );
});

test( 'API Properties: wrap.qualified is a boolean', function() { 
	ok( typeof(wrap.qualified) === "boolean" );
});

test( 'API Properties: wrap.qualify is a function', function() { 
	ok( typeof(wrap.qualify) === "function" );
});

test( 'API Properties: wrap.extend is a function', function() { 
	ok( typeof(wrap.extend) === "function" );
});

test( 'API Properties: wrap.inArray is a function', function() { 
	ok( typeof(wrap.inArray) === "function" );
});

test( 'API Properties: wrap.ready is a function', function() { 
	ok( typeof(wrap.ready) === "function" );
});

// core fn methods
test( 'API Properties: wrap.fn.each, is defined', function() { 
	ok( wrap.fn.each !== undefined );
});

test( 'API Properties: wrap.fn.children, is defined', function() { 
	ok( wrap.fn.children !== undefined );
});

test( 'API Properties: wrap.fn.find, is defined', function() { 
	ok( wrap.fn.find !== undefined );
});

// fn types
test( 'API Properties: wrap.fn.each, is a function', function() { 
	ok( typeof(wrap.fn.each) === "function" );
});

test( 'API Properties: wrap.fn.children, is a function', function() { 
	ok( typeof(wrap.fn.children) === "function" );
});

test( 'API Properties: wrap.fn.find, is a function', function() { 
	ok( typeof(wrap.fn.find) === "function" );
});



// functionality
test( 'wrap with no arguments returns an array', function() { 
	ok( wrap().constructor === Array );
});

test( 'wrap with no arguments returns an array with core methods', function() { 
	ok( wrap().constructor === Array );
});

test( 'wrap with no arguments returns an array with one child', function() { 
	ok( wrap().length === 1 );
});

test( 'wrap with no arguments returns an array with first child of document', function() { 
	ok( wrap()[0] === document );
});

test( 'wrap with a string argument returns a nodelist', function() { 
	ok( wrap( "body" ).constructor === NodeList );
});

test( 'wrap with a string argument returns an array of dom nodes from qsa', function() { 
	ok( wrap( "body" )[ 0 ] === document.querySelectorAll( "body" )[ 0 ] );
});

test( 'wrap with a string argument starting with "<" returns a generated array', function() { 
	ok( wrap( "<div></div>" ).constructor === Array );
});

test( 'wrap with a string argument starting with "<" returns a generated array of dom nodes', function() { 
	ok( wrap( "<div></div>" )[0].constructor === HTMLDivElement );
});

test( 'wrap with a string argument starting with "<" returns a generated array of dom nodes', function() { 
	ok( wrap( "<div></div><h2></h2>" )[1].constructor === HTMLHeadingElement );
});

test( 'wrap with a function argument returns array', function() { 
	ok( wrap( function(){} ).constructor === Array );
});

test( 'wrap with a function argument returns array with document child', function() { 
	ok( wrap( function(){} )[ 0 ] === document );
});

test( 'passing a string argument to wrap with a second argument returns result scoped to second arg', function() { 
	ok( wrap( "body" )[ 0 ] === wrap( "body", "html" )[ 0 ] );
	ok( wrap( "body" )[ 0 ] !== wrap( "body", "body" )[ 0 ] );
	ok( wrap( ".testel-2" ).length === 2 );
	ok( wrap( ".testel-2", ".testel" ).length === 1 );
});











})();