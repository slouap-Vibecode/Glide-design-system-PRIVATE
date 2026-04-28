module.exports = async (page, scenario, vp) => {
  const hoverSelector = scenario.hoverSelector;
  const xPixelToMove = scenario.xPixelToMove || 0;
  const yPixelToMove = scenario.yPixelToMove || 0;
  const elementPosition = await page.evaluate((hoverSelector) => {
    const { x, y } = document.querySelector(hoverSelector).getBoundingClientRect();
    return { x, y };
  }, hoverSelector);
  await page.waitForSelector(hoverSelector);
  await page.hover(hoverSelector);
  await page.mouse.down();
  await page.mouse.move(elementPosition.x + xPixelToMove, elementPosition.y + yPixelToMove);
};