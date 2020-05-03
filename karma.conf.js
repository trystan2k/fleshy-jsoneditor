/* eslint-disable import/no-extraneous-dependencies */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');
const path = require('path');

const snapshotsPath = `__snapshots__`;
const snapshotResolver = (basePath, suiteName) =>
  path.join(basePath, `${snapshotsPath}`, `${suiteName}.md`);

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        {
          pattern: config.grep ? config.grep : 'test/**/*.test.js',
          type: 'module',
        },
        {
          pattern: `${snapshotsPath}/**/*.md`,
          type: 'js',
        },
      ],

      snapshot: {
        pathResolver: snapshotResolver,
      },

      esm: {
        nodeResolve: true,
        coverageExclude: ['lib/*.js'],
      },
    })
  );
  return config;
};
