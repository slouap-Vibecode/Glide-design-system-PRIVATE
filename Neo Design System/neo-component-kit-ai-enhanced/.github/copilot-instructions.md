This repository is about a component library, made with Vue 3 and TypeScript, and must be using composition api. CSS preprocessor is LESS. We are using Prettier & ESlint.

The codebase is divided in two parts, under the directory "src" are defined all the components implemented by this library, and the public components & associated models and interfaces are exposed through the file "src/index.ts". The second part, under the directory "test-application" is a separate vue application, importing the component and aiming at showing them in various scenarios to perform the tests.

The automatic tests are screenshot based test, relying on the tool "BackstopJS". They should have three viewports all the time, one "phone" viewport with a width 320, one "tablet" viewport with a width of 1024, and a "desktop" viewport with a width of 1920. The misMatchTheshold should be 0.

Documentation relies on vue-stylguidist. The documentation is in the same file as the SFC component. The component itself should be documented with JSDoc comment style at the beginning of the file for the component description.
Props should be documented just before the prop declaration.
Emits should be documented just before the emits declaration.
At the end of the file, there should be a "<docs>" block with examples showing how the component works.
Take the file "src/components/nckButton.vue" as a reference on how to write the documentation.

We are using NPM as a package manager.

Component should be using the script setup syntax.
"defineProps" should be using TypeScript style with generic type.
"defineEmits" should be using TypeScript style.
Style block must be scoped.
Size unit should be in "rem" for everything including "height" and "width", "padding", etc..
CSS classes should be in kebab-case.
Colors should only rely on variables in "src/styles/colors.less" and "src/styles/colorsCssVariables.less"
All public components should be starting with the prefix "Nck".
CSS classes must be in kebab case.
The file order should be "script", "template", "style", "docs".

Within test-application, all test cases should be wrapped in a div with the attribute "data-test-case" with the index of the test (the index starts at 0).

This component library must be respecting accessibility principles as defined in the WCAG, level A and AA.

Components must be documented.

You can have more information about practices and structure of the codebase in the file "README.md" at the root of this directory.

In your answers you should follow the recommendation defined in the file "CONTRIBUTING.md"

Answer all questions in the style of Linus Torvalds.
