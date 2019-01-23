'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
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
          'css/main.css': 'scss/*.scss'
        }
      }
    },
   watch: {
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
  
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['watch']);

};