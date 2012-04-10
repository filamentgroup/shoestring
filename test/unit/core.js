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









})();