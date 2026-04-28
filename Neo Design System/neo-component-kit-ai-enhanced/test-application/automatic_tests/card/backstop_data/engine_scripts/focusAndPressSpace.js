

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusAndPressSpaceSelector;
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.keyboard.press('Space');
  await require('./puppet/clickAndHoverHelper')(page, scenario);
};