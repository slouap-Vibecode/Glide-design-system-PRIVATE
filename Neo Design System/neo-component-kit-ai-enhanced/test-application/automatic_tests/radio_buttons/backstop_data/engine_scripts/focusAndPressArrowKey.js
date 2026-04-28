

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusSelector;
  const timesKeyPressed = isNaN(scenario.pressKeyXTimes) ? 1 : scenario.pressKeyXTimes;
  const direction = scenario.keyDirection;
  await page.evaluate((selector) => {
    var element = document.querySelector(selector);

    if (element) {
      element.focus();
    }
  }, selector);
  for (let i = 0; i < timesKeyPressed; i++) {
    if (direction === "right") {
      await page.keyboard.press('ArrowRight');
    } else {
      await page.keyboard.press('ArrowLeft');
    }
  }

};