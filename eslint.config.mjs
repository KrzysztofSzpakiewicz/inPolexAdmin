import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	baseDirectory: import.meta.dirname,
	recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
	...compat.config({
		ignorePatterns: [
			'**/*.js',
			'**/*.mjs',
			'node_modules/',
			'dist/',
			'build/',
			'.next/',
			'.husky/',
		],

		extends: [
			'next/core-web-vitals',
			'plugin:@typescript-eslint/recommended',
			'next/typescript',
			'prettier',
			'next',
			'plugin:react/recommended',
			'plugin:prettier/recommended',
			'plugin:@next/next/recommended',
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
			'no-unused-vars': ['off'], // Wymuszenie usunięcia nieużywanych zmiennych
			'no-undef': ['error'], // Ostrzeżenie o niezdefiniowanych zmiennych
			'no-constant-condition': ['error'], // Ostrzeżenie o warunkach z wartością stałą
			'prefer-const': ['error'], // Ostrzeżenie o zmiennych, które powinny być const
			'no-else-return': ['error'], // Ostrzeżenie o niepotrzebnym `else` po `return`
			'no-useless-return': ['error'], // Ostrzeżenie o niepotrzebnym `return`

			// Reguły TypeScript
			'@typescript-eslint/no-unused-vars': ['error'], // Wymuszenie usunięcia nieużywanych zmiennych w TypeScript
			'@typescript-eslint/explicit-function-return-type': ['error'], // Wymuszenie jawnego typowania zwracanych wartości funkcji
			'@typescript-eslint/explicit-module-boundary-types': ['error'], // Wymuszenie jawnego typowania zwracanych wartości w eksportowanych funkcjach
			'@typescript-eslint/no-inferrable-types': ['off'], // Wyłączenie możliwości pomijania typów, gdy są oczywiste (np. let x: number = 5)
			'@typescript-eslint/typedef': [
				'error',
				{
					variableDeclaration: true, // Wymuszenie typowania wszystkich zmiennych
					parameter: true, // Wymuszenie typowania wszystkich parametrów funkcji
					arrowParameter: true, // Wymuszenie typowania parametrów w funkcjach strzałkowych
					propertyDeclaration: true, // Wymuszenie typowania właściwości w obiektach/klasach
					memberVariableDeclaration: true, // Wymuszenie typowania zmiennych w klasach
				},
			],
			'@typescript-eslint/no-explicit-any': ['error'], // Zakaz używania typu `any`
			'@typescript-eslint/consistent-type-assertions': [
				'error',
				{
					assertionStyle: 'as', // Wymuszenie użycia `as` zamiast `<>` do rzutowania typów
					objectLiteralTypeAssertions: 'never', // Zakaz rzutowania literałów obiektowych
				},
			],
			'@typescript-eslint/no-use-before-define': [
				'error',
				{
					functions: false, // Pozwala na używanie funkcji przed ich zdefiniowaniem
					classes: true, // Zakazuje używania klas przed ich zdefiniowaniem
					variables: true, // Zakazuje używania zmiennych przed ich zdefiniowaniem
				},
			],

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
