module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'style',
                    src: ['*.scss'],
                    dest: './public',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'public/index.css': 'public/index.css'
                }
            }
        },
        // uglify: {
        //     /* 最小化、混淆、合并 JavaScript 文件 */
        //     target: {
        //         files: {
        //             'js/all.min.js': ['js/all.js']
        //         }
        //     },
        //     minjs: { //最小化、混淆所有 js/ 目录下的 JavaScript 文件
        //         files: [{
        //             expand: true,
        //             cwd: 'js/',
        //             src: ['**/*.js', '!**/*.min.js'],
        //             dest: 'js/',
        //             ext: '.min.js'
        //         }]
        //     }
        // },
        watch: {
            /* 监控文件变化并执行相应任务 */
            img: {
                files: ['img/**/*.{png,jpg,jpeg}'],
                options: {
                    livereload: true
                }
            },
            css: {
                options: {
                    event: ['changed', 'added'],
                    livereload: true
                },
                files: ['public/*.css'],
                tasks: ['autoprefixer']
            },
            js: {
                options: {
                    livereload: true
                },
                files: ['js/**/*.js']
            },
            html: {
                options: {
                    livereload: true
                },
                files: ['*.html']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    // 定义默认任务
    grunt.registerTask('default', ['sass','autoprefixer']);
    grunt.registerTask('css', ['concat:css', 'cssmin']);
    grunt.registerTask('dev', ['csslint', 'jshint']);
    grunt.registerTask('dest', ['imagemin', 'concat:css', 'cssmin', 'uglify:minjs']);
};