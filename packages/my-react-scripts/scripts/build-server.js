#!/usr/bin/env node

const { argv } = require('yargs');
const webpack = require('webpack');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());

webpack(
    {
        mode: 'production',
        context: appDirectory,
        entry: argv.entry || './src/index.js',
        output: {
            path: appDirectory + '/server',
            filename: 'bundle.js',
            libraryTarget: 'commonjs2',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'react',
                                [
                                    'env',
                                    {
                                        targets: {
                                            node: '6.13.1',
                                        },
                                        modules: 'commonjs',
                                    },
                                ],
                            ],
                            plugins: [
                                'babel-plugin-transform-object-rest-spread',
                                'dynamic-import-node',
                                'babel-plugin-transform-class-properties',
                            ],
                        },
                    },
                },
            ],
        },
    },
    (err, stats) => {
        if (err || stats.hasErrors()) {
            throw new Error(err);
        }
        // Done processing
    }
);
