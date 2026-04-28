module.exports = async (page, scenario, vp) => {
  const selector = scenario.clickSelector;
  const selectorToWait = scenario.selectorToWait;
  await page.waitForSelector(selector);
  await page.click(selector);
  await page.mouse.click(5, 5);

  if (selectorToWait) {
    await page.waitForSelector(selectorToWait, { visible: true });
  }
};
