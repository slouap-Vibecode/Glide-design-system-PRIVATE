

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusSelector;
  await page.evaluate((selector) => {
    var element = document.querySelector(selector);

    element.focus();
  }, selector);
};