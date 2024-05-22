import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import path from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';
// import tsPrettierConfig from 'eslint-config-prettier';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: pluginJs.configs.recommended,
});

/**
 * @type {import("eslint").Linter.FlatConfig}
 */
export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended.map((config) => ({
		...config,
		files: ['**/*.(ts|tsx)'],
		rules: {
			...config.rules,
			'no-throw-literal': 'off',
			'comma-dangle': 'off',
			'no-unused-vars': 'off',
			'no-empty': 'off',
			'prettier/prettier': 'off',
			'consistent-type-imports': 'error',
		},
	})),
	...compat.extends('standard-with-typescript').map((config) => ({
		...config,
		files: ['**/*.(mjs|js)'],
		rules: {
			...config.rules,
			'no-unused-vars': 'off',
			'no-empty': 'off',
			'prettier/prettier': 'off',
		},
	})),
	{
		plugins: { 'simple-import-sort': simpleImportSort },
		rules: {
			'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
			'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
			'prefer-default-export': 'off',
			'no-unknown-property': 'off',
			'no-unused-imports': 'off',
			'no-unused-vars': 'warn',
			'no-empty': 'warn',
			'prettier/prettier': 'off',
			'naming-convention': 'off',
		},
	},
	eslintConfigPrettier,
	// eslintPluginPrettierRecommended,
];
