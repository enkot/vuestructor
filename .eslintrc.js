module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/recommended',
    ],
    plugins: [
        'vue'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'indent': ['error', 4],
        "vue/html-indent": ["error", 4],
        "space-before-function-paren": ["error", "never"],
        "semi": ["error", "never"],
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
