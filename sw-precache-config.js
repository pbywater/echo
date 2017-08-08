module.exports = {
  runtimeCaching: [
    {
      urlPattern: /jquery\.com/,
      handler: 'cacheFirst',
      options: {
        cache: {
          name: 'jquery-cache',
        },
      },
    },
    {
      urlPattern: /googleapis\.com/,
      handler: 'cacheFirst',
      options: {
        cache: {
          name: 'font-cache',
        },
      },
    },
    {
      urlPattern: /d3js\.org/,
      handler: 'cacheFirst',
      options: {
        cache: {
          name: 'd3-cache',
        },
      },
    },
  ],
  stripPrefix: 'public/',
  verbose: true,
  staticFileGlobs: [
    'public/assets/icons/**/*.svg',
    'public/*.html',
    'public/*.css',
    'public/**/*.js',
  ],
  swFilePath: 'public/service-worker.js',
};
