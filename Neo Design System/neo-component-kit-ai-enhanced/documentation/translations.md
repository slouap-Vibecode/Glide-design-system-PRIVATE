Because some components contain textual information (whether they are visible or for accessibility technologies such as screenreader) and we are doing an international application, there is a need for translation.

The translations are provided through the "initialize" method of the component kit (see [installation section](#installation) for more detail). This initialization is likely in the main file of your project.

The translations can be of two types: static translations and dynamic translations.

### Static translations
Static translations are the most common. You just define the string it translates into. They are defined under the "translations" key.

For instance
```js static
import { initialize } from "@neotechnologygroup/neo-component-kit";

initialize({
  translations: {
    close: "close",
    error: "Fatal error"
  }
});
```

Those wordings will be shared between the components using them. It means every instance of component will have the
same translation for a given key. This allows to have a translation system not too heavy and uniform accross the application.

Refer to the documentation of the component you are using to see which translation key you are required to provide. Note also that error will be displayed in your browser debugger console if you happen to miss some translation.

![translation description in component](translation-component.png)

### Dynamic translations
Some translations require to have more advanced format with placeholder for some information.
Because the goal of the Neo Component Kit is to be as generic as possible, and to avoid conflicting with other 3rd parties localisation library, the translation with format has to be provided by the consuming application.

To do so, you need to provide a function to the "translateAndFormat" property of the "utils" property of the object passed to the "initialize" function.

This function takes two arguments, the first one is the wording key and the second one is an object of the contextual values for this wording (for instance the number of the page for the pagination).

An exemple with i18n library:
```js static
initialize({
        translations: {
            ...
        },
        utils: {
            translateAndFormat: (wording, parameters) => {
                return window.i18next.t(wording, parameters);
            }
        }
    });
```

It will be indicated in the documentation when a translation will pass through the "translateAndFormat" and the keys of the second argument "parameters" will be described.
