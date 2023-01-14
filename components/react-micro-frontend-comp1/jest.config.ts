import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  moduleFileExtensions: ["ts", "js", "tsx"],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  modulePathIgnorePatterns: ["<rootDirs>/lib/"]
};

export default config;