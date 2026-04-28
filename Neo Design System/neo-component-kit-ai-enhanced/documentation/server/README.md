# Neo Component Kit - Documentation - Server

This is just a backup of the Express.js configuration file for the remote server.

## How is it meant to serve documentation files?

When publishing the documentation (`npm run doc:publish`), the current NCK version is retrieved, then :
+ an `index-{version}.html` is created ;
+ a new `{version}` folder is created under the `static` folder, it contains the associated `bundle.js` file ;
+ this version is accessible through the `/{version}` url

## Root URL

The `/` root URL serves a dynamic html snippet listing all the available versions.
