import { TooltipBuilderData } from "./tooltipBuilderData";

const DATA_KEY = "_NCK_TOOLTIP_DATA_";

interface HTMLElementWithTooltip extends HTMLElement {
  [DATA_KEY]: TooltipBuilderData;
}

function getTooltipData(triggerElement: HTMLElementWithTooltip): TooltipBuilderData | undefined {
  return triggerElement[DATA_KEY];
}

function setTooltipData(triggerElement: HTMLElementWithTooltip, data: TooltipBuilderData) {
  triggerElement[DATA_KEY] = data;
}

export { HTMLElementWithTooltip, getTooltipData, setTooltipData };
