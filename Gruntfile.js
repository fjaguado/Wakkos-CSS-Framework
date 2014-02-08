module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// CONFIG ===================================/
		watch: {
			css: {
				files: ['src/scss/**/*.scss'],
				tasks: ['compass:dev'],
				options: {
					livereload: true,
				}
			},
			js: {
				files: ['src/js/globals.js','src/js/events.js','src/js/functions/**/*.js'],
				tasks: ['concat','uglify:prod'],
				options: {
					livereload: true
				}
			},
			webpage: {
				files: ['**/*.html'],
				tasks: [],
				options: {
					livereload: true
				}
			}
		},
		compass: {
            prod: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'css',
                    environment: 'production',
                    force: true
                }
            },
            dev: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'css',
                    force: true
                }
            }
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
            },
            icons: {
                src: 'src/images/logo.jpg',
                dest: 'img/favicons'
            }
        },
        web_server: {
			options: {
				cors: true,
				port: 8000,
				nevercache: true,
				logRequests: true
			},
			foo: 'bar' // For some reason an extra key with a non-object value is necessary
		},
	});
	// DEPENDENT PLUGINS =========================/
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-favicons');
	grunt.loadNpmTasks('grunt-web-server');
	// TASKS =====================================/
	grunt.registerTask('default', [
		'compass:prod',
		'concat:prod',
		'uglify:prod',
		'favicons'
	]);
};