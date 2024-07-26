# Development

## To set up locally, in terminal:

1. `git clone https://github.com/Esri/instant-apps-components.git`

2. `cd packages/instant-apps-components`

3. `npm install`

4. `npm start` (Wait until build is finished.)

5. To run storybook (optional):
   a. Open a separate terminal
   b. `npm run build` (this is to generate the `loader` directory required by Storybook).
   c. `npm run storybook`

## Stencil CLI

You can use the stencil CLI to generate the necessary files for your web component.

1. In terminal, run `npx stencil generate`.

2. Enter the name of your web component with the following naming convention: `instant-apps-[YOUR_COMPONENT_NAME]`.

3. Press `Enter`/`Return`.

4. Since this web component library uses sass, you'll need to update your component's stylesheet file extension. i.e. `src/components/instant-apps-[YOUR_COMPONENT_NAME]/instant-apps-[YOUR_COMPONENT_NAME].css` to `src/components/instant-apps-[YOUR_COMPONENT_NAME]/instant-apps-[YOUR_COMPONENT_NAME].scss`

5. In `src/components/instant-apps-[YOUR_COMPONENT_NAME]/instant-apps-[YOUR_COMPONENT_NAME].tsx`, update the following:

```
@Component({
  tag: 'instant-apps-[YOUR_COMPONENT_NAME]',
  styleUrl: 'instant-apps-[YOUR_COMPONENT_NAME].css', <-- Update to .scss
  shadow: true,
})
```

More info on Stencil's CLI can be found [here](https://stenciljs.com/docs/cli).

## Writing Storybook stories

To include your web component in the storybook UI, create a `.stories.ts` file within your web component's directory i.e. `src/components/instant-apps-[YOUR_COMPONENT_NAME]/instant-apps-[YOUR_COMPONENT_NAME].stories.ts`.

Below is a code snippet example:

```
export default {
  title: 'Components/SocialShare',
  argTypes: {
    mode: {
      options: ['inline', 'popover'],
      control: { type: 'radio' },
    },
    scale: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
    ...
  },
};

const Template = args => {
  const el = document.createElement('instant-apps-social-share');
  el.mode = args.mode;
  el.scale = args.scale;
};

export const Default = Template.bind({});
Default.args = {
  mode: 'inline',
  scale: 'm',
  ...
};

```

More info on how to write stories can be found [here](https://storybook.js.org/docs/web-components/writing-stories/introduction).

Additionally, documenentation on how to provide controls to interact with the arguments of your web component dynamically can be found [here](https://storybook.js.org/docs/web-components/essentials/controls).
