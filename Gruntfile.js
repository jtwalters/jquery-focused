/* jshint node:true */

module.exports = function(grunt) {

  grunt.initConfig({

    // Import package manifest
    pkg: grunt.file.readJSON('focused.jquery.json'),

    // Banner definitions
    meta: {
      banner: '/*\n' +
        ' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
        ' *  <%= pkg.description %>\n' +
        ' *  <%= pkg.homepage %>\n' +
        ' *\n' +
        ' *  Made by <%= pkg.author.name %>\n' +
        ' *  Under <%= pkg.licenses[0].type %> License\n' +
        ' */\n'
    },

    // Concat definitions
    concat: {
      dist: {
        src: ['src/jquery.focused.js'],
        dest: 'dist/jquery.focused.js'
      },
      options: {
        banner: '<%= meta.banner %>'
      }
    },

    // Lint definitions
    jshint: {
      files: ['src/*.js'],
    },

    // Minify definitions
    uglify: {
      dev: {
        src: ['dist/jquery.focused.js'],
        dest: 'dist/jquery.focused.min.js'
      },
      options: {
        banner: '<%= meta.banner %>'
      }
    },

    watch: {
      scripts: {
        files: '**/*.js',
        tasks: ['jshint'],
        options: {
          interrupt: true,
        },
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('travis', ['jshint']);

};
