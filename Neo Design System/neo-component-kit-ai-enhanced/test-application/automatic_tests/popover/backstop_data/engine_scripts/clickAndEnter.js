

module.exports = async (page, scenario, vp) => {
  let selector = scenario.clickSelector;
  await page.click(selector);
  await page.keyboard.press('Enter');
};