The Neo Component Kit can display icons, via the [NckIcon](#nckicon) component. Those icons are not contained within the NCK.

Neo Component Kit is compatible with a single icon set, the [Neo Icon Kit](https://gitlab.kdsneo.kds.com/neo/neo-icon-kit).

You need to install it in your project & import its icon files into your app's static assets directory if you want to use icons.
A utility script is exposed by the Neo Icon Kit to ease this import operation.

- Install the icons in your project

```static
npm i @neotechnologygroup/neo-icon-kit
```

- Implement an automatic import of the list of icons of the neo-icon-kit (currently within the _icons_ folder of the @neotechnologygroup/neo-icon-kit npm package) to the static assets directory of your web application.
It's recommended to execute this import script after installing Neo Icon Kit (postinstall npm step) in the consuming application or before building the consuming application.

The provided utility script exposed by the Neo Icon Kit to ease this import operation can be called using:

```static
npm explore @neotechnologygroup/neo-icon-kit -- npm run copyIcons 'relative path from neo-icon-kit npm package root to asset icons folder'
```
Example:

```static
npm explore @neotechnologygroup/neo-icon-kit -- npm run copyIcons ../../../public/icons
```

- Provide the icons output directory URL within the initialisation options of the Neo Component Kit to allow the NckIcon component to build those icons URLs:
```js static
import { initialize } from "@neotechnologygroup/neo-component-kit";

initialize({
  ...
  urls: {
    iconsURL: "./icons/"
  },
  ...
});
```
