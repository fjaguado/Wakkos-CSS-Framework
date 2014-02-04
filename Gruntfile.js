module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// CONFIG ===================================/
		watch: {
			less: {
				files: ['less/**/*.less'],
				tasks: ['less:dev'],
				options: {
					nospawn: true
				}
			},
			concat: {
				files: ['src/js/globals.js','src/js/events.js','src/js/functions/**/*.js'],
				tasks: ['concat','uglify:prod']
			}
		},
		less: {
			dev:{
				options: {
					compress: false,
					yuicompress: false,
					optimization: 2
				},
				files:{
					"css/app.css" :  "src/less/style.less"
				}
			},
			prod:{
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files:{
					"css/app.css" :  "src/less/style.less"
				}
			},
		},
		concat: {
			options:{
				separator: '\n\r'
			},
			prod: {
				src: ['src/js/globals.js','src/js/events.js','src/js/functions/**/*.js'],
				dest: 'js/scripts.js'
			}
		},
		uglify: {
			prod: {
				files: {
					'js/scripts.min.js' : ['js/scripts.js']
				}
			}
		},
		favicons: {
            options: {
                trueColor: true,
                precomposed: true,
                appleTouchBackgroundColor: "#FFFFFF",
                coast: true,
                windowsTile: true,
                tileBlackWhite: false,
                tileColor: "auto"
                //html: 'build/out/index.html',
                //HTMLPrefix: "/images/icons/"
            },
            icons: {
                src: 'src/images/logo.jpg',
                dest: 'img/favicons'
            }
        },
   });
   // DEPENDENT PLUGINS =========================/
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-favicons');
   // TASKS =====================================/
   grunt.registerTask('default', [
		'less:prod',
		'concat:prod',
		'uglify:prod',
		'favicons'
	]);
};
