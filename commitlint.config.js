module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce conventional commit types
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],

    // Require scope (must be present)
    'scope-empty': [2, 'never'],

    // Enforce lowercase type
    'type-case': [2, 'always', 'lower-case'],

    // Enforce lowercase first letter in subject
    'subject-case': [2, 'always', 'lower-case'],

    // Enforce subject length (max 72 characters)
    'subject-max-length': [2, 'always', 72],

    // Enforce subject not to end with period
    'subject-full-stop': [2, 'never', '.'],

    // Enforce subject not to be empty
    'subject-empty': [2, 'never'],

    // Enforce scope format (lowercase with hyphens allowed)
    'scope-case': [2, 'always', 'lower-case'],
  },
};
