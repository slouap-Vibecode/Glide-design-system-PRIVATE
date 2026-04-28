This is a **directive**.

To put a tooltip on any given element (interactive or not), use the directive v-nck-info-tooltip, its value being the tooltip content.
Notice that if the value is a string, it should be between quotes. It can also be an object, please refer to the heading 
examples at the end.

**Tooltip accessibility & usability disclaimer**

> Our current version of the tooltip follows the available [WAI-ARIA guidelines](https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip).
However, those guidelines are not yet finalized and the recommended approach (`aria-describedby` attribute) to tie programmatically the trigger control and the tooltip content is not homogeneously supported accross screen readers. [This W3C article](https://www.w3.org/TR/using-aria/#practical-support-aria-label-aria-labelledby-and-aria-describedby) describes the current state of support of this technique. 
> * When the trigger control is interactive ([good reference here](https://www.tpgi.com/short-note-on-aria-label-aria-labelledby-and-aria-describedby/)), the support is good and homegeneous. Expect tooltip content to be announced as a supplementary trigger description when trigger is focused and nothing mentionned if trigger is not focused. 
> * When the trigger control is static, the content of the tooltip will be read on focus of the trigger only in JAWS and VoiceOver, not in TalkBack and NVDA.

> We decided to stick with this approach despite the limited support of screen readers because we consider both the W3C & Screen reader vendors should finalize their support. We cannot be the ones coping with the current unstable standard definition.

> **It is strongly advised to limit usage of Info Tooltips to supplementary information only, use them parsimoniously and make sure any critical information they may contain can be found at another location of the user interface. These cautions are mentionned in order to ensure better discoverability on all platforms and for all users. Not only disabled users can have difficulties to access tooltip information but also touch platform users. Placing a tooltip on an interactive elements is a no go for touch platform users because the only way to toggle the tooltip is to trigger the interactive behavior of the interactive element since there is no hovering capacities. Info tooltips are still triggered by click today but this behavior is very controversial and maintained to prevent regressions on current features available on touch platforms. Mid-term objective is to remove click/tap support for triggering info tooltips, only keeping focus & hover.**

Below are examples with a div, a span, a button.
As one can see on the first example, the tooltip is centered on the trigger element, not on the text itself.
```js
<div v-nck-info-tooltip="'This tooltip appears above this div'">This trigger is a div</div>
```
```js
<span v-nck-info-tooltip="'This tooltip appears above this span'">This trigger is a span</span>
```
```js
<button v-nck-info-tooltip="'This tooltip appears above this button'">This trigger is a button</button>
```

By default the tooltip appears above its trigger.
It is also possible to have it appear left, right, bottom, or explicitly top.
Just use the corresponding directive modifier.
Note that the tooltip will reposition itself if it cannot fit in the position you defined.

```js
<span v-nck-info-tooltip.left="'This tooltip appears left'">The trigger</span>
```
```js
<span v-nck-info-tooltip.right="'This tooltip appears right'">The trigger</span>
```
```js
<span v-nck-info-tooltip.bottom="'This tooltip appears bottom'">The trigger</span>
```

In the DOM, the tooltip content is created just after the trigger.
In some cases, one may need to append the tooltip content to the body instead.
To achieve that, one has to use the _global_ modifier.
```js
<span v-nck-info-tooltip.global="'Use the dev tools to see where I am'">The trigger</span>
```

When the tooltip content requires some html structure, one has to use the _html_ modifier.

/!\ NOTE /!\\: use with caution. It is __NOT__ advised to use it, and if you do so please santize HTML and avoid as much
as possible to display text coming from users.
```js
<span v-nck-info-tooltip.html="'This <i>tooltip</i> has some <b>html</b> tags'">The trigger</span>
```

It is possible to define a tooltip header.
In that case, one needs to use an object as the directive value, with the _heading_ key.
```js
<span v-nck-info-tooltip="{ heading: 'Heading', content: 'Tooltip content' }">The Trigger</span>
```

The _disable_ key (along with a boolean value) allows a tooltip to be disabled.
```js
<span v-nck-info-tooltip="{ heading: 'Heading', content: 'Tooltip content', disable: true }">The Trigger</span>
```

Two events are triggered while interacting with the info tooltip.
the first one is "tooltip-shown" and is triggered when the tooltip is opened.
The second one is "tooltip-hidden" and is triggered when the tooltip is closed.
It is through these events that the consumer can use callback functions on the parent side.
