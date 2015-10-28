/* eslint strict: [2, "global"] */
'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '1.0.0'
    },
    pkg: grunt.file.readJSON('package.json'),
    banner: '/** \n' +
              '* Project:   <%= pkg.name %>\n' +
              '* Version:   <%= pkg.version %>\n' +
              '* Date:      <%= grunt.template.today("yyyy-mm-dd") %>\n' +
              '* Copyright: Solnet\n' +
              '*/',

    // Task configuration.
    clean: {
      src: 'dist'
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: 'app/js/*.js',
        dest: 'dist/FILE_NAME.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/FILE_NAME.min.js'
      }
    },
    eslint: {
      target: [
        'app/js/**/*.js',
        'Gruntfile.js'
      ],
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app_files: {
        src: 'app/js/*.js'
      },
      unit_testing_files: {
        src: 'test/unit/*.js'
      },
      end_2_end_testing_files: {
        src: 'test/e2e/*.js'
      }
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },
    connect: {
      options: {
        port: 9999,
        hostname: 'localhost',
        keepalive: true
      },
      test: {
        options: {
          // set the location of the application files
          base: [''],
          keepalive: false
        }
      },
      alive: {
        options: {
          base: 'app'
        }
      }
    },
    protractor: {
      options: {
        configFile: "test/protractor-conf.js", // Default config file
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      e2e: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        options: {
          keepAlive: false // If false, the grunt process stops when the test fails.
        }
      }
    },
    watch: {
      app_files: {
        files: '<%= jshint.app_files.src %>',
        tasks: 'jshint:app_files'
      }
    },
    bowerInstall: {
      options: {
        exclude: [],
        fileTypes: {}
      },
      target: {
        src: 'app/index.html'
      }
    }
  });

  // filter npm modules and load them
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Add task aliases
  grunt.registerTask('default', ['eslint', 'karma', 'e2e-test', 'watch:app_files']);
  grunt.registerTask('e2e-test', ['server_test', 'protractor:e2e']);
  grunt.registerTask('server_test', 'connect:test');
  grunt.registerTask('server_app', 'connect:alive');
  grunt.registerTask('build', ['concat', 'uglify']);
};
