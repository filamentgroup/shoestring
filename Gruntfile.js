/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		meta: {
			version: '0.1.0',
			banner: '/*! Shoestring - v<%= meta.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* http://github.com/filamentgroup/shoestring/\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
				'Scott Jehl, Filament Group, Inc; Licensed MIT & GPLv2 */'
		},
		lint: {
			files: ['grunt.js', 'src/shoestring.js', 'src/extensions/*.js']
		},
		qunit: {
			files: ['test/unit/*.html']
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			core: {
				src: ['src/shoestring.js', 'src/extensions/*.js'],
				dest: 'dist/shoestring.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			all: {
				src: ['<%= concat.core.dest %>'],
				dest: 'dist/shoestring.min.js'
			}
		},
		jshint: {
			all: {
				options: {
					curly: true,
					eqeqeq: true,
					immed: true,
					latedef: true,
					newcap: true,
					noarg: true,
					sub: true,
					undef: false,
					evil: true,
					boss: true,
					eqnull: true,
					browser: true,
					loopfunc: true
				},
				globals: {},
				src: ['Gruntfile.js', 'src/shoestring.js', 'src/extensions/*.js']
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task.
	grunt.registerTask('default', 'jshint concat uglify qunit'.split(' ') );

};
