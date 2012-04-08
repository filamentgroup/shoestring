// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){

	wrap.fn.bind = function( evt, callback ){
		return this.each(function(){
			if( "addEventListener" in this ){
				this.addEventListener( evt, callback, false );
			}
			else if( this.attachEvent ){
				this.attachEvent( "on" + evt, callback );
			}
		});
	};

})();