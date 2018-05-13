#!/usr/bin/env node

const formatter = require('eslint-formatter-pretty');
const CLIEngine = require('eslint').CLIEngine;

const args = process.argv.slice(2);
const linter = new CLIEngine({
    useEslintrc: false,
    configFile: require.resolve('./config.js'),
    extensions: ['.js', '.jsx'],
});

const report = linter.executeOnFiles(args);
const output = formatter(report.results);
const code = report.errorCount && args.indexOf('CI') > 0 ? 1 : 0;

console.log(output);
process.exit(code);
