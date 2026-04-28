import NckButton from "../../components/nckButton.vue";
import { BaseTooltipBuilder } from "./baseTooltipBuilder";
import { TooltipBuilderData } from "./tooltipBuilderData";
import { Key } from "../../constants/key";
import { AccessibilityHelper } from "../../helpers/accessibilityHelper";
import { setupFloatingUI } from "./floatingUIHelper";
import { DomHelper } from "@/helpers/domHelper";
import { ComponentPublicInstance, DirectiveBinding, createApp, h } from "vue";
import { ButtonColor } from "@/constants/buttonColor";

const ALL_FOCUSABLE_ELEMENTS =
  "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), *[tabindex]:not([tabindex='-1'])";

interface MaybeButtonEvent {
  buttonClicked?: boolean;
}

export class DialogTooltipBuilder extends BaseTooltipBuilder {
  protected readonly BUTTON_CLICKED_EVENT = "tooltip-button-clicked";

  /**
   * Override from base class
   */
  protected setInnerElementContent(data: TooltipBuilderData): void {
    const binding = data.binding;
    const innerElement = data.innerElement;

    // display focus ring on buttons in firefox (TRV3-1383)
    if (data.triggerElement.tagName === "BUTTON") {
      data.triggerElement.classList.add("nck-trigger-moz");
    }

    if (innerElement) {
      if (binding?.value?.content && binding?.value?.buttonLabel) {
        // Content
        const isHtml = binding.modifiers ? !!binding.modifiers.html : false;
        this.setElementContent(innerElement, binding.value.content, isHtml);
        if (binding.value.heading) {
          this.createAndInsertHeadingElement(binding, innerElement);
        }
        data.buttonComponent = this.createButtonComponent(binding);

        innerElement.insertAdjacentElement("beforeend", document.createElement("br"));
        innerElement.insertAdjacentElement("beforeend", data.buttonComponent.$el);
        innerElement.setAttribute("tabindex", "-1"); // For accessibility reasons, make the tooltip programmatically focusable
      } else {
        throw new Error("The dialog tooltip value must be an object with 'content' and 'buttonLabel' properties.");
      }
    }
  }

  /**
   * Override from base class
   */
  protected bindEvents(data: TooltipBuilderData): void {
    const triggerElement = data.triggerElement;
    const tooltipElement = data.tooltipElement;

    if (tooltipElement) {
      const onHide = this.createHideEventCallback(data);
      const onShow = this.createShowEventCallback(data, onHide);
      data.onHideEvent = onHide;
      this.bindKeyboardEvents(triggerElement, data, onHide, onShow);
      this.bindMouseAndScrollEvents(triggerElement, tooltipElement, data, onHide, onShow);
      if (data.buttonComponent) {
        this.bindButtonEvent(data, onHide);
      }
      this.addListenerToCheckTooltipContentBlurred(tooltipElement, triggerElement, data, onHide);
    }
  }

  protected handleAccessibility(data: TooltipBuilderData): void {
    const triggerElement = data.triggerElement;
    const tooltipElement = data.tooltipElement;

    if (tooltipElement) {
      triggerElement.setAttribute("role", "button");
      // Trigger and tooltip are linked for the purpose of being able to unbind the tooltip
      const id = AccessibilityHelper.generateId();
      tooltipElement.id = id;
      triggerElement.setAttribute("data-tooltip-id", id);
      triggerElement.setAttribute("aria-expanded", "false");
      if (data.binding.modifiers.global) {
        triggerElement.setAttribute("aria-controls", tooltipElement.id);
      }
    }
  }

  private manageHidingFromButtonEvent(
    event: Event & MaybeButtonEvent,
    onHide: (event: Event) => void,
    data: TooltipBuilderData,
  ) {
    if (!event) {
      event = new Event("click");
    }
    event.buttonClicked = true;
    onHide(event);
    data.triggerElement.focus();
  }

  private bindButtonEvent(data: TooltipBuilderData, onHide: (event: Event) => void) {
    if (data?.buttonComponent?.$el) {
      data.buttonComponent.$el.addEventListener("click", (event: Event & MaybeButtonEvent) => {
        const buttonClickedEvent = new CustomEvent(this.BUTTON_CLICKED_EVENT, {
          bubbles: true,
          cancelable: true,
        });

        data.triggerElement.dispatchEvent(buttonClickedEvent);

        if (data.binding.value) {
          if (data.binding.value.closeOnButtonClick === false) {
            return;
          }

          this.manageHidingFromButtonEvent(event, onHide, data);
        }
      });
    }
  }

  private addListenerToCheckTooltipContentBlurred(
    tooltipElement: HTMLElement,
    triggerElement: HTMLElement,
    data: TooltipBuilderData,
    onHide: (event: Event) => void,
  ) {
    tooltipElement.addEventListener(
      "keydown",
      (event: Event) => {
        // When we blur an element inside the tooltip, see if we left the tooltip, if so then hide (TRV3-1380)
        if ((event as KeyboardEvent).key === Key.TAB) {
          // so tab or shift+tab
          setTimeout(() => {
            // wait until completion of current tasks then get active element
            let parentTooltip = null;
            const activeElement = DomHelper.getActiveElement();
            if (activeElement) {
              parentTooltip = activeElement.closest(".nck-tooltip-inner");
            }
            if (!parentTooltip) {
              onHide(event);
              // in the case of global tooltips, we need to manually redirect focus
              if (data.binding.modifiers.global) {
                if ((event as KeyboardEvent).shiftKey) {
                  data.triggerElement.focus();
                } else {
                  const nextFocusableElement = this.getNextFocusableElement(triggerElement);
                  if (nextFocusableElement) {
                    nextFocusableElement.focus();
                  } else {
                    // not supposed to happen, fallback case is to focus trigger rather than stay lost at the end of the body
                    data.triggerElement.focus();
                  }
                }
              }
            }
          }, 1);
        }
      },
      true,
    );
  }

  private bindMouseAndScrollEvents(
    triggerElement: HTMLElement,
    tooltipElement: HTMLElement,
    data: TooltipBuilderData,
    onHide: (event: (Event & MaybeButtonEvent) | null) => void,
    onShow: () => void,
  ) {
    const { hoverTooltipEvent, displayTooltipEvent, dismissTooltipEvent, scrollListener } = this.debounceEvents(
      onShow,
      onHide,
    );
    triggerElement.addEventListener("click", onShow);
    triggerElement.addEventListener("mouseover", displayTooltipEvent);
    triggerElement.addEventListener("mouseout", dismissTooltipEvent);
    tooltipElement.addEventListener("mouseover", hoverTooltipEvent);
    tooltipElement.addEventListener("mouseout", dismissTooltipEvent);
    data.scrollListener = scrollListener;
  }

  private createButtonComponent(binding: DirectiveBinding): ComponentPublicInstance {
    const fakeDom = document.createElement("div");
    return createApp({
      render: () => {
        return h(NckButton, {
          label: binding.value.buttonLabel,
          color: ButtonColor.PRIMARY,
        });
      },
    }).mount(fakeDom);
  }

  private bindKeyboardEvents(
    triggerElement: HTMLElement,
    data: TooltipBuilderData,
    onHide: (event: Event) => void,
    onShow: () => void,
  ) {
    const onKeyDownTrigger = this.createKeyDownTriggerEventCallback(onShow);
    const onKeyDownTooltip = this.createKeyDownTooltipEventCallback(data, onHide);
    triggerElement.addEventListener("keydown", onKeyDownTrigger, true);
    document.addEventListener("keydown", onKeyDownTooltip, true);
  }

  private createAndInsertHeadingElement(binding: DirectiveBinding, innerElement: HTMLElement) {
    const headingElement = document.createElement("div");
    headingElement.classList.add("nck-tooltip-heading");
    headingElement.textContent = binding.value.heading;
    innerElement.insertAdjacentElement("afterbegin", headingElement);
  }

  //
  // Events
  //

  /**
   * Create an event method on the trigger, showing the tooltip on ENTER and SPACE
   * @param onShow event called for showing the tooltip
   */
  private createKeyDownTriggerEventCallback(onShow: (event: Event) => void) {
    return (event: Event) => {
      if (this.checkKeyPressed(event as KeyboardEvent, [Key.ENTER, Key.SPACE])) {
        event.preventDefault();
        onShow(event);
      }
    };
  }

  /**
   * Create an event method on the tooltip, allowing it to be dismissable on ESC
   * @param onHide event called for hiding the tooltip
   */
  private createKeyDownTooltipEventCallback(data: TooltipBuilderData, onHide: (event: Event) => void) {
    return (event: Event) => {
      if (this.checkKeyPressed(event as KeyboardEvent, [Key.ESC])) {
        if (data.displayed) {
          data.triggerElement.focus();
        }
        onHide(event);
      }
    };
  }

  private toggleTooltipDisplay(data: TooltipBuilderData, visible: boolean) {
    data.tooltipElement.setAttribute("aria-hidden", visible ? "false" : "true");
    data.tooltipElement.style.display = visible ? "block" : "none";
    data.triggerElement.setAttribute("aria-expanded", visible ? "true" : "false");
  }

  /**
   * create an event method which will have to update the tooltip when it is shown
   * @param data the TooltipBuilderData object gathering trigger, tooltip, etc.
   * @param onHide the event called for hiding the tooltip
   */
  private createShowEventCallback(data: TooltipBuilderData, onHide: (event: Event) => void) {
    return () => {
      if (!data.displayed) {
        // display but don't make it visible yet, to avoid miscalculations
        data.tooltipElement.style.visibility = "hidden";
        this.toggleTooltipDisplay(data, true);
        setupFloatingUI(data, () => {
          data.tooltipElement.style.visibility = "visible";
          data.innerElement.focus();
          data.displayed = true;
        });
        // In the case of global tooltips, create a fake focusable element
        if (data.binding.modifiers.global) {
          this.createFakeFocusableElement();
        }
        // Close the tooltip by clicking anywhere but in the tooltip
        document.addEventListener("click", onHide, true);
        // Start listening to scroll
        if (data.scrollListener) {
          data.scrollListener.start();
        }
        this.dispatchShownEvent(data.triggerElement, data.nodeElement);
      }
    };
  }

  private isClickInsideTooltip(event: Event & MaybeButtonEvent) {
    return (
      !event.buttonClicked &&
      event.target &&
      event.target instanceof HTMLElement &&
      event.target.closest(".nck-tooltip-inner") !== null
    );
  }

  /**
   * Create an event method which will have to update the tooltip when it is hidden
   * @param data the TooltipBuilderData object gathering trigger, tooltip, etc.
   */
  private createHideEventCallback(data: TooltipBuilderData) {
    return (event: (Event & MaybeButtonEvent) | null) => {
      if (data.displayed) {
        // Handle the case of a click on the document
        if (event && event.type === "click") {
          if (this.isClickInsideTooltip(event)) {
            return;
          } else if (data.onHideEvent) {
            // The click was outside the tooltip, remove the listener, and afterwards hide the tooltip
            document.removeEventListener("click", data.onHideEvent, true);
          }
        }
        this.toggleTooltipDisplay(data, false);
        if (data.binding.modifiers.global) {
          this.deleteFakeFocusableElement();
        }
        if (data.scrollListener) {
          data.scrollListener.stop();
        }
        data.displayed = false;
        if (data.tooltipCleanUp) {
          data.tooltipCleanUp();
        }
        this.dispatchHiddenEvent(data.triggerElement, data.nodeElement);
      }
    };
  }

  // Since global tooltips are at the end of the document, we need a workaround for when we tab forward within the
  // tooltip and leave it, to prevent focus from leaving the document. Thus the creation of a fake focusable element.
  private createFakeFocusableElement() {
    let fakeFocusableElement = document.getElementById("fakeFocusable");
    if (!fakeFocusableElement) {
      fakeFocusableElement = document.createElement("span");
      fakeFocusableElement.id = "fakeFocusable";
      fakeFocusableElement.setAttribute("tabindex", "0");
      document.body.appendChild(fakeFocusableElement);
    }
  }

  // The fake focusable element should be removed as soon as possible.
  // It should be there only to catch focus and redirect it.
  private deleteFakeFocusableElement() {
    const fakeFocusableElement = document.getElementById("fakeFocusable");
    if (fakeFocusableElement) {
      document.body.removeChild(fakeFocusableElement);
    }
  }

  // In the case of a global tooltip, we need to compute where focus should land after leaving the tooltip
  private getNextFocusableElement(baseFocusableElement: HTMLElement): HTMLElement | null {
    const focusables = Array.from(document.querySelectorAll(ALL_FOCUSABLE_ELEMENTS));
    focusables.filter((focusable) => {
      return (
        (focusable as HTMLElement).style.display !== "none" && (focusable as HTMLElement).style.visibility !== "hidden"
      );
    });
    let baseElementFound = false;
    for (const focusable of focusables) {
      if (baseElementFound) {
        return focusable as HTMLElement;
      } else if (focusable === baseFocusableElement) {
        baseElementFound = true;
      }
    }
    return null;
  }
}
