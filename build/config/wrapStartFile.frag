(function( global, factory ) {
	if( typeof define === 'function' && define.amd ) {
			// AMD. Register as an anonymous module.
			define( [ 'shoestring' ], factory );
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = factory();
	} else {
		// Browser globals
		global.shoestring = global.$ = factory();
	}
}(this, function () {
	var win = typeof window !== "undefined" ? window : this;
	var doc = win.document;

