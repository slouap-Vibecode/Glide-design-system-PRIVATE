module.exports = async (page, scenario, vp) => {
  const selector = scenario.focusAndPressSpaceSelector;
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.keyboard.press('Space');
};