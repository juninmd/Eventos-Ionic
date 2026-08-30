import { Config } from 'karma';
import * as path from 'path';

const basePath = '';

export default function (config: Config): void {
  config.set({
    basePath,
    frameworks: ['jasmine', 'karma-typescript'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage-istanbul-reporter',
      'karma-typescript'
    ],
    files: [
      'src/**/*.ts',
      'test/**/*.spec.ts'
    ],
    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },
    client: {
      clearContext: false
    },
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.spec.json',
      reports: {
        html: { directory: 'coverage', subdirectory: '.' },
        lcovonly: { directory: 'coverage', subdirectory: '.' }
      },
      coverageOptions: {
        threshold: { global: { statements: 85, branches: 80, functions: 85, lines: 85 } }
      }
    },
    coverageIstanbulReporter: {
      dir: path.join('.', 'coverage-istanbul'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: true
  });
}
