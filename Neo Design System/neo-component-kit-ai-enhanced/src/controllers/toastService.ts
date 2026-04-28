import { ComponentPublicInstance, render, createVNode, VNode, Component } from "vue";

export class ToastService {
  private static readonly toastList: Array<{
    toastComponent: Component;
    parent: ComponentPublicInstance;
    props: unknown;
    resolve: () => void;
  }> = [];

  private static toastVisible = false;
  private static dismissToastCallback: (() => void) | null;

  /**
   * Create the toast and add it to the list of toast to append to body
   * @param toastComponent toast component to display
   * @param parent the Vue component that spawns this toast
   * @param props Props to be passed to the VueJS component
   * when this event is emitted
   *
   * @returns A promise that resolves when user dismisses the toast
   */
  public static async addToast(
    toastComponent: Component,
    parent: ComponentPublicInstance,
    props?: object,
  ): Promise<void> {
    return await new Promise((resolve) => {
      if (!parent) {
        throw new Error("Fatal error in NckToast: you need to provide the vueInstance when you initialize the NCK");
      }
      this.toastList.push({ toastComponent, parent, props, resolve });
      this.showToast();
    });
  }

  /**
   * Close the toast by resolving the toast promise
   */
  public static dismissToast() {
    if (this.dismissToastCallback) {
      this.dismissToastCallback();
    }
  }

  private static showToast() {
    if (!this.toastVisible && this.toastList.length > 0) {
      this.toastVisible = true;
      const toastContainerElement = document.createElement("section");

      const ToastConstructor = this.toastList[0].toastComponent;
      const dismissToastCallback = () => {
        this.removeToast(toastContainerElement);
      };

      const props = {
        ...(this.toastList[0].props as object),
        onDismissToast: dismissToastCallback,
      };

      const toastInstance = createVNode(ToastConstructor, props);
      toastInstance.appContext = this.toastList[0].parent.$.appContext;

      this.dismissToastCallback = dismissToastCallback;
      this.appendToast(toastInstance, toastContainerElement);
    }
  }

  private static appendToast(toastInstance: VNode, toastContainerElement: Element) {
    document.body.appendChild(toastContainerElement);
    const toastEl = document.createElement("div");
    toastContainerElement.appendChild(toastEl);
    render(toastInstance, toastEl);
  }

  private static removeToast(toastContainerElement: Element) {
    this.toastList[0].resolve();
    this.toastList.shift();
    this.destroyToast(toastContainerElement);
    if (toastContainerElement.parentNode) {
      toastContainerElement.parentNode.removeChild(toastContainerElement);
    }
    this.toastVisible = false;
    this.dismissToastCallback = null;
    if (this.toastList.length > 0) {
      this.showToast();
    }
  }

  private static destroyToast(containerElem: Element) {
    render(null, containerElem);
    while (containerElem.firstChild) {
      if (containerElem.lastChild) {
        containerElem.removeChild(containerElem.lastChild);
      }
    }
  }
}
