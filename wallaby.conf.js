module.exports = () => ({
  files: ["src/**/*.js", "tests/fixtures/**/**.*"],
  tests: ["tests/**/*.js", "!tests/fixtures/**/*.*"],
  env: {
    type: "node"
  },
  testFramework: "jest"
});
