import { TooltipBuilderData } from "./tooltipBuilderData";
import { computePosition, autoUpdate, offset, flip, shift, arrow, MiddlewareData } from "@floating-ui/dom";
import { PlacementBinding, getOppositePlacement } from "./placementBinding";
import { pxToRemUnit, remToPxUnit } from "@/helpers/fontHelper";

/* Default distances (in rem) affecting style */
const TOOLTIP_TO_TRIGGER_OFFSET = 0.5625;
const TOOLTIP_TO_VIEWPORT_BOUNDARY_OFFSET = 0.5;
const TOOLTIP_BORDER_SIZE = 0.0625;
const ARROW_TO_EDGE_OFFSET = 0.25;
const ARROW_OVERLAY_OFFSET = Math.sqrt(2 * TOOLTIP_BORDER_SIZE ** 2); // Border being at 45°, we need the hypotenuse

/**
 * The entry point for setting up the floating-ui positioning library
 * @param data the TooltipBuilderData object gathering trigger, tooltip, etc.
 * @param afterComputePosition an optional callback when position is updated
 */
function setupFloatingUI(data: TooltipBuilderData, afterUpdatePosition?: () => void) {
  data.tooltipCleanUp = autoUpdate(data.triggerElement, data.tooltipElement, () =>
    updatePosition(data, afterUpdatePosition),
  );
}

/**
 * Method called each time the tooltip position must be computed.
 * This is the core of the floating-ui configuration.
 * @param triggerElement the trigger element
 * @param tooltipElement the tooltip element
 * @param placement the initial placement
 * @param afterComputePosition an optional callback when position is updated
 */
function updatePosition(data: TooltipBuilderData, afterUpdatePosition?: () => void) {
  const arrowElement = data.tooltipElement.querySelector(".nck-tooltip-arrow");
  const arrowOverlayElement = data.tooltipElement.querySelector(".nck-tooltip-arrow-overlay");
  if (arrowElement instanceof HTMLElement && arrowOverlayElement instanceof HTMLElement) {
    computePosition(data.triggerElement, data.tooltipElement, {
      placement: data.placement,
      middleware: [
        offset(remToPxUnit(TOOLTIP_TO_TRIGGER_OFFSET)),
        flip(),
        shift({ crossAxis: true, padding: remToPxUnit(TOOLTIP_TO_VIEWPORT_BOUNDARY_OFFSET) }),
        arrow({ element: arrowElement, padding: remToPxUnit(ARROW_TO_EDGE_OFFSET) }),
      ],
    })
      .then(({ x, y, placement, middlewareData }) => {
        updateTooltipPosition(data.tooltipElement, x, y);
        updateArrowPosition(arrowElement, arrowOverlayElement, placement as PlacementBinding, middlewareData);
        afterUpdatePosition?.();
      })
      .catch(() => {});
  }
}

/**
 * After computation, handle the tooltip style and position
 * @param tooltipElement
 * @param x
 * @param y
 */
function updateTooltipPosition(tooltipElement: HTMLElement, x: number, y: number) {
  Object.assign(tooltipElement.style, {
    left: `${pxToRemUnit(x)}rem`,
    top: `${pxToRemUnit(y)}rem`,
  });
}

/**
 * After computation, handle the tooltip arrow style and position
 * The strategy follows the official doc, check https://floating-ui.com/docs/arrow#visualization
 * @param arrowElement
 * @param arrowOverlayElement this element partly covers the arrow to hide a part of the tooltip border
 * @param placement as defined by the directive, which is more restrictive than the floating-ui placement (no start and end variations)
 * @param middlewareData where we find x and y coords
 */
function updateArrowPosition(
  arrowElement: HTMLElement,
  arrowOverlayElement: HTMLElement,
  placement: PlacementBinding,
  middlewareData: MiddlewareData,
) {
  if (middlewareData.arrow) {
    const staticSide = getOppositePlacement(placement);
    const { x, y } = middlewareData.arrow;
    Object.assign(arrowElement.style, {
      left: x ? `${pxToRemUnit(x)}rem` : "",
      top: y ? `${pxToRemUnit(y)}rem` : "",
      [staticSide]: `${pxToRemUnit(-arrowElement.offsetWidth) / 2}rem`,
    });
    Object.assign(arrowOverlayElement.style, {
      left: x ? `${pxToRemUnit(x)}rem` : "",
      top: y ? `${pxToRemUnit(y)}rem` : "",
      [staticSide]: `${pxToRemUnit(-arrowElement.offsetWidth / 2) + ARROW_OVERLAY_OFFSET}rem`,
    });
  }
}

export { setupFloatingUI };
