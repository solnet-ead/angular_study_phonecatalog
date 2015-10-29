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
      appFiles: {
        src: 'app/js/*.js'
      },
      unitTestingFiles: {
        src: 'test/unit/*.js'
      },
      end2endTestingFiles: {
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
          base: [''], // set the location of the application files
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
        configFile: 'test/protractor-conf.js', // Default config file
        noColor: false, // If true, protractor will not use colors in its output.
        args: { // Arguments passed to the command
        }
      },
      e2e: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        options: {
          keepAlive: false // If false, the grunt process stops when the test fails.
        }
      }
    },
    watch: {
      appFiles: {
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
  grunt.registerTask('default', ['eslint', 'karma', 'e2eTest', 'watch:appFiles']);
  grunt.registerTask('e2eTest', ['serverTest', 'protractor:e2e']);
  grunt.registerTask('serverTest', 'connect:test');
  grunt.registerTask('serverApp', 'connect:alive');
  grunt.registerTask('build', ['concat', 'uglify']);
};
