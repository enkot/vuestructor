const path = require('path')

module.exports = {
    entry: './demo/main.js',
    extendWebpack(config) {
        config.module.rule('vue')
            .use('vue-loader')
            .tap(options => {
                // const scss = options.loaders.scss.shift()
                // console.log(scss.options)
                // scss.options.insertInto = '#i-frame'
                // options.loaders.scss.unshift(scss)
                // console.log(options.loaders.scss)
                return options
            })
    },
    extractCSS: true,
}
