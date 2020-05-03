const copy = require('rollup-plugin-copy');

module.exports = {
  stories: ['../stories/**/*.stories.{js,md,mdx}'],
  addons: [
    'storybook-prebuilt/addon-knobs/register.js',
    'storybook-prebuilt/addon-docs/register.js',
    'storybook-prebuilt/addon-viewport/register.js',
  ],
  esDevServer: {
    // custom es-dev-server options
    nodeResolve: true,
    watch: true,
    open: true,
  },

  // Configuration for rollup (build-storybook only)
  rollup: config => {
    config.plugins = [
      ...config.plugins,
      copy({
        targets: [
          {
            src: ['lib/theme-jsoneditor.js', 'lib/jsoneditor.min.css'],
            dest: 'storybook-static/lib',
          },
          {
            src: 'lib/img/jsoneditor-icons.svg',
            dest: 'storybook-static/lib/img',
          },
        ],
      }),
    ];
    return config;
  },
};
