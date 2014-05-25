module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// CONFIG ===================================/
		watch: {
			css: {
				files: ['src/scss/**/*.scss'],
				tasks: ['sass:dev']
			},
			js: {
				files: ['src/js/globals.js','src/js/events.js','src/js/functions/**/*.js'],
				tasks: ['concat']
			},
            kitfiles: {
                files: ['patrones/index.kit', 'patrones/kit-files/**/*.html'],
                tasks: ['codekit:prod']
            }
		},
        codekit: {
            options: {
              // None yet
            },
            prod: {
                files : {
                    'patrones/index.html' : 'patrones/index.kit'
                }
            },
        },
        sass: {
            prod: {
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }],
                options: {
                    debugInfo: true
                }
            }
        },
        // Minimizamos el código CSS
        cssmin: {
        	prod: {
        		files: {
        			'css/style.min.css': [
        				'css/style.css'
    				],
                    'css/lt-ie9.min.css': [
                        'css/lt-ie9.css'
                    ]
        		}
        	}
        },
        // Minimizamos y optimizamos las imágenes
        imagemin: {
        	prod: {
        		files: [{
        			expand: true,
        			cwd: 'img',
        			src: '**/*.{gif,jpeg,jpg,png}',
        			dest: 'img'
        		}]
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
        // Ejecuta varias tareas en paralelo para optimizar la ejecución
        concurrent: {
            dev: [
                'sass:dev',
                'concat:prod'
            ],
            prepare: [
                'sass:prod',
                'concat:prod',
                'favicons'
            ],
            optimize: [
            	'cssmin:prod',
            	'uglify:prod',
            	'imagemin:prod'
            ]
        }
	});
	// TASKS =====================================/
	grunt.registerTask('default', [
		'concurrent:dev'
	]);

	grunt.registerTask('build', [
		'concurrent:prepare',
		'concurrent:optimize'
	]);
};