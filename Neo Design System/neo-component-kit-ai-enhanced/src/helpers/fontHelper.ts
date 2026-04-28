// may affect performance if called to often: window.getComputedStyle() force style recalc and  will often force layout
const getUserBaseFontSize = () =>
  Number.parseFloat(window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize);

// TODO: find a way to make this variabale reactive (this is set in the browser settings)
export const USER_BASE_FONT_SIZE = getUserBaseFontSize();
export function pxToRemUnit(pxValue: string | number, pxBase = 16): number {
  return parseFloat(pxValue.toString()) / (USER_BASE_FONT_SIZE || pxBase);
}
export function remToPxUnit(remValue: string | number, pxBase = 16): number {
  return parseFloat(remValue.toString()) * (USER_BASE_FONT_SIZE || pxBase);
}
