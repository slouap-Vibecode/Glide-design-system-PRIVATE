module.exports = async (page, scenario) => {
  var clickAndHoverSelector = scenario.clickAndHoverSelector;

  if (clickAndHoverSelector) {
    await page.waitForSelector(clickAndHoverSelector);
    await page.click(clickAndHoverSelector);
    await page.hover(clickAndHoverSelector);
  }
};
