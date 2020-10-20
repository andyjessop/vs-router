module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: /\.(test)\.ts$/,
        warnOnly: true,
      },
    },
    window: true,
  },
  moduleDirectories: ['<rootDir>/node_modules'],
  moduleFileExtensions: ['js', 'json', 'node', 'ts'],
  preset: 'jest-playwright-preset',
  rootDir: './',
  testMatch: ['<rootDir>/(src|test)/**/*.test.(js|ts)'],
  transform: {
    '^.+\\.ts?$': '<rootDir>/node_modules/ts-jest',
  },
  transformIgnorePatterns: ['node_modules'],
};
