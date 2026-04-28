module.exports = async (page, scenario, vp) => {
  let selector = scenario.clickSelector;
  const timesKeyPressed = isNaN(scenario.pressKeyXTimes)
    ? 1
    : scenario.pressKeyXTimes;
  const direction = scenario.keyDirection;
  await page.waitForSelector(selector);
  await page.click(selector);
  for (let i = 0; i < timesKeyPressed; i++) {
    await page.keyboard.press("s");
  }
};
