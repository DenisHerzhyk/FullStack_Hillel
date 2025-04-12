const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.(js|ts)'],
  setupFilesAfterEnv: ['./jest.setup.js']
}

module.exports = config
