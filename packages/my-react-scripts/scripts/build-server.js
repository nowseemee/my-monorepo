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
                                '@babel/react',
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            node: '6.11.5',
                                        },
                                        modules: 'commonjs'
                                    },
                                ],
                            ],
                            plugins: [
                                'dynamic-import-node',
                                '@babel/plugin-proposal-class-properties',
                            ],
                        },
                    },
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: require.resolve('file-loader'),
                    options: {
                        limit: 10000,
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
            ],
        },
    },
    (err, stats) => {
        if (err || stats.hasErrors()) {
            throw new Error(stats.compilation.errors);
        }
    }
);
