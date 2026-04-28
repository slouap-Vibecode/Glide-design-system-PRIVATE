export class DomHelper {
  /**
   * Focus the next element after the currently focused one,
   * if the focused is in the container element
   * @param containerElement container element to check focus within
   * (allow limiting the checked area to improve performance)
   */
  public static focusNextElement(containerElement: HTMLElement) {
    if (DomHelper.getActiveElement()) {
      const { focusableElements, focusedElementIndex } = this.getFocusableElements(containerElement);
      const realFocusableElements = this.getRealFocusableElementsWithIndex(focusableElements);
      if (focusedElementIndex > -1 && realFocusableElements.length > 0) {
        const focusedElementIndexInRealFocusableElements = realFocusableElements.findIndex(
          (element) => element.index === focusedElementIndex,
        );
        let nextElementWithIndex;
        if (focusedElementIndexInRealFocusableElements > -1) {
          nextElementWithIndex =
            focusedElementIndexInRealFocusableElements + 1 < realFocusableElements.length
              ? realFocusableElements[focusedElementIndexInRealFocusableElements + 1]
              : realFocusableElements[0];
        } else {
          nextElementWithIndex =
            realFocusableElements.find((elementWithIndex) => elementWithIndex.index > focusedElementIndex) ??
            realFocusableElements[0];
        }
        if (nextElementWithIndex) {
          nextElementWithIndex.element.focus();
        }
      }
    }
  }

  /**
   * Focus the previous element after the currently focused one,
   * if the focused is in the container element
   * @param containerElement container element to check focus within
   * (allow limiting the checked area to improve performance)
   */
  public static focusPreviousElement(containerElement: HTMLElement) {
    if (DomHelper.getActiveElement()) {
      const { focusableElements, focusedElementIndex } = this.getFocusableElements(containerElement);
      const realFocusableElements = this.getRealFocusableElementsWithIndex(focusableElements);
      if (focusedElementIndex > -1 && realFocusableElements.length > 0) {
        const focusedElementIndexInRealFocusableElements = realFocusableElements.findIndex(
          (element) => element.index === focusedElementIndex,
        );
        let previousElementWithIndex;
        if (focusedElementIndexInRealFocusableElements > -1) {
          previousElementWithIndex =
            focusedElementIndexInRealFocusableElements - 1 > -1
              ? realFocusableElements[focusedElementIndexInRealFocusableElements - 1]
              : realFocusableElements[realFocusableElements.length - 1];
        } else {
          previousElementWithIndex =
            realFocusableElements.reverse().find((elementWithIndex) => elementWithIndex.index < focusedElementIndex) ??
            realFocusableElements[realFocusableElements.length - 1];
        }
        if (previousElementWithIndex) {
          previousElementWithIndex.element.focus();
        }
      }
    }
  }

  public static getActiveElement(root: Document | ShadowRoot = document): Element | null {
    const activeEl = root.activeElement;

    if (!activeEl) {
      return null;
    }

    if (activeEl.shadowRoot) {
      return this.getActiveElement(activeEl.shadowRoot);
    } else {
      return activeEl;
    }
  }

  /**
   * Get all focusable element, including the current one even if tabindex -1 within the container element
   * @param containerElement the container element to check within
   *
   * @returns object with "focusableElements" property being the list of all focusable elements
   * including the active one if it is in the container
   * and "focusedElementIndex" the index of the active element within this list
   */
  private static getFocusableElements(containerElement: HTMLElement) {
    /* we need to keep tabindex -1 at first as it might be the active element,
    it is then filtered after if it is tabindex -1 and is not active element */
    const focusableSelectors =
      "a[href]:not([disabled]), area[href]:not([disabled]), input:not([disabled]), select:not([disabled]), " +
      "textarea:not([disabled]), button:not([disabled]), *[tabindex]:not([disabled])";
    const focusableElements = Array.prototype.filter.call(
      containerElement.querySelectorAll(focusableSelectors),
      (element: HTMLElement) => {
        // only take elements on screen & the active element and not display:none
        return (
          (element.offsetWidth > 0 ||
            element.offsetHeight > 0 ||
            element === DomHelper.getActiveElement() ||
            element.getAttribute("tabindex") !== "-1") &&
          window.getComputedStyle(element).display !== "none"
        );
      },
    );
    const focusedElementIndex = focusableElements.indexOf(DomHelper.getActiveElement());
    return { focusableElements, focusedElementIndex };
  }

  /**
   * Filter out the elements with class "screenreader-only"
   * @returns an array of object with index and htmlElement as properties
   */
  private static getRealFocusableElementsWithIndex(focusableElements: HTMLElement[]) {
    const realFocusableElementsWithIndex = focusableElements
      .map((element, index) => {
        return {
          index,
          element,
        };
      })
      .filter((focusableElementWithIndex) => {
        return !focusableElementWithIndex.element.classList.contains("screenreader-only");
      });
    return realFocusableElementsWithIndex;
  }
}
