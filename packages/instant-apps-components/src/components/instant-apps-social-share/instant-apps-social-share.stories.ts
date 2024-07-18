export default {
  title: 'Components/SocialShare',
  argTypes: {
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
    mode: {
      options: ['inline', 'popover'],
      control: { type: 'radio' },
    },
    scale: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
    shareButtonScale: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
    embed: {
      control: 'boolean',
    },
    socialMedia: {
      control: 'boolean',
    },
    shortenShareUrl: {
      control: 'boolean',
    },
    displayTipText: {
      control: 'boolean',
    },
  },
};

const Template = args => {
  document.body.classList.remove('calcite-mode-dark', 'calcite-mode-light');
  document.body.classList.add(`calcite-mode-${args.theme}`);
  const el = document.createElement('instant-apps-social-share');
  el.classList.remove('calcite-mode-dark', 'calcite-mode-light');
  el.classList.add(`calcite-mode-${args.theme}`);
  if (args.theme === 'dark') {
    el.shareButtonColor = 'inverse';
  } else {
    el.shareButtonColor = 'neutral';
  }

  el.mode = args.mode;
  el.embed = args.embed;
  el.scale = args.scale;
  el.socialMedia = args.socialMedia;
  el.displayTipText = args.displayTipText;
  el.shareButtonScale = args.shareButtonScale;
  el.shortenShareUrl = args.shortenShareUrl;
  return el;
};

export const Default = Template.bind({});
Default.args = {
  theme: 'light',
  mode: 'inline',
  embed: false,
  scale: 'm',
  shareButtonScale: 'm',
  socialMedia: true,
  displayTipText: true,
  shortenShareUrl: true,
};
