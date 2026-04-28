module.exports = async (page, scenario, vp) => {
  const selector = scenario.focusSelector;
  await page.waitForSelector(selector);
  await page.focus(selector);
};