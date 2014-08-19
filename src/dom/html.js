//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	/**
	 * Gets or sets the `innerHTML` from all the elements in the set.
	 *
	 * @param {string|undefined} html The html to assign
	 * @return {string|shoestring}
	 * @this shoestring
	 */
	shoestring.fn.html = function( html ){
		if( html ){
			return this.each(function(){
				this.innerHTML = html;
			});
		} else {
			var pile = "";

			this.each(function(){
				pile += this.innerHTML;
			});

			return pile;
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
