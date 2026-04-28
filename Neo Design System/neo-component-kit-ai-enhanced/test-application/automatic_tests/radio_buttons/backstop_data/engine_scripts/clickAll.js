module.exports = async (page, scenario, vp) => {
  let selector = scenario.clickAllSelectors;
  await page.evaluate(selector => {
    var allElements = document.querySelectorAll(selector);

    allElements.forEach(elem => {
      elem.click();
    });
  }, selector);
};
