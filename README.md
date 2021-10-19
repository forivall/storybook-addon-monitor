# Storybook Addon Monitor

Storybook Addon Monitor can be used to display data received by event handlers in [Storybook](https://storybook.js.org).

[Framework Support](https://storybook.js.org/docs/react/api/frameworks-feature-support)
\- Same as "Actions"

![Screenshot](/docs/screenshot.png)

## Installation

```sh
npm i -D storybook-addon-monitor
```

Then, add following content to [`.storybook/main.js`](https://storybook.js.org/docs/react/configure/overview#configure-your-storybook-project):

```js
module.exports = {
  addons: ['storybook-addon-monitor'],
};
```

## Usage

Like actions, but only shows the last event for each monitor.

Example:
```js
export default {
  title: 'Button',
  argTypes: { onClicks: { monitor: 'clicks' } },
};
```
