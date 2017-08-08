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
  ],
  verbose: true,
  staticFileGlobs: [
    'public/assets/icons/**/*.svg',
    'https://code.jquery.com/jquery-3.2.1.min.js',
    'https://d3js.org/d3.v4.min.js',
    'https://fonts.googleapis.com/css?family=Quicksand:300,400,500',
    'public/*.html',
    'public/*.css',
    'public/**/*.js',
  ],
  swFilePath: 'public/service-worker.js',
};
