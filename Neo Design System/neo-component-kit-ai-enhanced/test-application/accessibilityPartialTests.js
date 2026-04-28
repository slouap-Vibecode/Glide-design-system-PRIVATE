const { AxePuppeteer } = require("@axe-core/puppeteer");
const puppeteer = require("puppeteer");

async function runAxeTest(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const axeReport = await new AxePuppeteer(page).analyze();

  await page.close();
  await browser.close();

  if (axeReport.violations.length > 0) {
    console.error("Violations found for " + url);
    console.error(JSON.stringify(axeReport.violations, null, 4));
    throw new Error("Violations found for " + url);
  } else {
    console.log(url + " passed with success");
  }
}

async function testAll() {
  const urlsToTest = [
    "http://localhost:8080/#/badge",
    "http://localhost:8080/#/banner",
    "http://localhost:8080/#/breadcrumb",
    "http://localhost:8080/#/button",
    "http://localhost:8080/#/card",
    "http://localhost:8080/#/checkbox",
    "http://localhost:8080/#/chip",
    "http://localhost:8080/#/contentSwitcher",
    "http://localhost:8080/#/counterBadge",
    "http://localhost:8080/#/dialogTooltip",
    "http://localhost:8080/#/dropdown",
    "http://localhost:8080/#/header",
    "http://localhost:8080/#/icon",
    "http://localhost:8080/#/infoTooltip",
    "http://localhost:8080/#/list",
    "http://localhost:8080/#/loader",
    "http://localhost:8080/#/menu",
    "http://localhost:8080/#/modal",
    "http://localhost:8080/#/pagination",
    "http://localhost:8080/#/placeholder",
    "http://localhost:8080/#/radiobuttons",
    "http://localhost:8080/#/recommendedBadge",
    "http://localhost:8080/#/tabs",
    "http://localhost:8080/#/table",
    "http://localhost:8080/#/textArea",
    "http://localhost:8080/#/textInput"
  ];

  try {
    for (let i = 0; i < urlsToTest.length; i++) {
      const url = urlsToTest[i];
      await runAxeTest(url);
    }
    console.log("aXe accessibility tests passed");
  } catch (e) {
    console.error("Some aXe accessibility tests failed");
  }
}

testAll();
