/*
	app.enhance: this example file uses the app.js api to:
		 * determine whether a browser is qualified for enhancements
		 * define available CSS and JS assets
		 * test features and device conditions and environment to determine which files to load
		 * load those files via a single concatenated call
*/
(function( win ){

	//re-reference app var locally
	var app = win.app;
	
	// Add your qualifications for major browser experience divisions here.
	// For example, you might choose to only enhance browsers that support document.querySelectorAll (IE8+, etc).
	// Use case will vary, but basic browsers: last stop here!
	if( !"querySelectorAll" in win.document ){
		return;
	}
	
	// Configure css and js paths, if desirable.
	app.basepath.js = "../extensions/";
	
	app.addFile( "../wrap.js" );
	
	// Start queueing files for load. 
	// Pass js or css paths one at a time to app.addFile 
	
	
	
	
	

}( window ));