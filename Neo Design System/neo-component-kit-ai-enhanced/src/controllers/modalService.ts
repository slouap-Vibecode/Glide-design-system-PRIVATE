import { INckModal } from "@/components/interfaces/iNckModal";
import { Component, ComponentInternalInstance, ComponentPublicInstance, createApp, h, toHandlers } from "vue";
import NckModalConfirmDismissalModal from "@/components/internal/nckModalConfirmDismissalModal.vue";

export class ModalService {
  private static readonly MODAL_CONTAINER_ID: string = "nckModalContainer";

  private static readonly modals: Array<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    closeModalCallback: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dismissModalCallback: (...args: any[]) => void;
    modalInstance: ComponentPublicInstance;
  }> = [];

  private static escapeListener: (($event: KeyboardEvent) => void) | null;

  private static isConfirmingDismissal = false;

  /**
   * Create the modal and append it to body
   * @param modalComponent modal component to display
   * @param parent the Vue component that spawns this modal
   * @param elementToFocus element to focus when modal is closed
   * @param props Props to be passed to the VueJS component
   * @param eventListeners an object with key as the name of event to listen to and the value as the function to execute
   * when this event is emitted
   *
   * @returns A promise that resolves with an array of the data passed when the modal is closed
   * and rejects with an array of the data passed when the modal is dismissed
   */
  // eslint-disable-next-line max-lines-per-function
  public static async showModal(
    ModalComponent: Component,
    parent: ComponentPublicInstance,
    elementToFocus?: HTMLElement,
    props?: object,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    eventListeners?: Record<string, Function>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any[]> {
    // eslint-disable-next-line max-lines-per-function
    return await new Promise((resolve, reject) => {
      const modalContainerElement = this.retrieveOrCreateModalContainer();
      this.hideAllElementsForScreenReader();
      this.setBodyNonScrollable();
      if (!parent) {
        throw new Error("Fatal error in NckModal: you need to provide the vueInstance when you initialize the NCK");
      }

      const closeModalCallback = (...args: unknown[]) => {
        resolve(args);
        this.destroyModal(getHoistedModalInstance());
        this.focusElementOrBody(elementToFocus);
      };

      const dismissModal = (...args: unknown[]) => {
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        reject(args);
        this.destroyModal(getHoistedModalInstance());
        this.focusElementOrBody(elementToFocus);
      };

      const dismissModalCallback = async (...args: unknown[]) => {
        const hoistedModalInstance = getHoistedModalInstance();
        const confirmDismissal =
          hoistedModalInstance.$.subTree.component?.subTree.component?.exposed?.confirmDismissal?.value ?? false;
        if (!confirmDismissal || (await this.confirmDismissal(hoistedModalInstance, ...args))) {
          dismissModal(...args);
        }
      };

      const eventListenersAsProps = toHandlers(eventListeners ?? {});

      const propsWithEvents = {
        ...props,
        ...eventListenersAsProps,
        onCloseModal: closeModalCallback,
        onDismissModal: dismissModalCallback,
      };

      const modalApp = createApp({
        render() {
          return h(ModalComponent, propsWithEvents);
        },
        provide: {
          // parent app provided values
          ...parent.$.appContext.provides,
          // @ts-expect-error parent component provided values
          ...parent._?.provides,
        },
      });

      // Support for host application's config (errorHandler, globalProperties)
      modalApp._context.config = parent.$.appContext.config;

      // Support for host application's mixins (should be deprecated)
      for (const parentMixin of parent.$.appContext.mixins) {
        modalApp.mixin(parentMixin);
      }

      // #region DANGER ZONE

      /**
       * WELCOME TO THE DANGER ZONE
       *
       * we are hacking with vue internals to reset parent unmount callbacks
       *
       * FIXME Probably a memory leak, as, depending on how many times a modal is opened before its parent is unmounted:
       * - It could lead to an increasing number of nested functions wrapping the unmount hooks.
       * - It could lead to an increasing number of calls to the dismiss callback.
       *
       * Note that is only used to destroy the modal when its parent is unmounted (TRV3-2491).
       */
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      const parentInternalInstance = parent.$ as ComponentInternalInstance & { um: Function[] | Function };
      const originalUnmountHooks = parentInternalInstance.um;

      parentInternalInstance.um = (...args: unknown[]) => {
        // Call the original unmount hooks (if it's an array, execute each hook)
        if (Array.isArray(originalUnmountHooks)) {
          for (const hook of originalUnmountHooks) {
            hook.apply(parent, args);
          }
        } else if (typeof originalUnmountHooks === "function") {
          originalUnmountHooks.apply(parent, args);
        }

        dismissModal();
      };
      // #endregion

      const fragment = document.createDocumentFragment();
      // Temporarily mount the vue app on the fragment
      const modalInstance: ComponentPublicInstance = modalApp.mount(fragment as unknown as Element);
      modalContainerElement.appendChild(fragment);

      function getHoistedModalInstance() {
        return modalInstance;
      }

      this.modals.push({
        closeModalCallback,
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        dismissModalCallback,
        modalInstance,
      });
      this.createEscapeListenerIfNotExisting();
    });
  }

  /**
   * Close the last opened modal following an interaction with an action button from the user conveying its explicit choice,
   * by resolving the modal promise, if the modal is launched.
   * @param args the parameters to pass back to the modal promise
   */
  public static closeLastOpenedModal(...args: unknown[]) {
    if (!this.modals) return;

    const modalIdx = this.modals.length - 1;
    if (modalIdx >= 0) {
      this.modals[modalIdx].closeModalCallback(...args);
    }
  }

  /**
   * Dismiss the last opened modal without any choice from user,
   * by rejecting the modal promise, if the modal is launched
   * @param args the parameters to pass back to the modal promise
   */
  public static dismissLastOpenedModal(...args: unknown[]) {
    if (!this.modals) return;

    const modalIdx = this.modals.length - 1;
    if (modalIdx >= 0) {
      this.modals[modalIdx].dismissModalCallback(...args);
    }
  }

  /**
   * Set the focus at the beginning of the last opened modal.
   * @throws an error if no modal is currently displayed
   */
  public static focusLastOpenedModal() {
    if (!this.modals?.length) {
      throw new Error("Error in ModalService : you tried to focus a modal but none is currently displayed.");
    } else {
      this.focusHiddenElementAtTheBeginningOfLastModal();
    }
  }

  /**
   * Close a specific opened modal following an interaction with an action button from the user conveying its explicit choice,
   * by resolving the modal promise, if the modal is launched.
   * @param modalInstance the instance of the modal to close
   * @param args the parameters to pass back to the modal promise
   */
  public static closeSpecificModal(modalInstance: ComponentPublicInstance, ...args: unknown[]) {
    const modalIdx = this.modals.findIndex((value) => value.modalInstance === modalInstance.$root);
    if (modalIdx >= 0) {
      this.modals[modalIdx].closeModalCallback(...args);
    }
  }

  /**
   * Dismiss a specific opened modal without any choice from user,
   * by rejecting the modal promise, if the modal is launched
   * @param modalInstance the instance of the modal to close
   * @param args the parameters to pass back to the modal promise
   */
  public static dismissSpecificModal(modalInstance: ComponentPublicInstance, ...args: unknown[]) {
    const modalIdx = this.modals.findIndex((value) => value.modalInstance.$root === modalInstance.$root);
    if (modalIdx >= 0) {
      this.modals[modalIdx].dismissModalCallback(...args);
    }
  }

  /**
   * Close the last opened modal following an interaction with an action button from the user conveying its explicit choice,
   * by resolving the modal promise, if the modal is launched.
   * @param args the parameters to pass back to the modal promise
   * @deprecrated
   */
  public static closeModal(...args: unknown[]) {
    this.closeLastOpenedModal(...args);
  }

  /**
   * Dismiss the last opened modal without any choice from user,
   * by rejecting the modal promise, if the modal is launched
   * @param args the parameters to pass back to the modal promise
   * @deprecated
   */
  public static dismissModal(...args: unknown[]) {
    this.dismissLastOpenedModal(...args);
  }

  private static createEscapeListenerIfNotExisting() {
    if (!this.escapeListener) {
      this.escapeListener = ($event: KeyboardEvent) => {
        if ($event.key === "Escape") {
          const lastModalComponent =
            this.modals[this.modals.length - 1].modalInstance.$.subTree.component?.subTree.component;

          const dismissable = lastModalComponent?.exposed?.dismissable?.value ?? true;
          if (dismissable) {
            $event.stopPropagation();
            $event.preventDefault();
            this.dismissLastOpenedModal();
          }
        }
      };
      document.addEventListener("keydown", this.escapeListener);
    }
  }

  private static destroyModal(modalInstance: ComponentPublicInstance) {
    modalInstance.$.appContext.app.unmount();

    const modalIdx = this.modals.findIndex((value) => value.modalInstance === modalInstance);
    if (modalIdx >= 0) {
      this.modals.splice(modalIdx, 1);
    }
    this.showLastModalOrAllElementsForScreenReader();
    if (this.modals.length === 0) {
      this.setBodyScrollable();
      if (this.escapeListener) {
        document.removeEventListener("keydown", this.escapeListener);
      }
      this.escapeListener = null;
    }

    while (modalInstance.$el.firstChild) {
      if (modalInstance.$el.lastChild) {
        modalInstance.$el.removeChild(modalInstance.$el.lastChild);
      }
    }
    if (modalInstance.$el.parentNode) {
      modalInstance.$el.parentNode.removeChild(modalInstance.$el);
    }
  }

  private static existsInDocumentThroughShadowDom(elementToFocus?: HTMLElement) {
    if (elementToFocus) {
      return (
        elementToFocus.getRootNode().contains(elementToFocus) &&
        elementToFocus?.getRootNode({ composed: true }) === document
      );
    }
    return false;
  }

  private static focusHiddenElementAtTheBeginningOfLastModal() {
    if (this.modals?.length > 0) {
      // the NCKModal is a child of the component passed to be displayed as a modal.
      const modal = this.modals[this.modals.length - 1].modalInstance.$.subTree.component?.exposed as INckModal | null;

      if (typeof modal?.focusHiddenElementAtTheBeginning === "function") {
        modal.focusHiddenElementAtTheBeginning();
      }
    }
  }

  private static focusElementOrBody(elementToFocus?: HTMLElement) {
    if (elementToFocus && this.existsInDocumentThroughShadowDom(elementToFocus)) {
      elementToFocus.focus();
    } else {
      if (this.modals.length === 0) {
        document.body.focus();
      } else {
        this.focusHiddenElementAtTheBeginningOfLastModal();
      }
    }
  }

  private static retrieveOrCreateModalContainer() {
    let element = document.getElementById(this.MODAL_CONTAINER_ID);
    if (!element) {
      element = document.createElement("div");
      element.id = this.MODAL_CONTAINER_ID;
      document.body.appendChild(element);
    }
    return element;
  }

  private static hideAllElementsForScreenReader() {
    document.body.childNodes.forEach((node) => {
      if (node instanceof Element) {
        node.setAttribute("aria-hidden", "true");
      }
    });
    const element = document.getElementById(this.MODAL_CONTAINER_ID);
    if (element) {
      element.setAttribute("aria-hidden", "false");
    }
    if (Array.isArray(this.modals)) {
      this.modals.forEach((modalEntry) => {
        modalEntry.modalInstance.$el.setAttribute("aria-hidden", "true");
      });
    }
  }

  private static showLastModalOrAllElementsForScreenReader() {
    if (this.modals.length === 0) {
      document.body.childNodes.forEach((node) => {
        if (node instanceof Element) {
          node.setAttribute("aria-hidden", "false");
        }
      });
      const element = document.getElementById(this.MODAL_CONTAINER_ID);
      if (element) {
        element.setAttribute("aria-hidden", "true");
      }
    } else {
      const lastModalInstance = this.modals[this.modals.length - 1].modalInstance;
      lastModalInstance.$el.setAttribute("aria-hidden", "false");
    }
  }

  private static setBodyNonScrollable() {
    document.body.style.overflow = "hidden";
  }

  private static setBodyScrollable() {
    document.body.style.overflow = "auto";
  }

  private static async confirmDismissal(modalInstance: ComponentPublicInstance, ...args: unknown[]) {
    if (this.isConfirmingDismissal) {
      return false;
    }
    this.isConfirmingDismissal = true;
    const eventOrElement = args[0];
    const elementToFocus =
      eventOrElement instanceof Event && eventOrElement.currentTarget instanceof HTMLElement
        ? eventOrElement.currentTarget
        : eventOrElement instanceof HTMLElement
          ? eventOrElement
          : undefined;

    return await this.showModal(NckModalConfirmDismissalModal, modalInstance, elementToFocus)
      .then(() => true)
      .catch(() => false)
      .finally(() => (this.isConfirmingDismissal = false));
  }
}
