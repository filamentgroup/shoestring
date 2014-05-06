module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		meta: {
			version: '<%= pkg.version %>',
			banner: '/*! <%= pkg.title %> - v<%= meta.version %> ' +
				'- <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* <%= pkg.description %>\n' +
				'* http://github.com/filamentgroup/shoestring/\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
				'Scott Jehl, Filament Group, Inc; Licensed MIT & GPLv2 */\n'
		},

		jshint: {
			source: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				files: {
					src: ['src/shoestring.js', 'src/extensions/*.js']
				}
			}
		},

		concat: {
			options: {
				stripBanners: true,
				banner: '<%= meta.banner %>'
			},
			dist: {
				src: ['src/shoestring.js', 'src/extensions/*.js'],
				dest: 'dist/shoestring.js'
			}
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			dist: {
				options: {
					sourceMap: true,
					sourceMapName: 'dist/shoestring.min.js.map'
				},
				files: {
					'dist/shoestring.min.js': ['dist/shoestring.js']
				}
			}
		},

		qunit: {
			all: ['test/unit/index.html']
		},

		watch: {
			source: {
				files: ['src/**/*.js', 'test/unit/*.js', 'test/unit/index.html'],
				tasks: ['jshint:source', 'concat:dist', 'qunit']
			}
		}
	});

	// Load all npm installed grunt tasks.
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['jshint:source', 'concat:dist', 'uglify:dist', 'qunit']);
};