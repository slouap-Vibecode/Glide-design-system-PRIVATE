import { VNode, DirectiveBinding, ObjectDirective } from "vue";
import { DialogTooltipBuilder } from "./base/dialogTooltipBuilder";
import { HTMLElementWithTooltip, getTooltipData } from "./base/htmlElementWithTooltip";

const NckDialogTooltip: ObjectDirective = {
  /**
   * Directive inserted
   * @param triggerElement the element the directive is bound to
   * @param binding the directive binding
   */
  mounted(triggerElement: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    if (!binding?.value?.disable) {
      setTimeout(() => {
        new DialogTooltipBuilder().build(triggerElement as HTMLElementWithTooltip, binding, vnode);
      }, 0);
    }
  },

  /**
   * Directive unbound
   * @param triggerElement the element the directive is bound to
   */
  unmounted(triggerElement: HTMLElement) {
    const tooltipId = triggerElement.getAttribute("data-tooltip-id");
    if (tooltipId) {
      const tooltipElement = document.getElementById(tooltipId);
      if (tooltipElement?.parentNode) {
        tooltipElement.parentNode.removeChild(tooltipElement);
      }
    }
    const data = getTooltipData(triggerElement as HTMLElementWithTooltip);
    data?.tooltipCleanUp?.();
  },
};

export default NckDialogTooltip;
