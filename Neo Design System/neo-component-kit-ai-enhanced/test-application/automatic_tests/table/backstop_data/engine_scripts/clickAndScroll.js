const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let clickSelector = scenario.clickSelector;
  const postInteractionWait = scenario.postInteractionWait;
  await page.click(clickSelector);
  let selector = scenario.scrollSelector;
  let xScroll = scenario.xScroll || 0;
  let yScroll = scenario.yScroll || 0;
  await page.evaluate(
    (selector, xScroll, yScroll) => {
      var element = document.querySelector(selector);
      element.scrollBy(xScroll, yScroll);
    },
    selector,
    xScroll,
    yScroll
  );
  if (postInteractionWait) {
    await setTimeout(postInteractionWait);
  }
};
