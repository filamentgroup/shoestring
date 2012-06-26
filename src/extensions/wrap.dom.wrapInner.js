// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	wrap.fn.wrapInner = function( html ){
		return this.each(function(){
			var inH = this.innerHTML;
			this.innerHTML = "";
			wrap( this ).append( wrap( html ).html( inH ) );
		});
	};
}());
