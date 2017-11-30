/* eslint-env node */
// Copyright © 2016 Eirik Birkeland. All rights reserved.
'use strict'

const gulp = require('gulp')
const zip = require('gulp-zip')
const manifestIncrement = require('./bin/incrementManifest.js')
const getManifestVersion = require('./bin/update_latest.js').getManifestVersion
const updateLatestJson = require('./bin/update_latest.js').updateLatestJson
const git = require('gulp-git')
const debug = require('debug')('gulpfile')

const filesToZip = ['manifest.json', 'app.js', 'LICENSE.txt', 'package.json', 'html/**', 'lib/**', 'dist/*.js', 'dist/*.svg', 'icons/**', 'css/**', 'img/**', 'vendor/**']

gulp.task('production', ['manifestPROD', 'zipAndManifestPROD'])

gulp.task('zipAndManifestDEV', ['manifestDEV'], () => {
  return gulp.src(filesToZip, {base: '.'})
        .pipe(zip('dist/archive.zip'))
        .pipe(gulp.dest('./'))
})

gulp.task('manifestDEV', () => {
  manifestIncrement({suffix: 'DEV', type: 'dev'})
})

gulp.task('zipAndManifestPROD', ['manifestPROD'], () => {
  return gulp.src(filesToZip, {base: '.'})
        .pipe(zip('dist/archive.zip'))
        .pipe(gulp.dest('./'))
})

gulp.task('manifestPROD', () => {
  manifestIncrement({suffix: 'Public', type: 'build'})
})
