// Extensions
(function( undefined ){
	shoestring.fn.html = function( html ){
		if( html ){
			return this.each(function(){
				this.innerHTML = html;
			});
		}
		else{
			var pile = "";
			this.each(function(){
				pile += this.innerHTML;
			});
			return pile;
		}
	};
}());