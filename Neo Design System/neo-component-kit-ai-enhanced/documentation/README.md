# Neo Component Kit - Documentation

The documentation for Neo Component Kit is built with [Vue Styleguidist](https://vue-styleguidist.github.io/).

The global Styleguidist configuration is _styleguide.config.js_, located at project root.

## How to use it?

Simply run from the command line :
+ `npm run doc:build` to build the documentation site,
+ `npm run doc:serve` to serve it (it is then accessible from http://localhost:6060),

## How does it work?

Vue styleguidist reads the components .vue files and extracts the following information :
+ jsdoc for properties,
+ jsdoc for methods,
+ everything inside the `<docs>` tags, written in Markdown, and also defining runnable examples inside backquotes section.
(See [Examples](https://vue-styleguidist.github.io/docs/Documenting.html#usage-examples-and-readme-files))

Vue styleguidist can also reference separate Markdown files from `<docs>` sections.
This will useful for instance when documenting directives, since Vue Styleguidist doesn't provide the same means as it does for components.

## How is structured the documentation source ?

Inside this `documentation` directory, one can find :
+ styleguide: the Vue Styleguidist destination for the generated site (overwritten when rebuilding),
+ assets: a location for the generated site assets, if needed,
+ styles/_documentation-styles.css_: custom css styles for the examples,
+ _initialize.ts_: code needed to initialize our components to make them available to Vue Styleguidist,
+ Markdown files.

## How is it published ?

`npm run doc:publish` does this job. It runs the `publish.js` nodejs script.
This script indicates the remote server ip and user.
The remote server is run by a simple express.js server.
A backup of its configuration file, `server.js` is available in the `server` directory, along with some further information.

## Connecting to the documentation server to start/reboot/stop it

Use your favorite SSH command line to get connected to the documentation server (neo-component-kit.kdsneo.kds.com).
The PM2 (https://www.npmjs.com/package/pm2) process manager runs the documentation app.
Documentation for this process runner is available at https://pm2.keymetrics.io/docs/usage/quick-start/ .
A few useful commands are:

+ List running processes:
`pm2 list`
 
+ Launch the process:
`pm2 start doc-srv`

+ Restart the process:
`pm2 restart doc-srv`
 
+ Stop the process:
`pm2 stop doc-srv`
 
+ Remove the process:
`pm2 delete doc-srv`
 
+ View logs:
`pm2 logs`

## Caveats

+ Paths to assets are not resolved the same way locally and on the remote server. When using a path to an asset, one must not use a leading slash but use a relative path.
+ When a new version of the documentation is published, it currently takes a documentation server reboot before it's available.
