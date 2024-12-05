const { pathsToModuleNameMapper } = require("ts-jest");
const tsconfig = require("./tsconfig.json");

module.exports = {
    roots: ["<rootDir>"],
    // modulePaths: [tsconfig.compilerOptions.baseUrl],
    collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts", "!**/node_modules/**"],
    moduleNameMapper: {
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
        "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/__mocks__/fileMock.js",
        ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: "<rootDir>/" }),
    },
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/", "<rootDir>/__utils__"],
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    testEnvironment: "node",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { configFile: "./babel.jest.config.js" }],
    },
    transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],
    // setupFilesAfterEnv: ["<rootDir>/setupTest.js"],
};