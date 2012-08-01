// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.offset = function(){
		return {
			top: this[ 0 ].offsetTop,
			left: this[ 0 ].offsetLeft
		};
	};
}());