'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
        dist: {
          src: ['scripts/*.js'],
          dest: 'js/app.js',
      }
    },
    pug: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          'index.html': ['index.pug']
        }
      }
    },
    
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/main.css': 'scss/main.scss'
        }
      }
    },
   watch: {
     scripts: {
      files: ['scripts/**/*.js'],
      tasks: ['concat']
     },
      options: {
          livereload: true
        },
      css: {
        files: 'scss/*.scss',
        tasks: ['sass']
      },
      pug: {
       files : '*.pug',
       tasks: ['pug']
     }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['watch']);

};