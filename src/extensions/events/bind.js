//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.bind = function( evt, callback ){
		var evts = evt.split( " " ),
			bindingname = callback.toString(),
			boundEvents = function( el, evt, callback ) {
				if ( !el.shoestringData ) {
					el.shoestringData = {};
				}
				if ( !el.shoestringData.events ) {
					el.shoestringData.events = {};
				}
				if ( !el.shoestringData.events[ evt ] ) {
					el.shoestringData.events[ evt ] = [];
				}
				el.shoestringData.events[ evt ][ bindingname ] = callback.callfunc;
			};

		function newCB( e ){
			return callback.apply( this, [ e ].concat( e._args ) );
		}
		function propChange( e, oEl ) {
			var el = document.documentElement[ e.propertyName ].el;

			if( el !== undefined && oEl === el ) {
				newCB.call( el, e );
			}
		}
		return this.each(function(){
			var callback, oEl = this;

			callback = function( e ) {
				propChange.call( this, e, oEl );
			};

			for( var i = 0, il = evts.length; i < il; i++ ){
				var evt = evts[ i ];

				if( "addEventListener" in this ){
					this.addEventListener( evt, newCB, false );
				} else if( this.attachEvent ){
					if( this[ "on" + evt ] !== undefined ) {
						this.attachEvent( "on" + evt, newCB );
					} else {
						// Custom event
						document.documentElement.attachEvent( "onpropertychange", callback );
					}
				}
				boundEvents( this, evts[ i ], { "callfunc" : newCB, "name" : bindingname });
			}
		});
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
