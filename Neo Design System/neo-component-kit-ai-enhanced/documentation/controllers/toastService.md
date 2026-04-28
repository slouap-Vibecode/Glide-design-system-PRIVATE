### public static addToast(toastComponent: Component, parent: ComponentPublicInstance, props?: object): Promise`<void>`
The first parameter is expected to be a component containing a toast. Please refer to the [guide](#toast-guidelines) on how to handle toasts.

**toastComponent (Component)**: the toast component to be displayed.

**parent (ComponentPublicInstance)**: the component calling this toast.

**props (object)**: the "Props" that will be passed to the toast component.

__returns__ A promise that resolves when the toast is dismissed.
