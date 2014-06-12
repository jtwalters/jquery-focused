/* jshint node:true, camelcase:false */

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
      dev: {
        files: '**/*.js',
        tasks: ['jshint'],
        options: {
          interrupt: true,
        },
      },
    },

    update_json: {
      // set some task-level options
      options: {
        indent: '  ',
      },
      // update bower.json
      bower: {
        src: 'focused.jquery.json',
        dest: 'bower.json',
        // the fields to update, as a String Grouping
        fields: 'version, description',
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-update-json');

  grunt.registerTask('default', ['update_json', 'jshint', 'concat', 'uglify']);
  grunt.registerTask('travis', ['jshint']);

};
