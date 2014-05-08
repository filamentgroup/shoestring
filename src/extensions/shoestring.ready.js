// Extensions
(function( w, undefined ){

	// Empty and exec the ready queue
	var doc = w.document,
		ready = false,
		readyQueue = [],
		runReady = function(){
			if( !ready ){
				while( readyQueue.length ){
					readyQueue.shift().call( doc );
				}
				ready = true;
			}
		};

	// For DOM ready execution
	shoestring.ready = function( fn ){
		if( ready && fn && shoestring.qualified ){
			fn.call( doc );
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

}( this ));