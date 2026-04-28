'use strict';

const https = require("https");
const http = require("http");
const express = require('express');
const path = require('path');
const fs = require('fs');

// Constants
const HTTPS_PORT = 8443;
const HTTP_PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

let latestVersion;

// Init static directory for each version
function initDocVersionsRouting() {
  fs.readdir('./static', 'utf8', function (err, files) {
    if (err) throw err;
    files.forEach(versionDir => {
      app.use(`/${versionDir}/`, express.static(path.join(__dirname, `static/${versionDir}`)));
    });
  });
}

function buildVersionListAndFindLatestVersion() {
  return new Promise((resolve, reject) => {
    fs.readdir('./static', 'utf8', function (err, files) {
      if (err) {
        reject(err.message);
      } else {
        var rawHtml = '<h1>Neo Component Kit versions</h1><hr>';
        rawHtml += '<div><a href="/latest">latest</a></div>';
        const sortedVersions = files
          .filter((filename) => /^\d+\.\d+\.\d+$/.test(filename))
          .sort((v1, v2) => {
            const v1Parts = v1.split('.');
            const v2Parts = v2.split('.');
            for (let i = 0 ; i < 3; i++) {
              if (v1Parts[i] !== v2Parts[i]) {
                return v2Parts[i] - v1Parts[i];
              }
            }
            return 0;
          });
        const majorVersionTitlesSet = new Set();
        sortedVersions.forEach(versionDir => {
          const majorVersion = versionDir.split('.')[0];
          if (!majorVersionTitlesSet.has(majorVersion)) {
            if (majorVersionTitlesSet.size > 0) {
              rawHtml += '</ul>';
            }
            rawHtml += `<h2>V${majorVersion}</h2><ul>`;
            majorVersionTitlesSet.add(majorVersion);
          }
          rawHtml += `<li><a href="/${versionDir}/index">${versionDir}</a></li>\n`;
        });

        rawHtml += '</ul>';
        latestVersion = sortedVersions[0];
        resolve(rawHtml);
      }
    });
  });
}

function initDocRouting() {
  // Root page : display a dynamic list of versions
  app.get('/', (req, res) => {
    buildVersionListAndFindLatestVersion()
      .then((rawHTML) => {
        res.type("html");
        res.status(200).send(rawHTML);
      }).catch((error) => {
        res.status(500).send(error);
      })
  });

  // order is important we want to catch latest, before the generic param
  app.get('/latest', (req, res) => {
    res.redirect(`/${latestVersion}/index`);
  });

  // Version pages
  app.get('/:version/index', (req, res) => {
    if (/^\d+\.\d+\.\d+$/.test(req.params.version)) {
      res.sendFile(path.join(__dirname, `static/${req.params.version}/index.html`));
    } else {
      res.sendStatus(404);
    }
  });
}

initDocVersionsRouting();
buildVersionListAndFindLatestVersion();

fs.watch("./static", (event, filename) => {
  initDocVersionsRouting();
  buildVersionListAndFindLatestVersion();
});

initDocRouting();
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "./neo-component-kit.kdsneo.kds.com.key")),
  cert: fs.readFileSync(path.join(__dirname, "./neo-component-kit.kdsneo.kds.com.cer"))
};
const httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(HTTPS_PORT);

http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(HTTP_PORT);
