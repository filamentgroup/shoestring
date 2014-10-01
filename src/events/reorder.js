//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "dom/parents" ], function(){
//>>excludeEnd("exclude");

	// In IE8 the events trigger in a reverse order (LIFO). This code
	// unbinds and rebinds all callbacks on an element in the a FIFO order.

	// This is not optimized and probably has a lot of improvement opportunity
	function reorderEvents( node, eventName ) {
		if( node.addEventListener ) {
			// add event listner obviates the need for all the callback order juggling
			return;
		} else {
			var parents = shoestring( node ).parents();
			for( var j = parents.length - 1; j >= 0; j-- ) {
				reorderEventsForElement( parents[ j ], eventName, true );
			}
			reorderEventsForElement( node, eventName );
		}
	}

	function reorderEventsForElement( node, eventName, isParentNode ) {
		if( !node.shoestringData || !node.shoestringData.events ) {
			return;
		}

		var docEl = document.documentElement,
			otherEvents = node.shoestringData.events[ eventName ] || [];

		for( var j = otherEvents.length - 1; j >= 0; j-- ) {
			if( otherEvents[ j ].isCustomEvent ) {
				docEl.detachEvent( "onpropertychange", otherEvents[ j ].callback );
				docEl.attachEvent( "onpropertychange", otherEvents[ j ].callback );

			// don’t need to reorder parents for DOM events
			} else if( !isParentNode ) {
				node.detachEvent( "on" + eventName, otherEvents[ j ].callback );
				node.attachEvent( "on" + eventName, otherEvents[ j ].callback );
			}
		}
	}

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
