This is a **directive**.

To put a dialog tooltip on any given element, use the directive v-nck-dialog-tooltip.
Its value is always an object, with mandatory properties 'content' and 'buttonLabel', along with optional property 'heading'.
Below are examples with a div, a span, a button.

**Tooltip accessibility & usability disclaimer**

> Our current version of the dialog tooltip implements the [Disclosure WAI-ARIA pattern guidelines](https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure).

> **The only interactive purpose of the trigger element of a dialog tooltip must be to trigger the appearance of this tooltip. Otherwise, clicking or touching the trigger would both trigger the dialog tooltip display AND the other action. This would cause confusion, display issues and make it impossible to convey clearly what is the real purpose of this interactive control (particularly for accessibility). It cannot be a link to another page, a textbox, a button to trigger an applicative action other than opening the tooltip. A dialog tooltip overrides the semantic role of its trigger with a [button role](https://www.w3.org/TR/wai-aria-1.1/#button)**

The tooltip is centered on the trigger element, not on the text itself.
```js
<div v-nck-dialog-tooltip="{ content: 'This tooltip appears above this div', buttonLabel: 'OK' }">This trigger is a div</div>
```
```js
<span v-nck-dialog-tooltip="{ content: 'This tooltip appears above this span', buttonLabel: 'OK' }">This trigger is a span</span>
```
```js
<button v-nck-dialog-tooltip="{ content: 'This tooltip appears above this button', buttonLabel: 'OK' }">This trigger is a button</button>
```

By default the tooltip appears above its trigger.
It is also possible to have it appear left, right, bottom, or explicitly top.  
Just use the corresponding directive modifier.

```js
<span v-nck-dialog-tooltip.left="{ content: 'This tooltip appears left', buttonLabel: 'OK' }">The trigger</span>
```
```js
<span v-nck-dialog-tooltip.right="{ content: 'This tooltip appears right', buttonLabel: 'OK' }">The trigger</span>
```
```js
<span v-nck-dialog-tooltip.bottom="{ content: 'This tooltip appears bottom', buttonLabel: 'OK' }">The trigger</span>
```

In the DOM, the tooltip content is created just after the trigger.
In some cases, one may need to append the tooltip content to the body instead.
To achieve that, one has to use the _global_ modifier.
```js
<span v-nck-dialog-tooltip.global="{ content: 'Use the dev tools to see where I am', buttonLabel: 'OK' }">The trigger</span>
```

When the tooltip content requires some html structure, one has to use the _html_ modifier.
```js
<span v-nck-dialog-tooltip.html="{ content: 'This <i>tooltip</i> has some <b>html</b> tags', buttonLabel: 'OK' }">The trigger</span>
```

It is possible to define a tooltip header.
In that case, one needs to add the _heading_ property to the directive value.
```js
<span v-nck-dialog-tooltip="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'OK' }">The Trigger</span>
```

By default, clicking on the tooltip button closes the tooltip.
It is possible to set the closing of the tooltip when the button is clicked by using the closeOnButtonClick attribute, as shown in the following examples :
```js
<span v-nck-dialog-tooltip="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'OK', closeOnButtonClick: true }">This tooltip will be closed when the button is clicked</span>
```
```js
<span v-nck-dialog-tooltip="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'OK', closeOnButtonClick: false }">This tooltip won't be closed when the button is clicked</span>
```

Three events are triggered while interacting with the dialog tooltip.
the first one is "tooltip-shown" and is triggered when the tooltip is opened.
```js
function tooltipShownCallback() {
    alert("the event 'tooltip-shown' has been triggered.");
}
<span v-nck-dialog-tooltip="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'OK' }" @tooltip-shown="tooltipShownCallback">The event 'tooltip-shown' will be triggered when this tooltip is shown.</span>
```
The second one is "tooltip-hidden" and is triggered when the tooltip is closed.
```js
function tooltipHiddenCallback() {
    alert("the event 'tooltip-hidden' has been triggered.");
}
<span v-nck-dialog-tooltip="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'OK' }" @tooltip-hidden="tooltipHiddenCallback">The event 'tooltip-hidden' will be triggered when this tooltip is hidden.</span>
```
The third one is "tooltip-button-clicked" and is triggered when the dialog tooltip button is clicked.
```js
function tooltipButtonClickedCallback() {
    alert("the event 'tooltip-button-clicked' has been triggered.");
}
<span v-nck-dialog-tooltip="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'OK' }" @tooltip-button-clicked="tooltipButtonClickedCallback">The event 'tooltip-button-clicked' will be triggered when this tooltip's button is clicked.</span>
```
It is through these events that the consumer can use callback functions on the parent side.