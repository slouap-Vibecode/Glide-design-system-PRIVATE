# Neo Icon Kit

This kit contains the icons consumed by the Neo applications.

Using the [NckIcon](https://neo-component-kit.kdsneo.kds.com/latest/#nckicon) component of the [**Neo Component Kit**](https://github.com/GBT-NEO/neo-component-kit) is probably the easiest way to display those icons in Vue.js applications and provides a helpful interface to customize icon colors.
However, other uses are possible.

Currently it is used by the Neo application (Vue.JS only) and the **Neo Component Kit**.

## Previewing the icons
The [Neo Icon Explorer page](http://neo-component-kit.kdsneo.kds.com:4444/#/) provides a convenient way to preview the icons of various Neo Icon Kit versions.

## Using the Neo Icon Kit
The Neo Icon Kit is published as an [npm](https://www.npmjs.com/) package to the [internal npm repository](https://nexus.prod.build.kds.com/).

It can be added to the list of npm packages of an application by issuing the command:
<code>npm install @neotechnologygroup/neo-icon-kit</code>

When consuming the Neo Icon Kit with the [Neo Component Kit NckIcon](https://neo-component-kit.kdsneo.kds.com/latest/#nckicon) component, it's necessary to import the icon set into the static assets of the client application. The Neo Icon Kit provides a helpful standard script [copyIcons.js](./helperScripts/copyIcons.js) to achieve this task.
It's recommended to execute this import script after installing Neo Icon Kit in the consuming application or before building the consuming application with:
<code>npm explore @neotechnologygroup/neo-icon-kit -- npm run copyIcons 'relative path from neo-icon-kit npm package root to asset icons folder'></code>
Example:
<code>npm explore @neotechnologygroup/neo-icon-kit -- npm run copyIcons ../../../public/icons</code>

### Preload all icons
In some scenarios (tests, for instance), you may want to prelod all icons. At installation, the package will generate a file containing all icons.

You can import this file like this
<code>import { generateNeoIconsPromiseMap } from "@neotechnologygroup/neo-icon-kit/preloadedIcons";</code>

This file exports a function:

*generateNeoIconsPromiseMap*(prefixPath)

* prefixPath: the prefix for the icon path to be loaded; in case your icons are hosted in a specific path.

## Versioning
This package follows [semver versioning](https://semver.org/).

A quick summary of semver applied to the context of this package;
A semver version follows the pattern X.Y.Z where X, Y and Z are positive integers and:
- X is what we call the major version. It means a change will need to occur in the consumer application in order to use the new version.
For instance, a "1.0.0" and a "2.0.0" are not compatible and any app wishing to switch from one to the other will need
to change how it uses the package.
- Y is what we call the minor version. It means a change, usually an addition, that is compatible with previous version, has been added, no change in the consumer
is needed to install a version with a change in minor version number.
- Z is what we call patch version. It is similar to the minor version, but the change is usually to fix a mistake and not to add something new.

### How do I know how I update the version number
If the change is:
- deleting an existing icon or renaming an existing icon; it is a **major version** increment (the X), because the app will fail if they use the modified icon. As a side note, as those kind of changes forces the consuming application maintainers to perform changes, good practice is to gather breaking changes as most as possible within one version to reduce frequency of changes mentionned before.
- adding a new icon, or changing the look of an existing one; it is a **minor version** (the Y) increment, because we are adding or modifying things but no change is required in the app to integrate the new version
- fixing a glitch in the icon, or adding a viexbow that was missing for instance; it is a **patch version** (the Z) increment, because we are fixing something that was not working so well before, yet no modification is required on the app to change the version

The version is contained in the file _package.json_. To update it, you can either modify by hand, and then push change.
Or you can use the _npm version_ command line. **NOTE: it will depend highly on the flow used (branch or master only), as each of the option will need to be adapted**
The command _npm version_ allows to easily update the version and create the associated git commits and tags to put on the server.
To use it:
- for a major version: _npm version major_
- for a minor version: _npm version minor_
- for a patch version: _npm version patch_

Then after that, just run _git push --tags_ and you should be all set.

## Structure
The structure of this project is the following:
- "icons" directory contains all the svg icons
- "helpherScripts" directory contains a utility script exposed to consuming applications through the npm script _copyIcons_ to ease copying icons from the neo icon kit npm package to the consuming app public/assets directories

## Rules for SVG icons
- All svg icons must have a _viewBox_ property.
- **No** _desc_ or _title_ attributes should be present.
- Icons must have at least one _class="svg-primary-fill"_ to allow icon consumer to customize the main color of the icon. Optionally, another area can have _class="svg-secondary-fill"_ to allow the secondary color of the icon to be overriden.