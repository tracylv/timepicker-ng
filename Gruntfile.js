module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bump');

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'meta': {
      project: '<%= pkg.name %>',
      version: '<%= pkg.version %>'
    },
    'bump': {
      options: {
        push: false,
        files: ['package.json', 'bower.json']
      }
    },
    'jasmine': {
      build: {
        src : ['spec/js/libs/jquery/dist/jquery.min.js', 'spec/js/libs/bootstrap/js/bootstrap.min.js', 'spec/js/libs/autotype/index.js', 'js/timepicker-ng.js'],
        options: {
          specs : 'spec/js/*Spec.js',
          helpers : 'spec/js/helpers/*.js',
          timeout : 100
        }
      }
    },
    'jshint': {
      options: {
        browser: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: true,
        sub: true,
        strict: true,
        trailing: true,
        undef: true,
        unused: true,
        laxcomma: true,
        white: false,
        globals: {
          jasmine: true,
          jQuery: true,
          $: true,
          expect: true,
          it: true,
          beforeEach: true,
          afterEach: true,
          describe: true,
          loadFixtures: true,
          console: true,
          module: true
        }
      },
      files: ['js/timepicker-ng.js', 'Gruntfile.js', 'package.json', 'spec/js/*Spec.js']
    },
    'less': {
      dev: {
        options: {
          paths: ['css']
        },
        files: {
          'css/bootstrap-timepicker.css': ['less/*.less']
        }
      },
      prod: {
        options: {
          paths: ['css'],
          yuicompress: true
        },
        files: {
          'css/bootstrap-timepicker.min.css': ['less/*.less']
        }
      }
    },
    'uglify': {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> \n' +
          '* https://github.com/nholling/bootstrap-3-timepicker \n' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> Nate Hollingsworth \n' +
          '* MIT License \n' +
          '*/',
        report: 'min'
      },
      build: {
        src: ['<banner:meta.banner>','js/<%= pkg.name %>.js'],
        dest: 'js/<%= pkg.name %>.min.js'
      }
    },
    'watch': {
      js: {
        files: ['js/timepicker-ng.js', 'spec/js/*Spec.js'],
        tasks: ['jshint', 'jasmine'],
        options: {
          livereload: true
        }
      },
      less: {
        files: ['less/timepicker.less'],
        tasks: ['less:dev'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'jasmine', 'less:dev']);
  grunt.registerTask('test', ['jasmine', 'jshint']);
  grunt.registerTask('compile', ['jshint', 'jasmine', 'uglify', 'less:prod']);
};
