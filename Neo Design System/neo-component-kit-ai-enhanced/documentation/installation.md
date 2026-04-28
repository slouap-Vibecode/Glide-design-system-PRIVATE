Neo component Kit (also abbreviated NCK) is a UI component library developped in Vue.JS 2 & TypeScript.

It is hosted on NTG private nexus repository (https://nexus.kdsneo.kds.com/):
* under the package name "@neotechnologygroup/neo-component-kit" starting 6.1.2
* under the package name "neo-component-kit" for versions prior to 6.1.2

The changelog is published under the git repository of the project: https://gitlab.kdsneo.kds.com/neo/neo-component-kit/-/blob/master/CHANGELOG.md

### Integration in your project
First of all, install the library in your project. You need to configure your project so that the
registry is "https://nexus.prod.build.kds.com/repository/npm-group/" (via .npmrc file for instance).

```static
npm i @neotechnologygroup/neo-component-kit
```

Then import the style in your project (the method depends on your project setup)

For instance:
```js static
import '@neotechnologygroup/neo-component-kit/dist/neo-component-kit.css';
```

The Neo Component Kit exposes a method to initialize some of the internal mechanism (for instance translations).

The method is called "initialize"
```js static
import { initialize } from "@neotechnologygroup/neo-component-kit";

initialize({
  translations: {
    ...
  },
  componentOptions: {
    ...
  },
  urls: {
    ...
  },
  utils: {
    ...
  }
});
```

It takes one argument which is the option object. Its TypeScript definition can be found here https://gitlab.kdsneo.kds.com/neo/neo-component-kit/-/blob/master/src/models/iNckGlobalOptions.ts

As of today, options are mostly related to translations & icons root url. They are optional by default and the mandatory character depends on which component you are using. Please refer to the "Prerequisites" section of each component documentation for more details.

Additionally, some components may require configuration options which are more specific. They would be found under the componentOptions key, and documented under their respective component documentation.

Finally, you can import the components along with their models to use them in your project.

For instance:
```js static
import { NckButton, ButtonType, NckTable, ITableColumOptions } from "@neotechnologygroup/neo-component-kit";
```

The Neo Component Kit also exposes an "install" that you can use to register the components & directives globally.
```js static
import Vue from "vue";
import neoComponentKit from "@neotechnologygroup/neo-component-kit";

Vue.use(neoComponentKit, {
  translations: {
    ...
  },
  componentOptions: {
    ...
  },
  urls: {
    ...
  },
  utils: {
    ...
  }
});
```

However this method is not recommended as it hides the dependencies and makes unit test harder to achieve.

### Caveat
The NCK throws some errors in case of misconfigurarion or missing translations, so that developers may easily spot installation or configuration issues.
Please note that the default error display from the browser may be overriden in your project through a custom implementation or a 3rd party.
So in case you have an issue with a component, consult the error where it is configured to be reported.

