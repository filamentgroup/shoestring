/*
shoestring unit tests - using qUnit
*/
(function(undefined){

module( 'Core' );
test( 'API Properties: shoestring is defined', function() {
	ok( shoestring !== undefined );
});

test( 'API Properties: shoestring.fn is defined', function() {
	ok( shoestring.fn !== undefined );
});

test( 'API Properties: shoestring.qualified is defined', function() {
	ok( shoestring.qualified !== undefined );
});

test( 'API Properties: shoestring.qualify is defined', function() {
	ok( shoestring.qualify !== undefined );
});

test( 'API Properties: shoestring.extend is defined', function() {
	ok( shoestring.extend !== undefined );
});

test( 'API Properties: shoestring.inArray is defined', function() {
	ok( shoestring.inArray !== undefined );
});

test( 'API Properties: shoestring.ready is defined', function() {
	ok( shoestring.ready !== undefined );
});

module( 'Types' );
test( 'API Properties: shoestring is a function', function() {
	ok( typeof(shoestring) === "function" );
});

test( 'API Properties: shoestring.fn is an object', function() {
	ok( shoestring.fn.constructor === Object );
});

test( 'API Properties: shoestring.qualified is a boolean', function() {
	ok( typeof(shoestring.qualified) === "boolean" );
});

test( 'API Properties: shoestring.qualify is a function', function() {
	ok( typeof(shoestring.qualify) === "function" );
});

test( 'API Properties: shoestring.extend is a function', function() {
	ok( typeof(shoestring.extend) === "function" );
});

test( 'API Properties: shoestring.inArray is a function', function() {
	ok( typeof(shoestring.inArray) === "function" );
});

test( 'API Properties: shoestring.ready is a function', function() {
	ok( typeof(shoestring.ready) === "function" );
});

module( 'Core fn Methods' );
test( 'API Properties: shoestring.fn.each, is defined', function() {
	ok( shoestring.fn.each !== undefined );
});

test( 'API Properties: shoestring.fn.children, is defined', function() {
	ok( shoestring.fn.children !== undefined );
});

test( 'API Properties: shoestring.fn.find, is defined', function() {
	ok( shoestring.fn.find !== undefined );
});

module( 'fn Types' );

test( 'API Properties: shoestring.fn.each, is a function', function() {
	ok( typeof(shoestring.fn.each) === "function" );
});

test( 'API Properties: shoestring.fn.children, is a function', function() {
	ok( typeof(shoestring.fn.children) === "function" );
});

test( 'API Properties: shoestring.fn.find, is a function', function() {
	ok( typeof(shoestring.fn.find) === "function" );
});



module( 'Functionality' );
test( 'shoestring with no arguments returns an array', function() {
	ok( shoestring().constructor === Array );
});

test( 'shoestring with no arguments returns an array with core methods', function() {
	ok( shoestring().constructor === Array );
});

test( 'shoestring with no arguments returns an array with one child', function() {
	ok( shoestring().length === 1 );
});

test( 'shoestring with no arguments returns an array with first child of document', function() {
	ok( shoestring()[0] === document );
});

test( 'shoestring with a string argument returns an array', function() {
	ok( shoestring( "body" ).constructor === Array );
});

test( 'shoestring with a string argument returns an array of dom nodes from qsa', function() {
	ok( shoestring( "body" )[ 0 ] === document.querySelectorAll( "body" )[ 0 ] );
});

test( 'shoestring with a string argument starting with "<" returns a generated array', function() {
	ok( shoestring( "<div></div>" ).constructor === Array );
});

test( 'shoestring with a string argument starting with "<" returns a generated array of dom nodes', function() {
	ok( shoestring( "<div></div>" )[0].constructor === HTMLDivElement );
});

test( 'shoestring with a string argument starting with "<" returns a generated array of dom nodes', function() {
	ok( shoestring( "<div></div><h2></h2>" )[1].constructor === HTMLHeadingElement );
});

test( 'shoestring with a function argument returns array', function() {
	ok( shoestring( function(){} ).constructor === Array );
});

test( 'shoestring with a function argument returns array with document child', function() {
	ok( shoestring( function(){} )[ 0 ] === document );
});

test( 'shoestring with a Node passed in returns an array of that node', function(){
	var el = document.querySelectorAll( ".constructor-selector" )[0];
	ok( shoestring( el ).constructor === Array );
});

test( 'shoestring with a Node passed in returns an array returns an array of that node', function(){
	var el = document.querySelectorAll( ".constructor-selector" )[0];
	ok( shoestring( el )[0].constructor === HTMLDivElement );
});

test( 'passing a string argument to shoestring with a second argument returns result scoped to second arg', function() {
	ok( shoestring( "body" )[ 0 ] === shoestring( "body", "html" )[ 0 ] );
	ok( shoestring( "body" )[ 0 ] !== shoestring( "body", "body" )[ 0 ] );
	ok( shoestring( ".testel-2" ).length === 2 );
	ok( shoestring( ".testel-2", ".testel" ).length === 1 );
});

test ('shoestring.each value matches array at index', function(){
	expect( 5 );
	var arr = [1,2,3,4,5];
	$.each( arr, function( i, v ){
		equal( v, arr[i], "Array at specified index " + i + " should have value of " + arr[i] + " but has " + v );
	});
});

test ('shoestring.each value matches array at index for selected items', function(){
	expect( 2 );
	var div1 = $( "<div id='div1'></div>" );
	var div2 = $( "<div id='div2'></div>" );
	var divs = [ div1, div2 ];
	$.each( divs, function( i, v ){
		equal( v.id, divs[i].id, "Item at specified index " + i + " should have id of " + divs[i] + " but has " + v );
	});
});

test ('shoestring.each only runs as many times as are items in array', function(){
	var testels = $( ".testel-2" );
	var divout = [];
	$.each( testels, function( i, v ){
		divout.push(v);
	});

	equal( divout.length, testels.length, "Both arrays should have equal length" );
});

})();
