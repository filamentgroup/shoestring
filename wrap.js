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
					return wrap( dfrag ).children();
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
				ret.push( doc );
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
	
	// Children - get element child nodes.
	// This is needed for HTML string creation
	wrap.fn.children = function(){
		var ret = [],
			childs,
			j;
		this.each(function(){
			childs = this.children,
			j = -1;
		
			while( j++ < childs.length-1 ){
				if( !wrap.inArray( ret, childs[ j ] ) ){
					ret.push( childs[ j ] );
				}
			}
		});
		return wrap(ret);
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
		if( ready && fn && wrap.qualified ){
			fn.call( document );
		}
		else if( fn && wrap.qualified ){
			readyQueue.push( fn );
		}
		else {
			runReady();
		}
		
		return [doc];
	};
	
	// non-shortcut ready
	wrap.fn.ready = function( fn ){
		wrap.ready( fn );
		return this;
	};
	
	// Empty and exec the ready queue
	var ready = false,
		readyQueue = [],
		runReady = function(){
			if( !ready ){
				while( readyQueue.length ){
					readyQueue.shift().call( document );
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
	w.addEventListener( "readystatechange", runReady, false );
	w.addEventListener( "load", runReady, false );
	// If DOM is already ready at exec time
	if( doc.readyState === "complete" ){
		runReady();
	}
	
	// expose
	w.wrap = wrap;

})( this );