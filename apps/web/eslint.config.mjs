import nx from '@nx/eslint-plugin';
import nextVitals from 'eslint-config-next/core-web-vitals';
import baseConfig from '../../eslint.config.mjs';

const config = [
  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
  ...nextVitals,
  {
    ignores: ['.next/**/*', '**/out-tsc'],
  },
];

export default config;
