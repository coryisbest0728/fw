const path = require('path');
const {
    override,
    overrideDevServer,
    watchAll,
    fixBabelImports,
    addWebpackPlugin,
    addBabelPresets,
    addBabelPlugin,
    addLessLoader,
    addWebpackModuleRule
} = require('customize-cra');
const Dotenv = require('dotenv-webpack');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const AppCtxConfigCompiler = require('./compiler/AppCtxConfigCompiler');
const { ModifySourcePlugin } = require('modify-source-webpack-plugin');
const MockWebpackPlugin = require('mock-webpack-plugin');
const mockConfig = require('./mock/config');

module.exports = {
    webpack: override(
        addWebpackModuleRule({ test: /.jsonc$/, use: 'jsonc-loader' }),
        fixBabelImports('antd', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true
        }),
        addBabelPresets('@babel/preset-react'),
        addBabelPlugin('@babel/plugin-syntax-dynamic-import'),
        addBabelPlugin('@loadable/babel-plugin'),
        addLessLoader({ // modified the theme
            lessOptions: {
                javascriptEnabled: true
            }
        }),
        addWebpackPlugin(new Dotenv({
            path: `./env/.${ process.env.NODE_ENV }.env`, // load this now instead of the ones in '.env'
            safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            silent: true, // hide any errors
            defaults: false // load '.env.defaults' as the default values if empty.
        })),
        addWebpackPlugin(new AntdDayjsWebpackPlugin()),
        addWebpackPlugin(new ModifySourcePlugin({
            rules: [{
                test: /ApplicationContext\.ts$/,
                modify: (src, filename) => new AppCtxConfigCompiler().compile(src)
            }]
        })),
        process.env.NODE_ENV === 'development'
        ?
        addWebpackPlugin(new MockWebpackPlugin({
            // mock config
            config: mockConfig,
            // mock server port, avoid collision with application port
            port: 3001
        }))
        :
        undefined
    )
    ,
    devServer: overrideDevServer(
        function (config) {
            return Object.assign(config || {}, {
                port: 3000,
                proxy: {
                    // mock server url
                    '/api': 'http://localhost:3001'
                },
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
                }
            });
        },
        watchAll()
    )
};
