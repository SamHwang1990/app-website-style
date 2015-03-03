/**
 * Created by sam on 15-3-2.
 */

module.exports = function(grunt){
  grunt.initConfig({
    distdir: 'css',
    pkg: grunt.file.readJSON('package.json'),
    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
    ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',

    src: {
      stylus: ['stylus/app_custom.styl'],
      stylusWatch: ['stylus/**/*.styl']
    },
    clean: ['<%= distdir %>/*'],
    stylus: {
      build: {
        files: {
          '<%= distdir %>/app_custom.css':
            ['<%= src.stylus %>'] },
        options: {
          compress: false
        }
      }
    },
    watch:{
      build: {
        files:[
          '<%= src.stylusWatch %>'
        ],
        tasks:['build','timestamp']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('build', ['clean','stylus']);

};
