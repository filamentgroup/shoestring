/*global module:false*/
module.exports = function(grunt) {

  var fs, files, opts, builds = {};

  opts = {
    baseUrl: "src",
		name: "../build/REPLACE",
		out: "dist/REPLACE.js",
		mainConfigFile: "build/config.js"
  };

  fs = require( 'fs' );
  files = fs.readdirSync( "build/custom/" );

  files.forEach(function( file ) {
    if( /\.js$/.test(file) ){
      var name = file.replace(/\.js$/, "");

      builds[name] = {
        options: opts
      };

      builds[name].options.name = opts.name.replace("REPLACE", "custom/" + name );
      builds[name].options.out = opts.out.replace("REPLACE", name );
    }
  });

  builds.main = {
		options: {
			baseUrl: "src",
			name: "../build/main",
			out: "dist/main.js",
			mainConfigFile: "build/config.js"
		}
	};

	// Project configuration.
	grunt.initConfig({
		meta: {
			version: '0.1.0',
			banner: '/*! Shoestring - v<%= meta.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* http://github.com/filamentgroup/shoestring/\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
				'Scott Jehl, Filament Group, Inc; Licensed MIT & GPLv2 */ \n'
		},

		qunit: {
			files: ['test/unit/*.html']
		},

		requirejs: builds,

		// NOTE purely for the banner
		concat: {
			options: {
				banner: '<%= meta.banner %>',
				stripBanners: true
			},

			main: {
				src: ['dist/main.js'],
				dest: 'dist/shoestring.js'
			}
		},

		uglify: {
			all: {
				options: {
					banner: '<%= meta.banner %>',
					report: 'gzip'
				},

				files: {
					'dist/shoestring.min.js': ['dist/shoestring.js']
				}
			}
		},

		jshint: {
			all: {
				jshintrc: true,
				src: ['Gruntfile.js', 'src/shoestring.js', 'src/extensions/**/*.js']
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	// Default task.
	grunt.registerTask('build', 'requirejs concat uglify'.split(' ') );
	grunt.registerTask('test', 'jshint qunit'.split(' ') );
	grunt.registerTask('default', 'build test'.split(' ') );
};
