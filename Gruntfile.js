'use strict';

module.exports = function (grunt) {

  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Config
  grunt.initConfig({

    // Express
    express: {
      options: {
        delay: 1000
      },
      dev: {
        options: {
          script: 'app.js'
        }
      },
      prod: {
        options: {
          script: 'app.js',
          background: false,
          node_env: 'production'
        }
      }
    },

    // Watching files
    watch: {
      less: {
        files: [ 'public/css/**/*.less' ],
        tasks: [ 'less:development' ],
        options: { nospawn: true }
      },
      livereload: {
        options: { livereload: true },
        files: [
          'app/**/*',
          'public/**/*',
          '!public/**/*.less',
          '!public/components/**'
        ]
      }
    },

    // Compile less files
    less: {
      development: {
        options: {
          paths: [ 'less' ]
        },
        files: {
          'public/css/style.css': 'public/css/style.less'
        }
      },
      production: {
        options: {
          paths: [ 'less' ],
          cleancss: true
        },
        files: {
          'public/css/style.css': 'public/css/style.less'
        }
      }
    }

  });

  // Server task
  grunt.registerTask('server', function (target) {

    if (target === 'production') {
      grunt.log.subhead('Production mode tasks');
      grunt.task.run(['express:prod']);
    }

    if (target === 'development' || !target) {
      grunt.log.subhead('Development mode tasks');
      grunt.task.run(['express:dev', 'watch']);
    }

  });

  // Default task
  grunt.registerTask('default', ['less:production']);

  // Build task
  grunt.registerTask('build', ['less:production']);

};
