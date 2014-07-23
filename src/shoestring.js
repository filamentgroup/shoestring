//>>excludeStart("exclude", pragmas.exclude);
(function( w, undefined ){
//>>excludeEnd("exclude");
	"use strict";
	var doc = w.document,
		shoestring = function( prim, sec ){

			var pType = typeof( prim ),
				ret = [],
				sel;

			if( prim ){
				// if string starting with <, make html
				if( pType === "string" && prim.indexOf( "<" ) === 0 ){
					var dfrag = document.createElement( "div" );
					dfrag.innerHTML = prim;
					return shoestring( dfrag ).children().each(function(){
						dfrag.removeChild( this );
					});
				}
				else if( pType === "function" ){
					return shoestring.ready( prim );
				}
				// if string, it's a selector, use qsa
				else if( pType === "string" ){
					if( sec ){
						return shoestring( sec ).find( prim );
					}
//>>includeStart("development", pragmas.development);
					try {
//>>includeEnd("development");
						sel = doc.querySelectorAll( prim );
//>>includeStart("development", pragmas.development);
					} catch( e ) {
						shoestring.error( 'queryselector', prim );
					}
//>>includeEnd("development");
					for( var i = 0, il = sel.length; i < il; i++ ){
						ret[ i ] = sel[ i ];
					}
				}
				else if( Object.prototype.toString.call( pType ) === '[object Array]' ||
					pType === "object" && prim instanceof w.NodeList ){

					for( var i2 = 0, il2 = prim.length; i2 < il2; i2++ ){
						ret[ i2 ] = prim[ i2 ];
					}
				}
				// object? passthrough
				else {
					ret = ret.concat( prim );
				}
			}
			// if no prim, return a wrapped doc
			else{
				ret.push( doc );
			}

			ret = shoestring.extend( ret, shoestring.fn );

			// add selector prop
			ret.selector = prim;

			return ret;
		};

	// For adding element set methods
	shoestring.fn = {};

	// Public each method
	// For iteration on sets
	shoestring.fn.each = function( fn ){
		for( var i = 0, il = this.length; i < il; i++ ){
			fn.call( this[ i ], i );
		}
		return this;
	};

	// For contextual lookups
	shoestring.fn.find = function( sel ){
		var ret = [],
			finds;
		this.each(function(){
//>>includeStart("development", pragmas.development);
			try {
//>>includeEnd("development");
				finds = this.querySelectorAll( sel );
//>>includeStart("development", pragmas.development);
			} catch( e ) {
				shoestring.error( 'queryselector', sel );
			}
//>>includeEnd("development");

			for( var i = 0, il = finds.length; i < il; i++ ){
				ret = ret.concat( finds[i] );
			}
		});
		return shoestring( ret );
	};

	// Children - get element child nodes.
	// This is needed for HTML string creation
	shoestring.fn.children = function(){
		var ret = [],
			childs,
			j;
		this.each(function(){
			childs = this.children;
			j = -1;

			while( j++ < childs.length-1 ){
				if( shoestring.inArray(  childs[ j ], ret ) === -1 ){
					ret.push( childs[ j ] );
				}
			}
		});
		return shoestring(ret);
	};

	// Public non-dom utilities

	// browser support qualifier - shoestring any usage of shoestring in a qualify callback
	shoestring.qualified = "querySelectorAll" in doc;

	shoestring.qualify = function( callback ){
		if( callback && shoestring.qualified ){
			return callback();
		}
		// return support bool if there's no callback
		else if( !callback ){
			return shoestring.qualified;
		}
	};

	// For extending objects
	shoestring.extend = function( first, second ){
		for( var i in second ){
			if( second.hasOwnProperty( i ) ){
				first[ i ] = second[ i ];
			}
		}
		return first;
	};

	// check if an item exists in an array
	shoestring.inArray = function( needle, haystack ){
		var isin = -1;
		for( var i = 0, il = haystack.length; i < il; i++ ){
			if( haystack.hasOwnProperty( i ) && haystack[ i ] === needle ){
				isin = i;
			}
		}
		return isin;
	};

	// For DOM ready execution
	shoestring.ready = function( fn ){
		if( ready && fn && shoestring.qualified ){
			fn.call( document );
		}
		else if( fn && shoestring.qualified ){
			readyQueue.push( fn );
		}
		else {
			runReady();
		}

		return [doc];
	};

	// non-shortcut ready
	shoestring.fn.ready = function( fn ){
		shoestring.ready( fn );
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
	// If DOM is already ready at exec time
	if( doc.readyState === "complete" || doc.readyState === "interactive" ){
		runReady();
	}
	else {
		if( !w.document.addEventListener ){
			w.document.attachEvent( "DOMContentLoaded", runReady );
			w.document.attachEvent( "onreadystatechange", runReady );
		} else {
			w.document.addEventListener( "DOMContentLoaded", runReady, false );
			w.document.addEventListener( "readystatechange", runReady, false );
		}
		w.addEventListener( "load", runReady, false );
	}

	// expose
	w.shoestring = shoestring;

//>>excludeStart("exclude", pragmas.exclude);
}( this ));
//>>excludeEnd("exclude");
