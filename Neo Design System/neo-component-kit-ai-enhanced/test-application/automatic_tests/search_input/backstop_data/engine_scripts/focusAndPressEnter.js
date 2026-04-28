

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusAndPressEnterSelector;
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.keyboard.press('Enter');
};