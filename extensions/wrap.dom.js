// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){

	wrap.fn.parent = function(){
		var ret = [],
			parent;
		this.each(function(){
			parent = this.parentElement;
			if( parent ){
				ret.push( parent );
			}
		});
		return wrap(ret);
	};
	
	wrap.fn.parents = function( sel ){
		var ret = [];
		
		this.each(function(){
			var curr = this,
				match;
			while( curr.parentElement && !match ){
				curr = curr.parentElement;
				if( sel ){
					if( curr === wrap( sel )[0] ){
						match = true;
						if( !wrap.inArray( ret, curr ) ){
							ret.push( curr );
						}
					}
				}
				else {
					if( !wrap.inArray( ret, curr ) ){
						ret.push( curr );
					}
				}				
			}
		});
		return wrap(ret);
	};
	
	wrap.fn.children = function(){
		var ret = [],
			childs;
		this.each(function(){
			childs = this.children,
			j = -1;
		
			while( j++ < childs.length-1 ){
				if( !wrap.inArray( ret, childs[ j ] ) ){
					ret.push( childs[ j ] );
				}
			}
		});
		return wrap(ret);
	};

	wrap.fn.next = function(){
		var ret = [],
			next;
		this.each(function( i ){
			next = this.nextElementSibling;
			if( next ){
				ret = ret.concat( next );
			}
		});
		return wrap(ret);
	};
		
	wrap.fn.prev = function(){
		var ret = [],
			next;
		this.each(function( i ){
			next = this.previousElementSibling;
			if( next ){
				ret = ret.concat( next );
			}
		});
		return wrap(ret);
	};
	
	wrap.fn.addClass = function( cname ){
		return this.each(function(){
			this.className += " " + cname;
		});
	};
	
	wrap.fn.removeClass = function( cname ){
		return this.each(function(){
			this.className = this.className.replace( new RegExp( cname, "gmi" ), "" );
		});
	};
	
	wrap.fn.attr = function( name, val ){
		if( val !== undefined ){
			return this.each(function(){
				this.setAttribute( name, val );
			});
		}
		else {
			return this[ 0 ].getAttribute( name );
		}
	};

	wrap.fn.html = function( html ){
		if( html ){
			return this.each(function(){
				this.innerHTML = html;
			});
		}
		else{
			var pile = "";
			return this.each(function(){
				pile += this.innerHTML;
			});
			return pile;
		}
	};
	
	wrap.fn.append = function( frag ){
		if( typeof( frag ) === "string" ){
			frag = wrap( frag );
		}
		return this.each(function( i ){
			for( var j = 0, jl = frag.length; j < jl; j++ ){
				this.appendChild( i > 0 ? frag[ j ].cloneNode( true ) : frag[ j ] );
			}
		});
	};
	
	wrap.fn.prepend = function( frag ){
		if( typeof( frag ) === "string" ){
			frag = wrap( frag );
		}
		return this.each(function( i ){
			for( var j = 0, jl = frag.length; j < jl; j++ ){
				var insertEl = i > 0 ? frag[ j ].cloneNode( true ) : frag[ j ];
				if ( this.firstChild ){
					this.insertBefore( insertEl, this.firstChild );
				}
				else {
					this.appendChild( insertEl );
				}
			}
		});
	};
	
	wrap.fn.before = function( frag ){
		if( typeof( frag ) === "string" ){
			frag = wrap( frag );
		}
		return this.each(function( i ){
			for( var j = 0, jl = frag.length; j < jl; j++ ){
				this.parentNode.insertBefore( i > 0 ? frag[ j ].cloneNode( true ) : frag[ j ], this );
			}
		});
	};
	
	wrap.fn.after = function( frag ){
		if( typeof( frag ) === "string" ){
			frag = wrap( frag );
		}
		return this.each(function( i ){
			for( var j = 0, jl = frag.length; j < jl; j++ ){
				var insertEl = i > 0 ? frag[ j ].cloneNode( true ) : frag[ j ];
				this.parentNode.insertBefore( insertEl, this );
				this.parentNode.insertBefore( this, insertEl );
			}
		});
	};
	
	wrap.fn.replaceWith = function( frag ){
		if( typeof( frag ) === "string" ){
			frag = wrap( frag );
		}
		var ret = [];
		this.each(function( i ){
			for( var j = 0, jl = frag.length; j < jl; j++ ){
				var insertEl = i > 0 ? frag[ j ].cloneNode( true ) : frag[ j ];
				this.parentNode.insertBefore( insertEl, this );
				insertEl.parentNode.removeChild( this );
				ret.push( insertEl );
			}
		});
		return wrap( ret );
	};
	
	
	
	

})();