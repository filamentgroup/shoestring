requirejs.config({
	pragmasOnSave: {
		exclude: true,
		development: true
	},
	findNestedDependencies: true,
	skipModuleInsertion: true,
	optimize: 'none',
	wrap: {
		startFile: "wrapStartFile.frag",
		endFile: "wrapEndFile.frag"
	}
});
