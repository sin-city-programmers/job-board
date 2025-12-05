import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// Reading the SWC compilation config for the spec files
const localSpecPath = join(process.cwd(), '.spec.swcrc');
const workspaceSpecPath = join(process.cwd(), 'apps/api/.spec.swcrc');
const swcConfigPath = existsSync(localSpecPath) ? localSpecPath : workspaceSpecPath;
const swcJestConfig = JSON.parse(readFileSync(swcConfigPath, 'utf-8'));

// Disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves
swcJestConfig.swcrc = false;

export default {
  displayName: '@nx-workspace/api',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: 'test-output/jest/coverage',
};
