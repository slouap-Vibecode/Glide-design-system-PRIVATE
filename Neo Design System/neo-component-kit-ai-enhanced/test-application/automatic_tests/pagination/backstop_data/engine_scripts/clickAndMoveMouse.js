module.exports = async (page, scenario, vp) => {
  let selector = scenario.clickSelector;
  const postInteractionWait = scenario.postInteractionWait;
  await page.click(selector);
  await page.mouse.move(0, 0);
  if (postInteractionWait) {
    await page.waitForSelector(postInteractionWait);
  }
};
