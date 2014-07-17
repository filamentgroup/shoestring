//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	function _getIndex( set, test ) {
		var i, result, element;

		for( i = result = 0; i < set.length; i++ ) {
			element = set.item ? set.item(i) : set[i];

			if( test(element) ){
				return result;
			}

			// ignore text nodes, etc
			if( element.nodeType === 1 ){
				result++;
			}
		}

		return -1;
	}

	shoestring.fn.index = function( selector ){
		var self, children;

		self = this;

		// no arg? check the children, otherwise check each element that matches
		if( selector === undefined ){
			children = (this[0].parentNode || document.documentElement).childNodes;

			// check if the element matches the first of the set
			return _getIndex(children, function( element ) {
				return self[0] === element;
			});
		} else {

			// check if the element matches the first selected node from the parent
			return _getIndex( self, function( element ) {
				return element === (shoestring( selector, element.parentNode )[ 0 ]);
			});
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
