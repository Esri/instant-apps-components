module.exports = {
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@whitespace/storybook-addon-html',
    'storybook-rtl-addon',
    'storybook-addon-themes',
    'storybook-color-picker',
  ],
  stories: ['../src/**/*.stories.@(mdx|ts)'],
  babel: async options => {
    return {
      ...options,
      presets: [...options.presets, '@babel/preset-react'],
    };
  },
};
