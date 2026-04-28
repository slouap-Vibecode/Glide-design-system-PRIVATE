import { AccessibilityHelper } from "../../helpers/accessibilityHelper";
import { BaseTooltipBuilder } from "./baseTooltipBuilder";
import { TooltipBuilderData } from "./tooltipBuilderData";
import { setupFloatingUI } from "./floatingUIHelper";
import { Key } from "../../constants/key";

export class InfoTooltipBuilder extends BaseTooltipBuilder {
  //
  // Creation logic
  //

  /**
   * Override from base class
   */
  protected setInnerElementContent(data: TooltipBuilderData): void {
    const binding = data.binding;
    const innerElement = data.innerElement;

    if (innerElement) {
      if (binding?.value) {
        const isHtml = Boolean(binding.modifiers?.html);
        if (typeof binding.value === "object") {
          // In this case we expect an object like { heading: '...', content: '...' }
          if (binding.value.content) {
            this.setElementContent(innerElement, binding.value.content, isHtml);
          }
          if (binding.value.heading) {
            const headingElement = document.createElement("div");
            headingElement.classList.add("nck-tooltip-heading");
            headingElement.textContent = binding.value.heading;
            innerElement.insertAdjacentElement("afterbegin", headingElement);
          }
        } else if (typeof binding.value === "string") {
          // In this case the tooltip content is just the directive value
          this.setElementContent(innerElement, binding.value, isHtml);
        }
      }
    }
  }

  /**
   * Override from base class
   */
  protected bindEvents(data: TooltipBuilderData): void {
    const triggerElement = data.triggerElement;
    const tooltipElement = data.tooltipElement;

    const onHide = () => this.hideTooltip(data);
    const onShow = () => this.showTooltip(data);

    if (tooltipElement) {
      const { hoverTooltipEvent, displayTooltipEvent, dismissTooltipEvent, scrollListener } = this.debounceEvents(
        onShow,
        onHide,
      );

      // TRV3-913 : the tooltip is always dismissible, it does not depend on what is focused
      document.addEventListener(
        "keydown",
        (event) => {
          this.onKeyDown(event, data);
          scrollListener.stop();
        },
        true,
      );
      triggerElement.addEventListener("mouseover", displayTooltipEvent);
      triggerElement.addEventListener("mouseout", dismissTooltipEvent);
      triggerElement.addEventListener("focus", displayTooltipEvent);
      triggerElement.addEventListener("blur", dismissTooltipEvent);
      // TRV3-1087 : RGAA compliancy, the user can move the mouse onto the tooltip
      tooltipElement.addEventListener("mouseover", hoverTooltipEvent);
      tooltipElement.addEventListener("mouseout", dismissTooltipEvent);
    }
  }

  protected handleAccessibility(data: TooltipBuilderData): void {
    const triggerElement = data.triggerElement;
    const tooltipElement = data.tooltipElement;

    if (tooltipElement) {
      const id = AccessibilityHelper.generateId();
      tooltipElement.id = id;
      // Trigger and tooltip are linked for the purpose of being able to unbind the tooltip
      triggerElement.setAttribute("data-tooltip-id", id);
      triggerElement.setAttribute("aria-describedby", id);
    }
  }

  //
  // Events
  //

  private onKeyDown(event: Event, data: TooltipBuilderData) {
    if (this.checkKeyPressed(event as KeyboardEvent, [Key.ESC])) {
      this.hideTooltip(data);
    }
  }

  /**
   * Create an event method which will have to update the tooltip when it is shown
   * @param data the TooltipBuilderData object gathering trigger, tooltip, etc.
   */
  private showTooltip(data: TooltipBuilderData) {
    if (!data.displayed) {
      setupFloatingUI(data);
      data.displayed = true;
      data.tooltipElement.setAttribute("aria-hidden", "false");
      data.tooltipElement.style.display = "block";
      this.dispatchShownEvent(data.triggerElement, data.nodeElement);
    }
  }

  /**
   * Create an event method which will have to update the tooltip when it is hidden
   * @param data the TooltipBuilderData object gathering trigger, tooltip, etc.
   */
  private hideTooltip(data: TooltipBuilderData) {
    if (data.displayed) {
      data.tooltipElement.setAttribute("aria-hidden", "true");
      data.tooltipElement.style.display = "none";
      if (data.tooltipCleanUp) {
        data.tooltipCleanUp();
      }
      data.displayed = false;
      this.dispatchHiddenEvent(data.triggerElement, data.nodeElement);
    }
  }
}
