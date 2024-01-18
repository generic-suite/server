module.exports = {
  apps: [
    {
      name: 'server',
      script: './dist/src/main.js',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
