// Extensions.
(function( undefined ){
	shoestring.fn.siblings = function(){
		var sibs = [],
			el = this[ 0 ].parentNode.firstChild;

		while( el = el.nextSibling ) {
			if( el.nodeType === 1 && el !== this[ 0 ] ) {
				sibs.push( el );
			}
		}
		return shoestring( sibs );
	};
}());