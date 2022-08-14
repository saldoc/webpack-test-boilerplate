module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        "@typescript-eslint/no-this-alias": [
            "error",
            {
                "allowDestructuring": false,
                "allowedNames": ["self"]
            }
        ],
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};