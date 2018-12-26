import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'

const external = [
    ...Object.keys(require('./package.json').dependencies),
    'vue-popperjs/dist/css/vue-popper.css',
]

export default [
    // ESM build to be used with webpack/rollup.
    {
        input: 'src/index.js',
        output: {
            format: 'esm',
            file: 'dist/vuestructor.js',
        },
        plugins: [
            vue(),
            postcss({
                plugins: [],
            }),
        ],
        external,
    },
    // SSR build.
    {
        input: 'src/index.js',
        output: {
            format: 'cjs',
            file: 'dist/vuestructor.ssr.js',
        },
        plugins: [
            vue({
                template: {
                    optimizeSSR: true,
                },
            }),
            postcss({
                plugins: [],
            }),
        ],
        external,
    },
]
