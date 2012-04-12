/*
	builder logic
*/
(function( win ){

	//re-reference app var locally
	var app = win.app;
	
	wrap(function(){
		
		var tarea = wrap( "textarea" )[ 0 ];
		
		function success(){
			var aj = document.createElement( "script" );
			
			aj.src = '../wrap.ajax.ajax.js';
			
			aj.onload = function(){
				wrap.ajax( "quickconcat.php?files=" + app.jsToLoad.join(",") , 
				{
					success: function( txt ){
						tarea.value = txt;
						tarea.className = "done";
						tarea.setAttribute("readonly", true);
						tarea.parentNode.removeChild( tarea.nextElementSibling );
						tarea.previousElementSibling.innerHTML = "Success! Here's your custom Wrap build!";
					}
				});
			};
			
			wrap( "head" )[0].appendChild( aj );
		}
		
		wrap( "#all" )[ 0 ].addEventListener( "click", function( e ){
			e.preventDefault();
			for( var i in app.files.js ){
				app.addFile( "../extensions/" + app.files.js[i] );
			}
			success();
			this.parentNode.removeChild( this )
		});
		
		// on form submit
		wrap( "form" )[ 0 ].addEventListener( "submit", function( e ){
			e.preventDefault();
			var self= this,
				text = tarea.value;
		
			
		
			function attempt(){
				try {
					eval( text );
				}
				catch( e){
					var etype = e.type,
						emethod = e.arguments[0],
						isfn = !!e.arguments[1].each;
				
					app.addFile( "../extensions/" + app.files.js[ ( isfn ? "fn_" : "" ) + emethod ] )
					app.enhance();
				
					wrap( "head script:first-child" )[0].onload = attempt;
					return;
				}
				success();
			}
		
			attempt();
		});
	
	});

}( this ));