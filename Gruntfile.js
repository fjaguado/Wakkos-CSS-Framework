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
				tasks: ['compass:dev']
			},
			js: {
				files: ['src/js/globals.js','src/js/events.js','src/js/functions/**/*.js'],
				tasks: ['concat']
			}
		},
		// Compilamos Sass a CSS
		compass: {
			options: {
				sassDir: 'src/scss',
				cssDir: 'css',
				force: true,
				relativeAssets: false,
				assetCacheBuster: false
			},
            prod: {
            },
            dev: {
                options: {
                    debugInfo: true
                }
            }
        },
        // Minimizamos el código CSS
        cssmin: {
        	prod: {
        		files: {
        			'css/style.css': [
        				'css/style.css'
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
        }
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

	grunt.registerTask('build', [
		'compass:prod',
		'cssmin:prod',
		'concat:prod',
		'uglify:prod',
		'favicons',
		'imagemin:prod',
	]);
};