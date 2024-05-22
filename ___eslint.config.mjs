import PrettierRecommended from 'plugin:prettier/recommended';

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
export default [
	{
		ignores: ['node_modules', 'out', 'public', '.next', 'build', 'dist', 'cypress', '__test__'],
		// Configuration for JavaScript files
		PrettierRecommended,

		rules: {
			'no-param-reassign': 0,
			'prettier/prettier': [
				'error',
				{
					trailingComma: 'es5',
					tabWidth: 4,
					useTabs: true,
					semi: true,
					singleQuote: true,
					endOfLine: 'lf',
					printWidth: 120,
				},
			],
		},
		overrides: [
			// Configuration for TypeScript files
			{
				files: ['**/*.ts', '**/*.tsx'],
				plugins: ['@typescript-eslint', 'unused-imports', 'tailwindcss', 'simple-import-sort'],
				extends: [
					'plugin:tailwindcss/recommended',
					'airbnb-typescript',
					'next/core-web-vitals',
					'plugin:prettier/recommended',
				],
				parserOptions: {
					project: './tsconfig.json',
				},
				rules: {
					'prettier/prettier': [
						'error',
						{
							trailingComma: 'es5',
							tabWidth: 4,
							useTabs: true,
							semi: true,
							singleQuote: true,
							endOfLine: 'lf',
							printWidth: 120,
						},
					],
					'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
					'react/require-default-props': 'off', // Allow non-defined react props as undefined
					'react/jsx-props-no-spreading': 'off', // _app.tsx uses spread operator and also, react-hook-form
					'react-hooks/exhaustive-deps': 'off', // Incorrectly report needed dependency with Next.js router
					'@next/next/no-img-element': 'off', // We currently not using next/image because it isn't supported with SSG mode
					'@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
					'@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
					'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
					'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
					'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
					'@typescript-eslint/no-unused-vars': 'off',
					'unused-imports/no-unused-imports': 'off',
					'no-unknown-property': 'off',
					'no-console': 'off',
					'tailwindcss/no-custom-classname': 'off',
					'tailwindcss/migration-from-tailwind-2': 'off',
					'@typescript-eslint/naming-convention': 'off',
					'@typescript-eslint/no-throw-literal': 'off',
					'unused-imports/no-unused-vars': 'off',
				},
			},
			// Configuration for testing
			{
				files: ['**/*.test.ts', '**/*.test.tsx'],
				plugins: ['jest', 'jest-formatting', 'testing-library', 'jest-dom'],
				extends: [
					'plugin:jest/recommended',
					'plugin:jest-formatting/recommended',
					'plugin:testing-library/react',
					'plugin:jest-dom/recommended',
				],
			},
			// Configuration for e2e testing (Cypress)
			{
				files: ['cypress/**/*.ts'],
				plugins: ['cypress'],
				extends: ['plugin:cypress/recommended'],
				parserOptions: {
					project: './cypress/tsconfig.json',
				},
			},
		],
	},
];
