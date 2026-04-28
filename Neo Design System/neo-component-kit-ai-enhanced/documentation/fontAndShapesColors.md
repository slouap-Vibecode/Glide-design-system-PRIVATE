The following color classes should be used to colorize text, backgrounds & borders:

Nota bene: you may encounter situations where the CSS environment imposes a stronger CSS rule wining over the following color rules. In such case, you may be able to overrule the conflicting rule by using the `.nck-style` css class as in: `<p class="nck-style font-color-ink-100">text</p>`

### Font colors
The CSS class follows the pattern: `.font-color-<color>` where `<color>` should be one of the values of the [Colors](#colors) enum but in kebab case (small letters & - instead of _).
```js
<p class="font-color-ink-100">The wizard quickly jinxed the gnomes before they vaporized</p>
<p class="font-color-ink-70">The wizard quickly jinxed the gnomes before they vaporized</p>
<p class="font-color-orange-400">The wizard quickly jinxed the gnomes before they vaporized</p>
<p class="font-color-green-300">The wizard quickly jinxed the gnomes before they vaporized</p>
<p class="font-color-deep-blue-200">The wizard quickly jinxed the gnomes before they vaporized</p>
```

### Background colors
The CSS class follows the pattern: `.background-color-<color>` where `<color>` should be one of the values of the [Colors](#colors) enum but in kebab case (small letters & - instead of _).
```js
<p class="background-color-bright-blue-100">Hello world</p>
<p class="background-color-red-200">Hello world</p>
<p class="background-color-green-300">Hello world</p>

```

### Background hover colors
The CSS class follows the pattern: `.background-color-hover-<color>` where `<color>` should be one of the values of the [Colors](#colors) enum but in kebab case (small letters & - instead of _).
```js
<p class="background-color-hover-bright-blue-100">Hover me!</p>
<p class="background-color-hover-red-200">Hover me!</p>
<p class="background-color-hover-green-300">Hover me!</p>
```

### Border colors
The CSS class follows the pattern: `.border-color-<color>` where `<color>` should be one of the values of the [Colors](#colors) enum but in kebab case (small letters & - instead of _).
```js
<div class="border-color-bright-blue-200" style="border-style: solid; border-width: 0.2rem">Look around me</div>
<div class="border-color-red-200" style="border-style: solid; border-width: 0.2rem">Look around me</div>
<div class="border-color-green-300" style="border-style: solid; border-width: 0.2rem">Look around me</div>
```

### Focus ring colors
2 CSS classes are provided as a base to style focus rings: `.outside-focus` & `.inside-focus`.
```js
<button class="outside-focus">Focus me</button>
<button class="inside-focus">Focus me</button>
```

### Link and button with link aspect
There is a common style for anchor links (and buttons which should look like links) defining various aspects of their style.
```js
<div>
  <a href="javascript:void(0)" class="nck-style nck-link">I link to something</a>
</div>
<div>
  <button class="nck-style nck-button-with-link-aspect">I'm a button and trigger an action but I look like a link</button>
</div>
```
