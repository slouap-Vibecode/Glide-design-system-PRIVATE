import { getPlacement } from "./placementBinding";
import { ScrollListener } from "./scrollListener";
import { Debouncer } from "../../helpers/debouncer";
import { VNode, DirectiveBinding, toHandlerKey, camelize } from "vue";
import { TooltipBuilderData } from "./tooltipBuilderData";
import { HTMLElementWithTooltip, setTooltipData } from "./htmlElementWithTooltip";

const TOOLTIP_TEMPLATE =
  '<div class="nck-tooltip" role="tooltip"><div class="nck-tooltip-arrow"></div><div class="nck-tooltip-arrow-overlay"></div><div class="nck-tooltip-inner"></div></div>';

const DISPLAY_DEBOUNCE_TIME = 300;
const DISMISS_DEBOUNCE_TIME = 50;
export abstract class BaseTooltipBuilder {
  protected readonly SHOW_EVENT = "tooltip-shown";
  protected readonly HIDE_EVENT = "tooltip-hidden";

  //
  // Creation logic
  //

  /**
   * Creates a tooltip next to the trigger element
   * @param triggerElement the trigger element
   * @param binding the initial directive bindings, from which to read one of the placement modifiers
   */
  public build(triggerElement: HTMLElementWithTooltip, binding: DirectiveBinding, vnode: VNode) {
    if (binding.value) {
      const placement = getPlacement(binding);
      const tooltipElement = this.createTooltipElement();
      this.initTooltipElement(tooltipElement);

      // Keep various useful objects under a single 'data' instance
      const innerElement = tooltipElement.getElementsByClassName("nck-tooltip-inner")[0] as HTMLElement;
      const data: TooltipBuilderData = {
        binding,
        placement,
        triggerElement,
        tooltipElement,
        innerElement,
        nodeElement: vnode,
        displayed: false,
      };
      setTooltipData(triggerElement, data);
      this.setInnerElementContent(data);
      this.insertTooltipElement(binding, triggerElement, tooltipElement);
      // Make the element focusable
      const tabIndex = triggerElement.getAttribute("tabindex"); // using attribute instead of property due to IE11 bug
      if (!tabIndex || tabIndex === "-1") {
        triggerElement.setAttribute("tabindex", "0");
      }
      triggerElement.style.cursor = "pointer";
      this.bindEvents(data);
      this.handleAccessibility(data);
    }
  }

  protected createTooltipElement() {
    const fakeElement = document.createElement("div");
    fakeElement.innerHTML = TOOLTIP_TEMPLATE;
    return fakeElement.childNodes[0] as HTMLElement;
  }

  protected initTooltipElement(tooltipElement: HTMLElement): void {
    if (tooltipElement) {
      tooltipElement.style.display = "none";
      tooltipElement.setAttribute("aria-hidden", "true");
    }
  }

  /**
   * Wraps show and hide functions with debounce behavior, returns also an hover event handler
   * @param showFunc the initial, not debounced, show tooltip function
   * @param hideFunc the initial, not debounced, hide tooltip function
   */
  protected debounceEvents(
    showFunc: (event: Event | null) => void,
    hideFunc: (event: Event | null) => void,
  ): {
    hoverTooltipEvent: (event: Event) => void;
    displayTooltipEvent: (event: Event) => void;
    dismissTooltipEvent: (event: Event) => void;
    scrollListener: ScrollListener;
  } {
    const scrollListener = new ScrollListener(() => {
      hideFunc.call(this, null);
    });
    const displayDebouncer = new Debouncer(DISPLAY_DEBOUNCE_TIME);
    const dismissDebouncer = new Debouncer(DISMISS_DEBOUNCE_TIME);

    const hoverTooltipEvent = () => {
      dismissDebouncer.cancelDelay();
    };
    const displayTooltipEvent = (event: Event) => {
      dismissDebouncer.cancelDelay();
      displayDebouncer.delay(() => {
        showFunc.call(this, event);
        scrollListener.start();
      });
    };
    const dismissTooltipEvent = (event: Event) => {
      displayDebouncer.cancelDelay();
      dismissDebouncer.delay(() => {
        hideFunc.call(this, event);
        scrollListener.stop();
      });
    };
    return { hoverTooltipEvent, displayTooltipEvent, dismissTooltipEvent, scrollListener };
  }

  /**
   * Helper method used in createTooltipElement()
   * @param element any element
   * @param value HTML or text content of the tooltip
   * @param isHtml whether to set text or html content
   */
  protected setElementContent(element: HTMLElement, value: string, isHtml: boolean) {
    if (isHtml) {
      element.innerHTML = value;
    } else {
      element.textContent = value;
    }
  }

  /**
   * Helper method used in updateTriggerElement()
   * Gets the tooltip text content, ignoring html
   * @param innerElement the inner tooltip element
   */
  protected getTooltipContent(innerElement: HTMLElement): string {
    return innerElement.textContent ?? "";
  }

  protected checkKeyPressed(kEvent: KeyboardEvent, keys: string[]): boolean {
    if (!(kEvent.ctrlKey || kEvent.altKey || kEvent.shiftKey || kEvent.metaKey)) {
      return keys.some((key) => kEvent.key === key);
    }
    return false;
  }

  protected dispatchShownEvent(triggerElement: HTMLElement, vnode: VNode) {
    this.dispatchEvent(triggerElement, vnode, this.SHOW_EVENT);
  }

  protected dispatchHiddenEvent(triggerElement: HTMLElement, vnode: VNode) {
    this.dispatchEvent(triggerElement, vnode, this.HIDE_EVENT);
  }

  protected abstract setInnerElementContent(data: TooltipBuilderData): void;
  protected abstract bindEvents(data: TooltipBuilderData): void;
  protected abstract handleAccessibility(data: TooltipBuilderData): void;

  private insertTooltipElement(binding: DirectiveBinding, triggerElement: HTMLElement, tooltipElement: HTMLElement) {
    if (binding.modifiers.global) {
      document.body.appendChild(tooltipElement);
    } else {
      triggerElement.insertAdjacentElement("afterend", tooltipElement);
    }
  }

  private dispatchEvent(triggerElement: HTMLElement, vnode: VNode, eventName: string) {
    const eventNameAsProp = toHandlerKey(camelize(eventName));
    const event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
    });

    if (vnode.props && Object.keys(vnode.props).includes(eventNameAsProp)) {
      vnode.props[eventNameAsProp](event);
    } else {
      triggerElement.dispatchEvent(event);
    }
  }
}
