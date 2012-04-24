/*
	builder logic
*/
(function( win ){

	//re-reference app var locally
	var app = win.app;
	
	wrap(function(){
		
		var tarea = wrap( "textarea" )[ 0 ],
			submit = wrap( "input[type=submit]" )[ 0 ],
			all = wrap( "#all" )[ 0 ],
			some = wrap( "#some" )[ 0 ];
		
			function removeElem( el ){
				if( el.parentNode ){
					el.parentNode.removeChild( el );
				}
			}
		
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
						removeElem( submit );
						tarea.previousElementSibling.innerHTML = "Success! Here's your custom Wrap build!";
					}
				});
			};
			
			wrap( "head" )[0].appendChild( aj );
		}
		
		all.addEventListener( "click", function( e ){
			e.preventDefault();
			for( var i in app.files.js ){
				app.addFile( "../extensions/" + app.files.js[i] );
			}
			success();
			removeElem( this );
		});
		
		some.addEventListener( "click", function( e ){
			e.preventDefault();
			tarea.value = "";
			
			// remove the links and button
			removeElem( this );
			removeElem( submit );
			removeElem( all );
			
			function addCB( extname ){
				var li = wrap( "<div><input type='checkbox' name='" + extname + "' id='" + extname + "'><label for='" + extname + "'>"+extname+"</label></div>" );
					
				tarea.parentNode.insertBefore( li[0], tarea )
					
				li[ 0 ].addEventListener( "click", function(){
					
					if( this.childNodes[0].checked ){
						app.addFile( "../extensions/" + app.files.js[extname] );
						success();
					}
					else{
						for( var i = 0, il = app.jsToLoad.length; i < il; i++ ){
							if( app.jsToLoad[ i ] === "../../extensions/" + app.files.js[extname] ){
								app.jsToLoad.splice( i, 1);
								success();
							}
						}
					}
						
				});
			}
			for( var i in app.files.js ){
				
				addCB( i );
			}
			
			
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