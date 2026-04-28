# Neo Component Kit

A component kit based on Vue.js for Neo applications.
Currently developped and maintained by the Pegasus team.

This project aims at providing documented and specified components to use
accross all Neo applications to ease development of new features and ensure
a more coherent user experience. Accessibility of these components must be guaranteed too.
Evolutions are possible and should follow a standard evolution request including story creation down to full QA validation in the [JIRA NCK project](https://kdsjira.atlassian.net/browse/NCK).

## How to use it?

### From NPM

Preferred method is to get it from NPM. It is available on the private NPM repository, [NTG Nexus server](https://nexus.prod.build.kds.com/#browse/browse:npm-hosted:%40neotechnologygroup%2Fneo-component-kit) and the [GBT nexus server](https://repos.gbt.gbtad.com/#browse/browse:ntg-npm:%40neotechnologygroup%2Fneo-component-kit)
under '@neotechnologygroup/neo-component-kit'.

If you have proper configuration to point to NTG NPM repository, simply type
`npm install --save @neotechnologygroup/neo-component-kit`

Component also embeds styling. To include add the following line in your Application entry component.
`import '@neotechnologygroup/neo-component-kit/dist/neo-component-kit.css';`

### With files (not recommended)

You first need to checkout the project and build it locally.
Then include the output files from the library into your project (from 'dist/'
directory).
There is UMD files & CommonJS files, along with a stylesheet, use one of them
base on your needs.
(Neo Travel uses CommonJS file).

Component also embeds styling. To include add the following line in your Application entry component.
`import 'PATH_TO_FILES/neo-component-kit.css';`

## How to build?

At the root of the project repository, run first
`npm run installAndBuild:lib`
to obtain the 3rd party node modules and then run the build. The 'dist' will contain the new output.

You can run
`npm run build`
if you simply want to build.

You can also run
`npm run installAndBuild:testApp`
to build the test application and
`npm run installAndBuild:all` to build both the library and the test application.

## How can I see a demo of the components?

Run
`npm run installBuildAndServe:all`
and it will build the library and then launch
a server with the test application. It will display the URL on which the page is available.

For more information on the test application,
you can refer to the ./test-application/README.md file for instructions

## Where do I get more information?

Documentation is available at http://neo-component-kit.kdsneo.kds.com/

## ChangeLog

Simply read the [Changelog here](CHANGELOG.md)

## Contribution guide

Please refer to [the contribution guide.](CONTRIBUTING.md)

## Tests

To run the test, first build everything to make
sure you test your current version (cf build section). Then close all servers and make sure your port 8080 is not used.
Then run
`npm run test:vrt`.
It will run all the Visual Regression Testing (VRT). They rely on BackstopJS.

## Browser support

The Neo component kit is built to support the browser versions listed [in this file](.browserslistrc). You may support more version but that is up to you to assess your need in term of polyfills or others.
