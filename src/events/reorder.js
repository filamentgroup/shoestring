//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "dom/parents" ], function(){
//>>excludeEnd("exclude");

	// In IE8 the events trigger in a reverse order (LIFO). This code
	// unbinds and rebinds all callbacks on an element in the a FIFO order.

	function reorderEvents( node, eventName ) {
		if( node.addEventListener || !node.shoestringData || !node.shoestringData.events ) {
			// add event listner obviates the need for all the callback order juggling
			return;
		}

		var otherEvents = node.shoestringData.events[ eventName ] || [];
		for( var j = otherEvents.length - 1; j >= 0; j-- ) {
			// DOM Events only, Custom events maintain their own order internally.
			if( !otherEvents[ j ].isCustomEvent ) {
				node.detachEvent( "on" + eventName, otherEvents[ j ].callback );
				node.attachEvent( "on" + eventName, otherEvents[ j ].callback );
			}
		}
	}
//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
