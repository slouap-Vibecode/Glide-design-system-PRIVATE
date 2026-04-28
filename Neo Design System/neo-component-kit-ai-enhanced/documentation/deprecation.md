The following APIs are deprecated and should not be used for new development. If you happen to work on an area of implementation that relies on deprecated APIs, it would be appropriate to remove it.

In addition to list the deprecated APIs, this guide will aim to provide alternative on how to migrate.

## ModalService/nck-modal
Methods "closeModal" and "dismissModal" are deprecated. Replace them with their
more precisely named counterpart "closeLastOpenedModal" and "dismissLastOpenedModal".
They behave exactly the same.

## nck-badge
- "backgroundColor", "borderColor" and "fontColor" are deprecated. The badge's style is now defined by "color" and "type".
```jsx
<nck-badge label="Hello" />
```

## nck-datepicker-range
The `datepickerTitle` [global translation](#translations) wording is deprecated, `datepickerRangeTitle` should be used instead.

## nck-datepicker-single
The `datepickerTitle` [global translation](#translations) wording is deprecated, `datepickerSingleTitle` should be used instead.
