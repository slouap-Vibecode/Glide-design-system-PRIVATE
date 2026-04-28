Handling modals is a bit more complex than other components. It is actually composed of a component "_NckModal_" and a service class "_ModalService_".

To create a modal, create a component and set only the NckModal within the template.
Fill the content you need for your modal within the available slots of NckModal (please refer to the [documentation of NckModal](#nckmodal)).

To launch your modal, use "**showModal**" method of "_ModalService_" and pass it the component you have just created. It will instantiate it for you and launch the modal. "**showModal**" returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). This promise should be resolved when the modal is closed following a user choice, and reject when the modal is dismissed. You will receive an array of the arguments passed to the methods to close or dismiss the modal as arguments.

To actually resolve the promise and close the modal, use the "**closeModal**". Pass any arguments you want to be passed down to the promise resolution.

To reject the promise and close the modal, use the "**rejectModal**". Pass any arguments you want to be passed down to the promise rejection.
