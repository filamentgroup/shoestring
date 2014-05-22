//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.serialize = function(){
		var data = {};
		shoestring( "input, select", this ).each(function(){
			var type = this.type,
				name = this.name,
				value = this.value;

			if( /text|hidden|password|color|date|datetime|datetime\-local|email|month|number|range|search|tel|time|url|week/.test( type ) || ( type === "checkbox" || type === "radio" ) && this.checked ){
				data[ name ] = value;
			}
			else if( this.nodeName === "select" ){
				data[ name ] = this.options[ this.selectedIndex ].nodeValue;
			}
		});
		return data;
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
