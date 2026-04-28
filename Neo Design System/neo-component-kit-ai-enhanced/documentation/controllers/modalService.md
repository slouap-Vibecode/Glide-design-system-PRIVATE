### public static showModal(modalComponent: Component, parent: ComponentPublicInstance, elementToFocus?: HTMLElement, props?: object): Promise<any[]>
Display a modal component in the appropriate container. The first parameter is expected to be a component containing a modal. Please refer to the [guide](#modal-guidelines) on how to handle modals.

**modalComponent (Component)**: the modal component to be displayed

**parent (ComponentPublicInstance)**: the component calling this modal.

**elementToFocus (HTMLElement)**: Element focused when the modal is closed. This is an accessibility requirement to focus an element when the modal is closing. It is usually the element that triggered the modal, or the next element that makes sense in the flow of usage. If none is provided or if element doesn't exist it falls back to focusing the body element.

**props (object)**: the "Props" that will be passed to the modal component.

**eventListeners (object)**: an object with key as the name of event to listen to and the value as the function to execute when this event is emitted

__returns__ A promise that resolves with an array of the data passed when the modal is closed and reject with an array of the data passed when the modal is dismissed

### public static closeLastOpenedModal(...args: any[])
Close the modal following an explicit user choice, by resolving the modal promise, if the modal is launched.

**args**: a list of arguments the parameters to pass back to the modal promise. You use it like that: closeLastOpenedModal(argument1, argument2, argument3). Those arguments will be passed to the promise resolution.

### public static dismissLastOpenedModal(...args: any[])
Dismiss the modal without any choice from user, by rejecting the modal promise, if the modal is launched.

**args**: a list of arguments the parameters to pass back to the modal promise. You use it like that: dismissLastOpenedModal(argument1, argument2, argument3).
Those arguments will be passed to the promise rejection.

### public static focusLastOpenedModal()
Set the focus at the beginning of the last opened modal.
An error is thrown if no modal is currently displayed.

### public static closeSpecificModal(modalInstance: ComponentPublicInstance, ...args: any[])
Close the modal following an explicit user choice, by resolving the modal promise, if the modal is launched.

**modalInstance**: the instance of the modal to dismiss

**args**: a list of arguments the parameters to pass back to the modal promise. You use it like that: closeSpecificModal(myModalComponentInstance, argument1, argument2, argument3). Those arguments will be passed to the promise resolution.

### public static dismissSpecificModal(modalInstance: ComponentPublicInstance, ...args: any[])
Dismiss the modal without any choice from user, by rejecting the modal promise, if the modal is launched.

**modalInstance**: the instance of the modal to dismiss

**args**: a list of arguments the parameters to pass back to the modal promise. You use it like that: dismissSpecificModal(myModalComponentInstance, argument1, argument2, argument3).
Those arguments will be passed to the promise rejection.

### public static closeModal(...args: any[]) /!\ Deprecated /!\
DO NOT USE: replaced by "closeLastOpenedModal". Please refer to "closeLastOpenedModal" documentation as it's the same.

### public static dismissModal(...args: any[]) /!\ Deprecated /!\
DO NOT USE: replaced by "dismissLastOpenedModal". Please refer to "dismissLastOpenedModal" documentation as it's the same.
