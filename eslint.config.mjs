import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.config({
		extends: [
			'next/core-web-vitals',
			'plugin:@typescript-eslint/recommended',
			'next/typescript',
			'prettier',
			'plugin:react/recommended',
			'plugin:prettier/recommended',
		],
		settings: {
			react: {
				version: 'detect',
			},
		},
		plugins: ['prettier', '@typescript-eslint', 'react', 'react-hooks'],
		rules: {
			semi: ['error', 'always'], // Wymuszenie średników
			quotes: ['error', 'single'], // Wymuszenie pojedynczych cudzysłowów
			'prefer-arrow-callback': ['error'], // Wymuszenie użycia funkcji strzałkowych
			'prefer-template': ['error'], // Wymuszenie używania template literals
			'no-var': ['error'], // Wymuszenie używania let/const zamiast var
			'no-unused-vars': ['error'], // Wymuszenie usunięcia nieużywanych zmiennych
			'no-undef': ['error'], // Ostrzeżenie o niezdefiniowanych zmiennych
			'no-constant-condition': ['error'], // Ostrzeżenie o warunkach z wartością stałą
			'prefer-const': ['error'], // Ostrzeżenie o zmiennych, które powinny być const
			'no-else-return': ['error'], // Ostrzeżenie o niepotrzebnym `else` po `return`
			'no-useless-return': ['error'], // Ostrzeżenie o niepotrzebnym `return`

			'@typescript-eslint/no-unused-vars': ['error'], // Wymuszenie usunięcia nieużywanych zmiennych w TypeScript

			'prettier/prettier': [
				'error',
				{
					useTabs: true, // Wymusza używanie tabulatorów
					tabWidth: 4, // Szerokość tabulatorów na 4
					singleQuote: true, // Pojedyncze cudzysłowy
					semi: true, // Wymuszenie średników
					arrowParens: 'always', // Nawiasy w funkcjach strzałkowych
					trailingComma: 'es5', // Przecinki na końcu obiektów/ tablic
					endOfLine: 'auto', // Ustawienie końca linii
				},
			],
			indent: [
				'error',
				'tab', // Używanie tabulatorów
				{
					SwitchCase: 1, // Wcięcie dla case w switch na 1 tabulator
				},
			],
		},
	}),
];

export default eslintConfig;
