requirejs.config({
  pragmasOnSave: { exclude: true },
  findNestedDependencies: true,
  skipModuleInsertion: true,
  optimize: 'none',
  wrap: {
    start: "(function( w, undefined ){",
    end: "})( this );"
  }
});
