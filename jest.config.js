module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "pages/**/*.{ts}",
    "!pages/**/index.{ts,tsx}",
    "!pages/**/*.d.{ts,tsx}",
    "!pages/**/(__tests__|tests|__storybook__|__mocks__)/*.{ts,tsx}",
  ],
  preset: 'ts-jest',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "\/node_modules\/(?!(\\S+\\.css))"
  ],
  testMatch: [
    "<rootDir>/pages/**/__tests__/**/*.test.(ts|tsx|js|jsx)",
    "<rootDir>/tests/**/*.test.(ts|tsx|js|jsx)"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  testURL: "http://localhost",
};
