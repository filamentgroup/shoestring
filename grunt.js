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
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/shoestring.js>', 'src/extensions/*.js'],
        dest: 'dist/shoestring.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/shoestring.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
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
      globals: {}
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');

};
