/*! wrap - a simple framework for DOM utilities, targeting modern browsers without failing the rest. Copyright 2012 @scottjehl, Filament Group, Inc. Licensed MIT/GPLv2 */
(function( w, undefined ){
	
	"use strict";
	
	var doc = w.document,
		wrap = function( prim, sec ){
		
			var pType = typeof( prim ),
				ret = [];

			if( prim ){
				// if string starting with <, make html
				if( pType === "string" && prim.indexOf( "<" ) === 0 ){
					var dfrag = document.createElement( "div" );
					dfrag.innerHTML = prim;
					// TODO - remove dependency on children()
					ret = wrap(dfrag).children();
				}
				// if string, it's a selector, use qsa
				else if( pType === "string" ){
					if( sec ){
						return wrap( sec ).find( prim );
					}
					ret = doc.querySelectorAll( prim );
				}
				else if( pType === "function" ){
					ret = wrap.ready( prim );
				}
				// object? passthrough
				else{
					ret = ret.concat( prim );
				}
			}
			// if no prim, return a wrapped doc
			else{
				ret = [doc];
			}
		
			ret = wrap.extend( ret, wrap.fn );
		
			return ret;
		};
	
	// For adding element set methods
	wrap.fn = {};
	
	// Public each method
	// For iteration on sets
	wrap.fn.each = function( fn ){
		for( var i = 0, il = this.length; i < il; i++ ){
			fn.call( this[ i ], i );
		}
		return this;
	};
	
	// For contextual lookups
	wrap.fn.find = function( sel ){
		var ret = [],
			finds;
		this.each(function(){
			finds = this.querySelectorAll( sel );
			for( var i = 0, il = finds.length; i < il; i++ ){
				ret = ret.concat( finds[i] );
			}
		});
		return wrap( ret );
	};
	
	// Public non-dom utilities
	
	// browser support qualifier - wrap any usage of wrap in a qualify callback
	wrap.qualified = "querySelectorAll" in doc;
	
	wrap.qualify = function( callback ){
		if( callback && wrap.qualified ){
			return callback();
		}
		// return support bool if there's no callback
		else if( !callback ){
			return wrap.qualified;
		}
	};
	
	// For extending objects
	wrap.extend = function( first, second ){
		for( var i in second ){
			if( second.hasOwnProperty( i ) ){
				first[ i ] = second[ i ];
			}
		}
		return first;
	};
	
	// check if an item exists in an array
	wrap.inArray = function( haystack, needle ){
		var isin = false;
		for( var i in haystack ){
			if( haystack.hasOwnProperty( i ) && haystack[ i ] === needle ){
				isin = true;
			}
		}
		return isin;
	};
	
	// For DOM ready execution
	wrap.ready = function( fn ){
		if( ready ){
			return fn();
		}
		else{
			readyQueue.push( fn );
		}
		return this;
	};
	
	// Empty and exec the ready queue
	var ready = false,
		readyQueue = [],
		runReady = function(){
		if( !ready ){
			while( readyQueue.length ){
				readyQueue.shift()();
			}
			ready = true;
		}
	};
	
	// Quick IE8 shiv
	if( !w.addEventListener ){
		w.addEventListener = function( evt, cb ){
			return w.attachEvent( "on" + evt, cb );
		};
	}
	
	// DOM ready
	w.addEventListener( "DOMContentLoaded", runReady, false );
	w.addEventListener( "load", runReady, false );
	
	// expose
	w.wrap = wrap;

})( this );