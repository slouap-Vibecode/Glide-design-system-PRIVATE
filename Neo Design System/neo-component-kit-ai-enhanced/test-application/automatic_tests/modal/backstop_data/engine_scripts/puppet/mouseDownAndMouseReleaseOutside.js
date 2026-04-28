module.exports = async (page, scenario, vp) => {
    let mouseDownSelector = scenario.mousedownSelector;
    let clickSelector = scenario.clickSelector;
    await page.click(clickSelector);
    await page.hover(mouseDownSelector);
    await page.mouse.down();
    await page.mouse.move(0, 0);
    await page.mouse.up()
  };