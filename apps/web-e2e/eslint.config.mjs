import playwright from 'eslint-plugin-playwright';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,
    },
  },
];
