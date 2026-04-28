A toast is composed of a component "_NckToast_" and a service class "_ToastService_".

To create a toast, create a component and set only the NckToast within the template.
Fill the content you need for your toast within the available props of NckToast (please refer to the [documentation of NckToast](#ncktoast)).

To add the toast to the list of toast to display, use "**addToast**" method of "_ToastService_" and pass it the component you have just created. It will instantiate it for you and launch the toast. If there is a toast already displayed, it will wait for the user to dismiss the current toast before displaying the new one.

The only way to dismiss a toast is to close it thanks to its close icon.

"**addToast**" returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). This promise should be resolved when the toast is dismissed.
