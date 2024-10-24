module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin',
            'security',
            'no-secrets',
            'xss',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:security/recommended-legacy',
    'plugin:xss/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js','app.e2e-spec.ts'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    'no-secrets/no-secrets': 'error',
    'xss/no-mixed-html': 'warn',
    'xss/no-location-href-assign': 'error',
    "security/detect-buffer-noassert": "error",  // Wykrywa niebezpieczne użycie funkcji Buffer.
    "security/detect-child-process": "error",    // Ostrzega przed używaniem child_process, co może być niebezpieczne.
    "security/detect-eval-with-expression": "error", // Wykrywa potencjalnie niebezpieczne użycie eval.
    "security/detect-new-buffer": "error",       // Wykrywa stare i niebezpieczne sposoby tworzenia Buffer.
    "security/detect-no-csrf-before-method-override": "warn",  // Pomaga w identyfikacji potencjalnych problemów z CSRF.
    "security/detect-non-literal-fs-filename": "warn",  // Wykrywa niebezpieczne operacje na plikach.
    "security/detect-non-literal-regexp": "warn", // Ostrzega przed dynamicznie tworzonymi wyrażeniami regularnymi.
    "security/detect-non-literal-require": "error",  // Zapobiega dynamicznemu importowi modułów.
    "security/detect-possible-timing-attacks": "warn",  // Wykrywa możliwe ataki timingowe.
    "security/detect-pseudoRandomBytes": "warn"  // Ostrzega przed używaniem pseudolosowych generatorów liczb.
  },
};
