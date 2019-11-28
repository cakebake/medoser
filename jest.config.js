module.exports = {
  moduleNameMapper: {
    // '^@/(.*)$': '<rootDir>/client/$1',
    // '^~/(.*)$': '<rootDir>/client/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1'
    // '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js'],
  // moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest'
    // '.*\\.(vue)$': 'vue-jest'
  },
  'collectCoverage': true,
  'collectCoverageFrom': [
    '<rootDir>/api/**/*.js'
    // '<rootDir>/client/components/**/*.vue',
    // '<rootDir>/client/pages/**/*.vue'
  ]
}
