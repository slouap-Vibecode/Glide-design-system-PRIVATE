# Changelog

## 16.0.0

### BREAKING CHANGES

- Progress Indicator component has been removed and is replaced by Timeline component with type "PROGRESS_INDICATOR"

### New features

- Add new Timeline component (https://kdsjira.atlassian.net/browse/NCK-2113)
- Add new mode for content switcher to have content size (instead of full width) on medium and low resolution (https://kdsjira.atlassian.net/browse/NCK-2032)

**Full Changelog**: https://github.com/GBT-NEO/neo-component-kit/compare/15.9.0...16.0.0

## 15.9.0

### New features

- Add capacity to have a counter for content switcher (https://kdsjira.atlassian.net/browse/NCK-2053)
- Add an option to customize the icon for banner (https://kdsjira.atlassian.net/browse/NCK-2071)

**Full Changelog**: https://github.com/GBT-NEO/neo-component-kit/compare/15.8.0...15.9.0

## 15.8.0

### New features

- New component "Progress indicator" (https://kdsjira.atlassian.net/browse/NCK-2082)
- In banner component change button aspect to be more uniform (https://kdsjira.atlassian.net/browse/NCK-1602)
- Add shadow to Drawer component (https://kdsjira.atlassian.net/browse/NCK-1344)
- Display button one below the other on modal for medium and low resolution (https://kdsjira.atlassian.net/browse/NCK-1788)
- Remove No left padding or background for readonly input fields (https://kdsjira.atlassian.net/browse/NCK-2027)
- Add an option for the vertical alignment of the button (https://kdsjira.atlassian.net/browse/NCK-143)

### Fixes

- Fix component name in error message to avoid confusion for banner (https://kdsjira.atlassian.net/browse/NCK-2057)
- For NckAutocomplete in readonly, hide the clear button (https://kdsjira.atlassian.net/browse/NCK-1959)
- Fix styling confirm dismissal modal component (https://kdsjira.atlassian.net/browse/NCK-2115)
- Fix display issue computing tabs size when container is appended to DOM but not displayed right away (https://kdsjira.atlassian.net/browse/NCK-2116)

**Full Changelog**: https://github.com/GBT-NEO/neo-component-kit/compare/15.7.0...15.8.0

## 15.7.0

### New Features

- NckDatePickerRange now accepts two slots, one before the start date "start-date-leading-content", and one before the end date "end-date-leading-content" (https://kdsjira.atlassian.net/browse/NCK-2044)

## 15.6.0

### New Features

- NckHeader now accepts a slot for title (https://kdsjira.atlassian.net/browse/NCK-2041)

### Fixes

- Fix NckBadge props validation when ariaRole is not set on clickable badge (https://kdsjira.atlassian.net/browse/NCK-2029)
- Expose datepickers components in the "install" function of the NCK (https://kdsjira.atlassian.net/browse/NCK-2047)
- Bring back UMD builds (https://kdsjira.atlassian.net/browse/NCK-2048)

## 15.5.0

### New features

- New color variant \*-150 added for all colors (https://kdsjira.atlassian.net/browse/NCK-1966)
- Add new position for drawer component (https://kdsjira.atlassian.net/browse/NCK-1808)
- Add trailing icon on badge and allow it to be clickable with either role "button" or "link" (https://kdsjira.atlassian.net/browse/NCK-1893)
- 3rd party dependencies have been upgraded to more recent versions (https://kdsjira.atlassian.net/browse/NCK-2011)
- Add capacity to have a leading icon for content switcher (https://kdsjira.atlassian.net/browse/NCK-1981)
- Change hover aspect of the content switcher (https://kdsjira.atlassian.net/browse/NCK-1992)
- Add radius border variant for the List (https://kdsjira.atlassian.net/browse/NCK-1038)

### Fixes

- Fix wrapping issue on long word for table component (https://kdsjira.atlassian.net/browse/NCK-1975)
- Fix typings issues and introduce proper generic type for Autocomplete, List, Menu & Table (https://kdsjira.atlassian.net/browse/NCK-1962)
- Text area height stops being wrongly recomputed ignoring user height changed after a re-rendering by Vue (https://kdsjira.atlassian.net/browse/NCK-1991)

## 15.4.0

### New feature

- Added a footer option to Table, allowing Pagination to be included into Table (https://kdsjira.atlassian.net/browse/NCK-1955)

### Fixes

- Fix modal unexpected vertical scrollbar when containing screen reader only elements (https://kdsjira.atlassian.net/browse/NCK-1756)

## 15.3.0

### New feature

- Added required option to Checkbox (https://kdsjira.atlassian.net/browse/NCK-354)
- Component type definitions are now provided (https://kdsjira.atlassian.net/browse/NCK-1921). **WARNING**: this change provides components types definitions in `<template>` tag. It may impact your app and require changes if you are using already using vue-tsc by revealing preexisting typing problems.
- New design for Content Switcher (https://kdsjira.atlassian.net/browse/NCK-1888)

### Fixes

- Eased last time options selection on DatePicker on touch devices when virtual keyboard is shown (https://kdsjira.atlassian.net/browse/NCK-1933)

## 15.2.0

### New feature

- Add option to remove radius on banner component (https://kdsjira.atlassian.net/browse/NCK-1839)

### Fixes

- Fixes a wrongly reported error on banner (https://kdsjira.atlassian.net/browse/NCK-1831)

### Miscellaneous

- Update neo icon kit compatibility range to be compatible with 5.X (https://kdsjira.atlassian.net/browse/NCK-1920)

**Full Changelog**: https://github.com/GBT-NEO/neo-component-kit/compare/15.1.0...15.2.0

## 15.1.0

### Changes

- Enlarged Radio Buttons at Small & Medium resolutions (https://kdsjira.atlassian.net/browse/NCK-19)
- Added capacity to specify Button type (submit or button) (https://kdsjira.atlassian.net/browse/NCK-516)
- Increased Table border radius (https://kdsjira.atlassian.net/browse/NCK-1809)

### Fixes

- Both dates were cleared after focusing a date input and selecting a date in the calendar of a range DatePicker (https://kdsjira.atlassian.net/browse/NCK-1821)
- Confirm dismissal modal was erroneously shown when its parent Modal component was unmounted (https://kdsjira.atlassian.net/browse/NCK-1840)
- Modal was crashing at creation time in certain conditions (https://kdsjira.atlassian.net/browse/NCK-1843)
- Focusing the first invalid field of a Form was not working when the displayed input fields had changed since the initial Form display (https://kdsjira.atlassian.net/browse/NCK-1857 & https://kdsjira.atlassian.net/browse/NCK-1858)
- Time coherence validation error message remained displayed after fixing a time coherence problem on a range DateTimePicker at small and medium resolutions (https://kdsjira.atlassian.net/browse/NCK-1859)

## 15.0.1

### Fixes

- Fix issues breaking confirmation modal (https://kdsjira.atlassian.net/browse/NCK-1821)
- Prevent date pickers (range & simple) to submit form when they are validating (https://kdsjira.atlassian.net/browse/NCK-1822)
- Set properly attributes on NckTextInput on the root element (https://kdsjira.atlassian.net/browse/NCK-1823)
- Properly apply error handler on modal (https://kdsjira.atlassian.net/browse/NCK-1824)
- Fix warning when clicking on a NckTable row (https://kdsjira.atlassian.net/browse/NCK-1829)
- Fix signature issue on ToastService (https://kdsjira.atlassian.net/browse/NCK-1830)

## 15.0.0

### BREAKING CHANGES

- NCK is now running on vue@3, pease follow the [official migration guide](https://v3-migration.vuejs.org/breaking-changes/).
  - all `value` props becomes `modelValue`
  - all `input` event from component becomes `update:modelValue`
  - affected components:
    - NckCheckbox
    - NckChipPopover
    - NckContentSwitcher
    - NckDatepickerRange
    - NckDatepickerSingle
    - NckDropdown
    - NckPhoneNumberInput
    - NckRadiosButtons
    - NckSearchInput
    - NckSlider
    - NckSwitch
    - NckTextArea
    - NckTextInput
    - NckToggleChipGroup

- Removed `eventListeners` parameter from `ToastService.addToast`
- `parent` parameter in `ToastService.addToast` changed signature from `Vue` to `ComponentPublicInstance` (see toastService.md).
- `parent` parameter in `ModalService.showModal` changed signature from `Vue` to `ComponentPublicInstance` (see modalService.md).

## 14.6.0

### New features

- Allowed localization of `NckDatePickerRange` and `NckDatePickerSingle` expected date format using optional `dateFormatWording` (https://kdsjira.atlassian.net/browse/NCK-1762)

### Fixes

- Fixed `NckChipPopover`'s Popover overlap by Buttons and Inputs when using `ignoreParentOverflow` option (https://kdsjira.atlassian.net/browse/NCK-1800)
- Fixed `NckChipPopover`'s Popover disrepect of popoverSize and menuPosition when using `ignoreParentOverflow` option (https://kdsjira.atlassian.net/browse/NCK-1805)

## 14.5.0

### New features

- Added ignoreParentOverflow option to Chip Popover component (https://kdsjira.atlassian.net/browse/NCK-1799)

## 14.4.1

### Fixes

- Fix color of borders for Modal component (https://kdsjira.atlassian.net/browse/NCK-1795)

## 14.4.0

### New features

- Add `NckSearchInput` component (https://kdsjira.atlassian.net/browse/NCK-1755)
- Allow a variation of the `NckTextInput` component without label (https://kdsjira.atlassian.net/browse/NCK-815)
- Add a placeholder to the `NckTextInput` component without label (https://kdsjira.atlassian.net/browse/NCK-1789)
- Enable confirmation of `NckModal` component's dismissal to prevent the user from losing information (https://kdsjira.atlassian.net/browse/NCK-1734)
- Allow the `NckSwitch` component's label to be displayed on the left (https://kdsjira.atlassian.net/browse/NCK-1758)

### Changes

- Improved accessibility and appearance of the `NckModal` component's dismiss button (https://kdsjira.atlassian.net/browse/NCK-1606)

## 14.3.0

### New features

- Allow setting any of the Breadcrumb component steps as active (https://kdsjira.atlassian.net/browse/NCK-1647)

### Fixes

- Fixed outlined Button component height (https://kdsjira.atlassian.net/browse/NCK-279)
- Fixed Button sizes at small & medium resolutions (https://kdsjira.atlassian.net/browse/NCK-1735)

## 14.2.0

### New features

- Exposed a method for focusing a modal (https://kdsjira.atlassian.net/browse/NCK-1724)

### Fixes

- Fixed Button paddings at small & medium resolution (https://kdsjira.atlassian.net/browse/NCK-1596)
- Fixed .screenreader-only CSS class bug in Safari and exposed it for client app consumption (https://kdsjira.atlassian.net/browse/NCK-1722)

## 14.1.0

### New features

- Add new status 'cancel' for status indicator (https://kdsjira.atlassian.net/browse/NCK-1717)

### Fixes

- Prevent failure when trying to close modal even if none was opened (https://kdsjira.atlassian.net/browse/NCK-1718)
- Custom rules in date pickers now correctly take time into consideration (https://kdsjira.atlassian.net/browse/NCK-1710)

## 14.0.0

### BREAKING CHANGES

- DatePickerRange and DatePickerSingle components now require several new global options & wordings, new instance-specific props and the specification for a global wording has changed. For details, please refer to [the migration guide](https://neo-component-kit.kdsneo.kds.com/latest#migration-guide) (https://kdsjira.atlassian.net/browse/NCK-1582)
- Neo Component Kit now requires a version of the peer dependency of Neo Icon Kit `@neotechnologygroup/neo-icon-kit` above or equal [version 4.0.0](https://gitlab.kdsneo.kds.com/neo/neo-icon-kit/-/releases/4.0.0) to be referenced in the consuming application. For details, please refer to [the migration guide](https://neo-component-kit.kdsneo.kds.com/latest#migration-guide) (https://kdsjira.atlassian.net/browse/NCK-1714)

### Deprecation

- The `datepickerTitle` [global translation](#translations) wording is deprecated, `datepickerRangeTitle` should be used instead for DatePickerRange and `datepickerSingleTitle` should be used instead for DatePickerSingle. More details in [the deprecation guide](https://neo-component-kit.kdsneo.kds.com/latest#deprecation)

### New features

- DatePickerRange and DatePickerSingle components now allow users to manually input time. This comes in addition to the pre-existing possibility to choose time among a preset list of predefined discrete time & time range values (https://kdsjira.atlassian.net/browse/NCK-1582)
- DatePickerRange and DatePickerSingle now expose distinct props for defining the low resolution date picking modal page heading: `datepickerRangeTitle` & `datepickerSingleTitle` (https://kdsjira.atlassian.net/browse/NCK-1525)

### Fixes

- Fixed a validation timing problem with required Autocomplete components briefly showing an invalid validation state, sometimes leading to autocomplete proposal selection failure (https://kdsjira.atlassian.net/browse/NCK-1021)

## 13.5.0

### New features

- Allow customizing height of the result container in autocomplete (https://kdsjira.atlassian.net/browse/NCK-642)
- Update support for Safari to 14.1 and iOS to 14.5 (https://kdsjira.atlassian.net/browse/NCK-1655)
- Add Phone input component (https://kdsjira.atlassian.net/browse/NCK-1510)
- Add option to make the header sticky for flat autocomplete (https://kdsjira.atlassian.net/browse/NCK-1634)
- Update 3rd party dependencies to more recent version (https://kdsjira.atlassian.net/browse/NCK-1547)

### Fixes

- Fix dropdown semantic for screenreaders (https://kdsjira.atlassian.net/browse/NCK-1632)

## 13.4.0

### New features

- Update style of banner (https://kdsjira.atlassian.net/browse/NCK-244)
- Add ability to programmatically focus chip popover (https://kdsjira.atlassian.net/browse/NCK-1563)
- Change the asterisk symbolizing mandatoriness of a field to red color (https://kdsjira.atlassian.net/browse/NCK-1363)
- Content switcher is now full width on lower resolutions (https://kdsjira.atlassian.net/browse/NCK-606)

### Changes

- Drop official support for NodeJS v18 and move to NodeJS v20 (https://kdsjira.atlassian.net/browse/NCK-1573)

## 13.3.1

### Fixes

- Fix check on "chip-cleared" event in Chip component (https://kdsjira.atlassian.net/browse/NCK-1543)

## 13.3.0

### Fixes

- Drawer shadows now appear (https://kdsjira.atlassian.net/browse/NCK-1342)
- Fixed a crash preventing date & time selection when withTime, minDateAllowed and/or maxDateAllowed are true

### Changes

- Drawer now appears & disappears with a sliding effect (https://kdsjira.atlassian.net/browse/NCK-1299)

## 13.2.0

### New features

- Add `NckToggleChipGroup` component (https://kdsjira.atlassian.net/browse/NCK-1421, https://kdsjira.atlassian.net/browse/NCK-1529)
- Add `resetValidation` public method in NckForm (https://kdsjira.atlassian.net/browse/NCK-1522)

### Fixes

- Fix error in `NckDatepickerRange` when settings date and times with timeRanges for the first time (https://kdsjira.atlassian.net/browse/NCK-1527)

### Changes

- Invalid `NckChip` icon color change from `red-300` to `blue-grey-600` (https://kdsjira.atlassian.net/browse/NCK-1421)

## 13.1.0

### New features

- Add size for counter badge (https://kdsjira.atlassian.net/browse/NCK-1475)
- Add ability to have a counter badge on button (https://kdsjira.atlassian.net/browse/NCK-1476)
- Add role for modal component (https://kdsjira.atlassian.net/browse/NCK-868)
- Add the ability to make the modal non-dismissable (https://kdsjira.atlassian.net/browse/NCK-868)
- Add option to have an icon on date picker (range & single) (https://kdsjira.atlassian.net/browse/NCK-1179)

### Fixes

- Fix a JavaScript error occuring sometimes on Tab when resizing (https://kdsjira.atlassian.net/browse/NCK-1416)
- Fix reactive issue on Chip & Chip Popover component regarding "clear-chip" event (https://kdsjira.atlassian.net/browse/NCK-1521)

## 13.0.0

### BREAKING CHANGES

- Header title horizontal alignment is now always left aligned at Large resolution and centered at Small & Medium resolutions. The titlePosition property is removed. For more details, please refer to [the migration guide](https://neo-component-kit.kdsneo.kds.com/latest#migration-guide) (https://kdsjira.atlassian.net/browse/NCK-1328)
- DatePickerRange and DatePickerSingle now require a new global translation wording dateFormatExplanationWording. For more details, please refer to [the migration guide](https://neo-component-kit.kdsneo.kds.com/latest#migration-guide) (https://kdsjira.atlassian.net/browse/NCK-604)

### New features

- Text Input, Text Area & Form autocomplete and Text Input & Text Area inputmode attributes can now be specified for better user experience (https://kdsjira.atlassian.net/browse/NCK-60)
- Toast can now host an action Button (https://kdsjira.atlassian.net/browse/NCK-499)
- DatePicker (Range & Single) now offers the capacity to select an exact time or time range (https://kdsjira.atlassian.net/browse/NCK-604)
- A new .nck-button-with-link-aspect CSS class is now exposed to style native html buttons as links visually speaking (but keeping their expected button semantic for accessibility) in consuming applications (https://kdsjira.atlassian.net/browse/NCK-1395)
- Dropdown now accepts custom validation rules (https://kdsjira.atlassian.net/browse/NCK-604 & https://kdsjira.atlassian.net/browse/NCK-1415)

### Changes

- Button has no minimal width anymore (https://kdsjira.atlassian.net/browse/NCK-1393)
- Floating Button elevation was modified to make it better stand out on light backgrounds (https://kdsjira.atlassian.net/browse/NCK-1408)
- Icon only Button now has a square rather than rectangle shape (https://kdsjira.atlassian.net/browse/NCK-1445)
- Button size now varies depending on screen resolution and is generall one size bigger at Small & Medium resolutions (https://kdsjira.atlassian.net/browse/NCK-1446)

### Fixes

- Fixed wrong vertical spacing between Dropdown trigger button and popover menu for top positionned popovers and label outside variants (https://kdsjira.atlassian.net/browse/NCK-1427)
- Fixed several missing or broken visual animations (https://kdsjira.atlassian.net/browse/NCK-1449 & https://kdsjira.atlassian.net/browse/NCK-1485)
- Removed unintended top spacing on Badge (https://kdsjira.atlassian.net/browse/NCK-1450)
- Fixed invalid usage of an aria-label attribute on List warning sign not having any role triggering accessibility validation errors (https://kdsjira.atlassian.net/browse/NCK-1453)

## 12.5.0

### New features

- Added capacity to set a Type to Toast component (Success, Warning...) (https://kdsjira.atlassian.net/browse/NCK-1389)
- Exposed CSS variables (colors, radiuses, typography,...) to NCK consuming apps (https://kdsjira.atlassian.net/browse/NCK-1280)
- Added new text style: text M bold (https://kdsjira.atlassian.net/browse/NCK-1166)

### Fixes

- Fixed absence of visible focus on RadioButtons with Chip display (https://kdsjira.atlassian.net/browse/NCK-1352)
- Fixed incapacity to display Modal & Toast components using script setup vue.js syntax (https://kdsjira.atlassian.net/browse/NCK-1354)
- Fixed incorrect Table Header text alignment (https://kdsjira.atlassian.net/browse/NCK-1392)
- Fixed incorrect display of several components at specific resolutions and screen zoom level (https://kdsjira.atlassian.net/browse/NCK-1423)

## 12.4.0

### New features

- Add ability to have a right icon on the button (https://kdsjira.atlassian.net/browse/NCK-448)

## 12.3.0

### New features

- Add ability to put the label outside from Text input and Dropdown (https://kdsjira.atlassian.net/browse/NCK-1200)
- Modify Pagination with Dropdown to have the label outside (https://kdsjira.atlassian.net/browse/NCK-1224)
- Add ability to add custom content on the header on the right (https://kdsjira.atlassian.net/browse/NCK-1340)

### Fixes

- Slider component correctly updates when range or step values are updated (https://kdsjira.atlassian.net/browse/NCK-1355)

## 12.2.0

### New features

- Add new option on Card to be fullscreen on lower resolution (https://kdsjira.atlassian.net/browse/NCK-1160)
- Add Drawer component (https://kdsjira.atlassian.net/browse/NCK-1147)
- Update design of modal header and footer and add ability to add an action on lower resolutions (https://kdsjira.atlassian.net/browse/NCK-1286)
- Add menu position in pagination (https://kdsjira.atlassian.net/browse/NCK-1347)

### Fixes

- Prevent error when dismissing last opened modal but none is opened (https://kdsjira.atlassian.net/browse/NCK-1353)
- Fix an issue where the focus displayed on the menu even though menu was not focused (https://kdsjira.atlassian.net/browse/NCK-1326)

## 12.1.1

### Fixes

- Fix popoverSize property support in Chip Popover component to allow Popover width to overflow trigger Chip width (https://kdsjira.atlassian.net/browse/NCK-1256)
- Allow focusing interactive sub controls in Shadow DOM wrapped Popovers (and components instantiating Popovers) without immediately closing Popover (https://kdsjira.atlassian.net/browse/NCK-1329)

## 12.1.0

### New features

- Created Status Indicator component (https://kdsjira.atlassian.net/browse/NCK-1185)
- Added possibility to choose number of items per page in Pagination component impacting general component layout in such case (https://kdsjira.atlassian.net/browse/NCK-1192)
- Added possibility to choose background color & frame aspect for Card component (https://kdsjira.atlassian.net/browse/NCK-1023)
- Added new Chip-based version of Radio Button component (https://kdsjira.atlassian.net/browse/NCK-1119)
- Added capacity to choose position of Popover relative to triggering Chip for Chip Popover components (https://kdsjira.atlassian.net/browse/NCK-1221)

### Changes

- DatePickers will now perform input validation & submit dates when clicking outside of DatePicker's Popover instead of ignoring new values (https://kdsjira.atlassian.net/browse/NCK-1183)

### Fixes

- Slider now respects programmatically set value (https://kdsjira.atlassian.net/browse/NCK-1296)
- Range DatePicker documentation had partially disappeared (https://kdsjira.atlassian.net/browse/NCK-1317)

## 12.0.0

### BREAKING CHANGES

- NckDatepicker component has been renamed to NckDatepickerRange (https://kdsjira.atlassian.net/browse/NCK-996)
- In NckDatepickerRange (older NckDatepicker), renamed "validRangeStartDate" to "minDateAllowed"; renamed "validRangeEndDate" to "maxDateAllowed"; renamed "beforeValidRangeErrorMessage" to "beforeMinDateErrorMessage"; renamed "afterValidRangeErrorMessage" to "afterMaxDateErrorMessage"; and the v-model does not accept undefined values anymore. (https://kdsjira.atlassian.net/browse/NCK-996)

### New features

- Add linear display for loader (https://kdsjira.atlassian.net/browse/NCK-1170)
- Add divider option in Menu component (https://kdsjira.atlassian.net/browse/NCK-1141)
- Add single date picker (https://kdsjira.atlassian.net/browse/NCK-996)

### Fixes

- Fix an issue when ChipPopover is used within ShadowDOM (https://kdsjira.atlassian.net/browse/NCK-1161)
- Properly display focus when using high constrast display (https://kdsjira.atlassian.net/browse/NCK-1181)
- Properly focus trigger of popover when closing (https://kdsjira.atlassian.net/browse/NCK-1269)
- Fix display of modal header (https://kdsjira.atlassian.net/browse/NCK-1218)
- Move focus inside popover when opened in Chip Popover(https://kdsjira.atlassian.net/browse/NCK-1268)

## 11.4.0

### New features

- Autocomplete with manual selection can now accept arbitrary user input as a valid value (https://kdsjira.atlassian.net/browse/NCK-1093)
- Badge can now display a leading icon (https://kdsjira.atlassian.net/browse/NCK-651)

### Fixes

- Popover close button display fixes (https://kdsjira.atlassian.net/browse/NCK-641)
- Improved Icon rendering performances (https://kdsjira.atlassian.net/browse/NCK-1077)
- Improved Badge rendering performances (https://kdsjira.atlassian.net/browse/NCK-1175)
- Fixed blurry aspect of \* on mandatory input fields (https://kdsjira.atlassian.net/browse/NCK-929)

## 11.3.1

### Fixes

- Datepicker component now respects popoverPosition props value when set to Right and ignoreParentOverflow props is true (https://kdsjira.atlassian.net/browse/NCK-1149)

## 11.3.0

### New Features

- Added Slider component (https://kdsjira.atlassian.net/browse/NCK-246)
- Added capacity to disable selection on individual rows in Table components where multiSelect is enabled (https://kdsjira.atlassian.net/browse/NCK-1073)

### Fixes

- Table row's checkbox (and other interactive components) can interacted with using keyboard only whe @row-clicked event handler is set and rowAriaRole="button" (https://kdsjira.atlassian.net/browse/NCK-1151)
- Fixed NCK documentation examples display having multiple HTML roots (https://kdsjira.atlassian.net/browse/NCK-1136)

### Changes

- Reduced Badge lateral paddings (https://kdsjira.atlassian.net/browse/NCK-915)
- Changed Badge, Counter Badge & Recommended Badge vertical paddings (https://kdsjira.atlassian.net/browse/NCK-1109, https://kdsjira.atlassian.net/browse/NCK-1110, https://kdsjira.atlassian.net/browse/NCK-1114)

## 11.2.2

### Fixes

- Fix an issue where dropdown menu was staking place in the modal when the dropdown was readonly (https://kdsjira.atlassian.net/browse/NCK-1142)
- Fix an issue where the autocomplete menu was overlapped by labels of other inputs (https://kdsjira.atlassian.net/browse/NCK-1144)

## 11.2.1

### Fixes

- Datepicker menu now properly displays over a modal (https://kdsjira.atlassian.net/browse/NCK-1118)
- Fix an issue where closing the popover with escape was also closing modal behind if any (https://kdsjira.atlassian.net/browse/NCK-1075)
- Fix an issue where badge component was wrongly reporting deprecation usage (https://kdsjira.atlassian.net/browse/NCK-1139)
- Fix an issue where the date in datepicker calendar seemed selected even if not (https://kdsjira.atlassian.net/browse/NCK-945)
- Fix an issue on display on text input, text area & dropodwn on their label when user were unzooming (https://kdsjira.atlassian.net/browse/NCK-496)
- Fix display issue on date picker calendar (https://kdsjira.atlassian.net/browse/NCK-943)
- Fix an issue where an optional translation was required for popover (https://kdsjira.atlassian.net/browse/NCK-655)
- Autocomplete menu now properly displays over a modal (https://kdsjira.atlassian.net/browse/NCK-1117)
- Dropdown menu now properly displays over a modal (https://kdsjira.atlassian.net/browse/NCK-1079)
- Prevent modal to close if user start clicking inside and release outside (https://kdsjira.atlassian.net/browse/NCK-1046)
- Fix display of shadow on Card component (https://kdsjira.atlassian.net/browse/NCK-501)

## 11.2.0

### New features

- Added functionality to differentiate/highlight prefilled Text inputs (https://kdsjira.atlassian.net/browse/NCK-1025)

## 11.1.0

### New features

- Added capacity to disable dates before a date and / or after a date in the Datepicker (https://kdsjira.atlassian.net/browse/NCK-798)

### Fixes

- Fixed a problem preventing from closing a Modal when trying to refocus the modal trigger when this trigger control is within Shadow DOM (https://kdsjira.atlassian.net/browse/NCK-1036)

## 11.0.0

### BREAKING CHANGES

- NCK is now officially compatible with node 18.10.0 and npm 8.19.2 (https://kdsjira.atlassian.net/browse/NCK-951)
- Enum "BadgeType" which was used for Recommended Badge type has been renamed to RecommendedBadgeType. The new BadgeType is now used for Badge (https://kdsjira.atlassian.net/browse/NCK-756)

Refer to the migration section of the documentation to know how to resolve breaking changes.

### Deprecation

- Badge component's "backgroundColor", "borderColor" and "fontColor" are deprecated. The badge's style is now defined by "color" and "type".

### New features

- Addition of a floating variant to the Button component (https://kdsjira.atlassian.net/browse/NCK-654)
- Addition of a manual selection (autoSelected=false) version of the Autocomplete not automatically selecting the first matching proposal (https://kdsjira.atlassian.net/browse/NCK-966)

### Changes

- Updated 3rd party dependencies (https://kdsjira.atlassian.net/browse/NCK-951)

### Fixes

- Fix of a triple announce of Button progress label (in loading state) by screen reader when using Firefox. Reduced to 2 announcements. (https://kdsjira.atlassian.net/browse/NCK-1008)
- Fix of an invalid error state announced by screen reader on all input components providing validation capabilities (text input, autocomplete,...) (https://kdsjira.atlassian.net/browse/NCK-1026)

## 10.0.0

### BREAKING CHANGES

- Remove "counterEntry" on tabs component (https://kdsjira.atlassian.net/browse/NCK-747)
- Remove "buttonClicked" on tooltip directive (https://kdsjira.atlassian.net/browse/NCK-748)
- Remove "FULL_WIDTH" size for button component (https://kdsjira.atlassian.net/browse/NCK-749)
- Remove "iconName", "iconAltText" and "iconPosition" from header component (https://kdsjira.atlassian.net/browse/NCK-750)
- Remove Empty state component (https://kdsjira.atlassian.net/browse/NCK-751)
- Remove tooltip related prop in the badge component (https://kdsjira.atlassian.net/browse/NCK-754)

Refer to the migration section of the documentation to know how to resolve those
breaking changes.

### New features

- Add trailing counter option on chip (https://kdsjira.atlassian.net/browse/NCK-817)
- Add "inline" for autocomplete component (https://kdsjira.atlassian.net/browse/NCK-752)
- Add ability to have a modal on top of modal with modal components (https://kdsjira.atlassian.net/browse/NCK-585)
- Add custom rules in date picker (https://kdsjira.atlassian.net/browse/NCK-922)
- Add chip popover (https://kdsjira.atlassian.net/browse/NCK-820)
- Change top margin of popover (https://kdsjira.atlassian.net/browse/NCK-564)

### Fixes

- Fix styling issue on date picker (https://kdsjira.atlassian.net/browse/NCK-873, https://kdsjira.atlassian.net/browse/NCK-944)
- Fix a glitch when button changes from standard button to disable and vice versa (https://kdsjira.atlassian.net/browse/NCK-261)
- remove minimal heights on modal on medium resolution (https://kdsjira.atlassian.net/browse/NCK-739)

## 9.8.1

### Fixes

- prevent DatePicker calendar month's unexpected shift when days are selected from right to left (https://kdsjira.atlassian.net/browse/NCK-941)
- crash only if DatePicker is used when componentOptions for DatePicker are not provided to avoid breaking consuming apps of NCK not using DatePicker component (https://kdsjira.atlassian.net/browse/NCK-964)

## 9.8.0

### Changes

- change 'blue-grey-100' color from #FBFBFB to #F8F9FB (impact all components and style relying on this color)

## 9.7.0

### New features

- Add "XS" size for modal (https://kdsjira.atlassian.net/browse/NCK-764)
- Add Toggle Chip component (https://kdsjira.atlassian.net/browse/NCK-840)
- Add date format support in Date picker component (https://kdsjira.atlassian.net/browse/NCK-797)
- Add disabled/readonly state, along with help message on date picker component (https://kdsjira.atlassian.net/browse/NCK-797)

### Fixes

- Fix an error when autocomplete result were retrieved even when the minimal character number was not met (https://kdsjira.atlassian.net/browse/NCK-923)
- Fix an issue where autocomplete menu was still opened if user were interacting with it too fast (https://kdsjira.atlassian.net/browse/NCK-882)
- Fix an issue where the "focused" element within a dropdown was not the selected one but a previous selection (https://kdsjira.atlassian.net/browse/NCK-563)

### Changes

- clean all code related to Internet Explorer 11 (https://kdsjira.atlassian.net/browse/NCK-763)

## 9.6.1

### Fixes

- Fix validation issue on date picker in a context of a form on lower resolution (https://kdsjira.atlassian.net/browse/NCK-898)

## 9.6.0

### New features

- Add Date picker component (https://kdsjira.atlassian.net/browse/NCK-359, https://kdsjira.atlassian.net/browse/NCK-615, https://kdsjira.atlassian.net/browse/NCK-621)

### Fixes

- Remove margin bottom for Chip (https://kdsjira.atlassian.net/browse/NCK-848)
- Avoid style bleeding of Date picker (https://kdsjira.atlassian.net/browse/NCK-896)

### Changes

- Change icon loading logic to drop 3rd party dependency and reduce library size (https://kdsjira.atlassian.net/browse/NCK-833)

## 9.5.0

### New features

- Update style of fullscreen modal on desktop (https://kdsjira.atlassian.net/browse/NCK-709, https://kdsjira.atlassian.net/browse/NCK-712)
- Offer ability to prevent character on text input (https://kdsjira.atlassian.net/browse/NCK-706)

### Fixes

- Fix accessibility issue on breadcrumb (https://kdsjira.atlassian.net/browse/NCK-794)
- Fix an issue on modal when setting explicitely "LIGHT" color on button in footer (https://kdsjira.atlassian.net/browse/NCK-753)

## 9.4.0

### New features

- Add ability to focus beginning of the form component and the first field with error, and error area in the form (https://kdsjira.atlassian.net/browse/NCK-405)
- Add ability to make the menu focusable by user (https://kdsjira.atlassian.net/browse/NCK-569)

### Changes

- Update 3rd party dependencies (https://kdsjira.atlassian.net/browse/NCK-720)

## 9.3.0

### New features

- Allow to disable "focus shift" of loading area after loading finishes (https://kdsjira.atlassian.net/browse/NCK-681)
- Expose focus method for form fields (text input, dropdown, etc.) (https://kdsjira.atlassian.net/browse/NCK-523)

### Fixes:

- Set correct semantic for accessibility when no help message or error message exists for form fields (https://kdsjira.atlassian.net/browse/NCK-647)

## 9.2.0

### New features

- Added linear Loader version (https://kdsjira.atlassian.net/browse/NCK-242)
- Added fluid width Popover version (https://kdsjira.atlassian.net/browse/NCK-609)

### Fixes

- Fixed Checkbox sublabel horizontal alignment with label at Phone & Tablet resolutions (https://kdsjira.atlassian.net/browse/NCK-583)
- Prevented Autocomplete invisible overflow from creating page horizontal scroll (https://kdsjira.atlassian.net/browse/NCK-633)
- Prevented Autocomplete proposal keyboard selection from triggering parent Form submission (https://kdsjira.atlassian.net/browse/NCK-657)

## 9.1.0

### New features

- Add capacity to pass class to loaded content element in LoadingArea (https://kdsjira.atlassian.net/browse/NCK-273)
- Change display for checkbox on mobile and tablet to be bigger (https://kdsjira.atlassian.net/browse/NCK-528)
- Add an option to vertically align the first line of the label with the checkbox (https://kdsjira.atlassian.net/browse/NCK-529)
- Add full size to modal component (https://kdsjira.atlassian.net/browse/NCK-584)

### Fixes

- Chip conveys state correctly to screen reader when it is clickable (https://kdsjira.atlassian.net/browse/NCK-608)
- Chip doesn't pretend anymore to be button when the chip is not clickable (https://kdsjira.atlassian.net/browse/NCK-608)

## 9.0.0

### BREAKING CHANGE

- NCK is not guaranteeing compatibility anymore with Internet Explorer 11 starting from this release.

### New features

- New Autocomplete component (https://kdsjira.atlassian.net/browse/NCK-282). WARNING: this component is not guaranteed to work with Internet Explorer 11. It actually has major issues in IE11 and we don't plan to fix them as we are saying goodbye to IE11 support soon.
- Menu now triggers `current-option-changed` event and exposes `selectNextElement` & `selectPreviousElement` methods (https://kdsjira.atlassian.net/browse/NCK-282)
- TextInput now implements `INckTextInput` interface & exposes `focus` method (https://kdsjira.atlassian.net/browse/NCK-282)
- IFormFieldWithValidation interface defining validation standard methods (`isValid()` & `validate()`) is now exported allowing casting and clearer interaction with components implementing it: Autocomplete, Dropdown, TextInput, TextArea & RadioButtons (https://kdsjira.atlassian.net/browse/NCK-289)

### Changes

- NCK global form validation strategy is switched from default [Aggressive mode](https://vee-validate.logaretm.com/v3/guide/interaction-and-ux.html#interaction-and-ux) to [Eager mode](https://vee-validate.logaretm.com/v3/guide/interaction-and-ux.html#interaction-and-ux) (https://kdsjira.atlassian.net/browse/NCK-282)
- Modal body padding at Tablet resolution is now 1rem as it was already previously at Phone resolution instead of 1.5rem as it still is at desktop resolution (https://kdsjira.atlassian.net/browse/NCK-558)

## 8.1.1

### Fixes

- Fixed incorrect & misleading display of Checkbox checkmark icon on internet explorer (https://kdsjira.atlassian.net/browse/NCK-572)
- Fixed centering of Modal component title on Phone & Tablet (https://kdsjira.atlassian.net/browse/NCK-434)

## 8.1.0

### New feature

- New toast component (https://kdsjira.atlassian.net/browse/NCK-93)
- update list of supported browser for the generated library (this impacts the polyfills embedded) (https://kdsjira.atlassian.net/browse/NCK-562)

### Fixes

- Fix an issue preventing selecting an element with the mouse on IE11 in the menu component (and its consumers, dropdown & tabs) (https://kdsjira.atlassian.net/browse/NCK-555)
- Make the menu item style in Menu component less sensitive to style overrides due to other internal library (UI-kit) (https://kdsjira.atlassian.net/browse/NCK-565)

## 8.0.0

### BREAKING CHANGE

- Menu is not a standalone component anymore but is intended to be embedded in other component such as NckPopover, NckModal etc.
  The component has been stripped of its external style (the box shadow, border) and Prop "displayed" has been removed (https://kdsjira.atlassian.net/browse/NCK-277)

### Deprecation

- the tooltip API is now deprecated on badge, it is recommended to use the InfoTooltip along with new option "interactive" (https://kdsjira.atlassian.net/browse/NCK-54)

### New features

- Add new size of NckModal component and update the style of NckModal (https://kdsjira.atlassian.net/browse/NCK-440)
- Add mobile design on NckCheckbox (https://kdsjira.atlassian.net/browse/NCK-436)
- New prop "interactive" on badge to apply hover style, and always set focus style on badge (won't apply if not focusable) (https://kdsjira.atlassian.net/browse/NCK-54)
- Update style of NckDropdown and NckTabs' menus (https://kdsjira.atlassian.net/browse/NCK-277)
- Update 3rd party dependencies (https://kdsjira.atlassian.net/browse/NCK-537)

### Fixes

- Do not change display on disabled checkbox when they are hovered (https://kdsjira.atlassian.net/browse/NCK-349)
- Correctly display the selected tab in the menu, when tabs' menu is displayed (https://kdsjira.atlassian.net/browse/NCK-441)
- Fix placement of error message for horizontally positioned radio buttons (https://kdsjira.atlassian.net/browse/NCK-411)
- Fix z-index of popover to avoid cases where elements overlaps popover (https://kdsjira.atlassian.net/browse/NCK-557)

## 7.9.0

### New features

- new Form component (https://kdsjira.atlassian.net/browse/NCK-106)
- new Popover component (https://kdsjira.atlassian.net/browse/NCK-247)

## 7.8.0

### New features

- add new Switch component (https://kdsjira.atlassian.net/browse/NCK-353)

## 7.7.1

### Fixes

- Fix an issue where "menu-dismissed" was wrongly emitted after selection in multiselect context (https://kdsjira.atlassian.net/browse/NCK-403)

## 7.7.0

### New features

- Update 3rd party dependencies of the library (https://kdsjira.atlassian.net/browse/NCK-306)
- Capacity to add a leading icon to a text input (https://kdsjira.atlassian.net/browse/NCK-236)
- Change margin and icon of error messages and information text on Text input, Text area, Dropdown and Radio buttons (https://kdsjira.atlassian.net/browse/NCK-51)
- Change aspect of the card component (https://kdsjira.atlassian.net/browse/NCK-347, https://kdsjira.atlassian.net/browse/NCK-348)
- Add Menu component (previously private) and add capacity to have a sublabel in it (https://kdsjira.atlassian.net/browse/NCK-198)
- Add multiselection capability to menu (https://kdsjira.atlassian.net/browse/NCK-270)

### Fixes

- Fix error thrown when translation are missing for banner (https://kdsjira.atlassian.net/browse/NCK-227)
- Fix scroll issue on dropdown menu where the scroll was not following the selection anymore (https://kdsjira.atlassian.net/browse/NCK-338)

## 7.6.0

### New features

- Add ability on dropdown to navigate value with keyboard without auto-selecting the value (https://kdsjira.atlassian.net/browse/NCK-53)

### Fixes

- Fix an issue on click callback on tab that was not working when tab was in the menu (https://kdsjira.atlassian.net/browse/NCK-336)
- Fix an issue occuring on empty radio buttons (https://kdsjira.atlassian.net/browse/NCK-304)
- Fix positionning issue of radio buttons in some context (https://kdsjira.atlassian.net/browse/NCK-303)

## 7.5.0

### New features

- Icon component emits events after icon is displayed or failed displaying (https://kdsjira.atlassian.net/browse/NCK-297)
- Allow labelling ContentSwitcher as required for proper accessibility (https://kdsjira.atlassian.net/browse/NCK-33)

### Fixes

- Minor color change for Dropdown menu items text (https://kdsjira.atlassian.net/browse/NCK-264)
- Recommended badge sometimes contained ellipsis in very small containers (https://kdsjira.atlassian.net/browse/NCK-129)

## 7.4.0

Deprecated release

## 7.3.0

### New features

- Add validation capability to radio buttons (https://kdsjira.atlassian.net/browse/NCK-12)
- Enforce icon color on header (https://kdsjira.atlassian.net/browse/NCK-253)
- Update tabs to display a "more" menu with the tabs that won't fit in the display (https://kdsjira.atlassian.net/browse/NCK-144)

## 7.2.0

### New features

- Allow to pass listener for ModalService (https://kdsjira.atlassian.net/browse/NCK-249)

### Fixes

- Fix an issue in dropdown where it was dismissing keyboard action after opening dropdown (https://kdsjira.atlassian.net/browse/NCK-180)

## 7.1.1

### Fixes

- Breadcrumb steps tooltips are now global to avoid a potential visual glitch when navigating steps (https://kdsjira.atlassian.net/browse/NCK-222).

## 7.1.0

### New features

- Add placeholder component (https://kdsjira.atlassian.net/browse/NCK-189).

### Deprecation

- Empty state component is deprecated in favor of placeholder.

## 7.0.0

### Changes

- BREAKING CHANGE: Icon: dropped support for Neo Icon Kit peer dependency strictly below version 3.0.0. Conversely Neo Icon Kit versions above starting from 3.0.0 requires NCK 7.0.0 and above. Please refer to http://neo-component-kit.kdsneo.kds.com:8080/latest#icons for guided setup instructions. (https://kdsjira.atlassian.net/browse/NCK-120)
- 3rd party dependencies were updated. (https://kdsjira.atlassian.net/browse/NCK-163)

### New Features

- Loading Area: allow displaying arbitrary content instead of the Loader component (https://kdsjira.atlassian.net/browse/NCK-158)
- Chip: new component https://kdsjira.atlassian.net/browse/NCK-116

### Fixes

- Loader: fixed loading announce for assistive technology & allow triggering loading several times (https://kdsjira.atlassian.net/browse/NCK-40)
- Modal: component displayed full screen at phone resolution now has square corners (https://kdsjira.atlassian.net/browse/NCK-22)
- Dropdown: reopening a dropdown component after clicking on a disabled item should not require 2 clicks (https://kdsjira.atlassian.net/browse/NCK-38)

## 6.7.0

### New Features

- Allow "Compact" & "Compact side" tabs to overflow with horizontal scrollbar (https://kdsjira.atlassian.net/browse/NCK-9)

## 6.6.2

### Fixes

- Fix link style offset (https://kdsjira.atlassian.net/browse/NCK-118)

## 6.6.1

### New features

- Info Tooltips can now be attached to each Breadcrumb component steps (https://kdsjira.atlassian.net/browse/TRV3-2600)
- Various minor aesthetic (color, size, padding, margin) changes on Breadcrumb steps (https://kdsjira.atlassian.net/browse/TRV3-2600)
- Added new Button flavor: the Ghost one (https://kdsjira.atlassian.net/browse/TRV3-2477)
- Added loading state to Button component (https://kdsjira.atlassian.net/browse/TRV3-2477)
- Slightly changed the Loader component visual aspect by removing the spinner background (https://kdsjira.atlassian.net/browse/TRV3-2477)

### Fixes

- Fixed a build output style replication problem leading to NCK overweight (https://kdsjira.atlassian.net/browse/TRV3-2710)
- Set missing "graphic" semantic role for NckIcon component (https://kdsjira.atlassian.net/browse/TRV3-2721)
- Fixed unwanted reading of a technical link used in Dialog Tooltip (https://kdsjira.atlassian.net/browse/TRV3-2567)
- Fixed .link style unwanted offset (https://kdsjira.atlassian.net/browse/TRV3-2689)
- Fixed the accessibility pattern of Dialog Tooltips for better standard respect and lighter screen reader output (https://kdsjira.atlassian.net/browse/TRV3-2661)
- Updated NCK 3rd party dependencies to their last official versions (https://kdsjira.atlassian.net/browse/TRV3-2580)

## 6.6.0

Deprecated release

## 6.5.2

### Fixes

- Information tooltip pointing arrow does not overlap external focus ring anymore (https://kdsjira.atlassian.net/browse/TRV3-2619)
- Information tooltip does not override the semantic role of its trigger anymore (https://kdsjira.atlassian.net/browse/TRV3-2619)
- Information tooltip does not set any accessible label on its trigger anymore, this is now fully up to the consuming application (https://kdsjira.atlassian.net/browse/TRV3-2619)

### Documentation

- Documented `.outside-focus` & `.inside-focus` style classes to help with applying standard focus ring on consuming application focusable controls (https://kdsjira.atlassian.net/browse/TRV3-2619)
- Documented usability & accessibility problems of information tooltips to explain why their usage should be kept minimal and for supplementary information only (https://kdsjira.atlassian.net/browse/TRV3-2619)

## 6.5.1

Deprecated release, erroneously released a branch of dev...

## 6.5.0

### New features

- Added sorting capabilities to Table component (https://kdsjira.atlassian.net/browse/TRV3-2400 & https://kdsjira.atlassian.net/browse/TRV3-2525)
- Added public `clearSelection` function to Table component to allow clearing any current selection programmatically (https://kdsjira.atlassian.net/browse/TRV3-2400)

### Fixes

- Now showing overflowing Table headers & cells text content instead to ensure accessibility & usability when zooming, magnifying default font size, reducing viewport (https://kdsjira.atlassian.net/browse/TRV3-2525)

### Documentation

- Added “Getting started” section to the documentation (https://kdsjira.atlassian.net/browse/TRV3-2543)
- Clarified Pagination component documentation (https://kdsjira.atlassian.net/browse/TRV3-2425)
- Clarified Tabs component documentation (https://kdsjira.atlassian.net/browse/TRV3-2553)

## 6.4.0

### New features

- Update header component to add capabilities for having a back link, an action button on the right and having the subtitles on the same line (https://kdsjira.atlassian.net/browse/TRV3-2191)
- Expose the "link" style (https://kdsjira.atlassian.net/browse/TRV3-2428)

## 6.3.1

### Fixes

- Fix issue with font size in dropdown (https://kdsjira.atlassian.net/browse/TRV3-2547)
- Dropdown now correctly revalidates itself as soon as the value change (https://kdsjira.atlassian.net/browse/TRV3-2523)
- Change internal style naming in card to reduce occurrences of conflict with outside world (https://kdsjira.atlassian.net/browse/TRV3-2505)
- Correctly destroy modal when parent is destroyed (https://kdsjira.atlassian.net/browse/TRV3-2491)

## 6.3.0

### New features

- New Recommended badge component (https://kdsjira.atlassian.net/browse/TRV3-2399)
- Button component can now have a role 'button' or 'link' (https://kdsjira.atlassian.net/browse/TRV3-2481)
- Info tooltip/Dialog tooltip content is now aligned on left (https://kdsjira.atlassian.net/browse/TRV3-1650)

### Fixes

- Ensure all expected styles are explicitly implemented by Neo Component Kit and remove Bootstrap & KDS UI Kit dependencies in NCK documentation. Should ensure safer styling of components rendered in a context where UIkit & Bootstrap are not included (https://kdsjira.atlassian.net/browse/TRV3-2472)
- Fix an issue where the label was overlapping the top right of the dropdown in some context (https://kdsjira.atlassian.net/browse/TRV3-2483)
- Fix an issue on scrollable table where the header was not on top when the browser font size was different from the default (https://kdsjira.atlassian.net/browse/TRV3-2480)

## 6.2.0

### New features

- Update on header to add capabilities to have icon on both sides, along with precising their role "link" or "button" (https://kdsjira.atlassian.net/browse/TRV3-1435)
- Add "Dropdown" component (https://kdsjira.atlassian.net/browse/TRV3-2302)

### Fixes

- Fix an issue where tooltips were not always cleaned correctly due to incorrect ID (https://kdsjira.atlassian.net/browse/TRV3-2457)
- Fix incorrect icon size for the cross button on modal (https://kdsjira.atlassian.net/browse/TRV3-2383)
- Fix an issue where loader was not disappearing in Loading Area component after instantaneous loading (https://kdsjira.atlassian.net/browse/TRV3-2421)
- Make banner fullwidth even if parent container is "flex" based (https://kdsjira.atlassian.net/browse/TRV3-2410)

### Deprecation

- In header component the props "iconName", "iconAltText" and "iconPosition" have been deprecated in favor of the newly added "leftIconName"/"leftIconAltText" and "rightIconName"/"rightIconAltText"

## 6.1.2

### Fixes

- Fixes the "Select all" checkbox of the Table component incorrectly selecting a single line in some cases (https://kdsjira.atlassian.net/browse/TRV3-2384)

## 6.1.1

### Fixes

- Fixes various issues on table, especially when using the "multiselect" and "scrollableContent" options together (https://kdsjira.atlassian.net/browse/TRV3-2382)

## 6.1.0

### New feature

- Add multi-selection to the table component (https://kdsjira.atlassian.net/browse/TRV3-2056)

### Change

- update 3rd party dependencies (https://kdsjira.atlassian.net/browse/TRV3-2215)

## 6.0.0

### New features

- Add ability to pass "props" to the modal instance (https://kdsjira.atlassian.net/browse/TRV3-2276)
- Allow usage for 'positive'/'negative' buttons in the modal footer (https://kdsjira.atlassian.net/browse/TRV3-2276)

### Fix

- Fix issue where elements with "z-index" were appearing on top of the modal (https://kdsjira.atlassian.net/browse/TRV3-2276)

### Breaking change

- The API to spawn a modal with 'ModalService' has changed to include the
  component calling the modal

## 5.2.0

### New features

- Add text area component (https://kdsjira.atlassian.net/browse/TRV3-2054)
- Add XXS size to icons (https://kdsjira.atlassian.net/browse/TRV3-2285)

### Fixes

- fix a memory leak for tooltips, due to a tooltip not being cleaned when its trigger was removed from DOM
- slightly improve performance of tooltip usage by deferring tooltip initialization later in the event loop

## 5.1.0

### New Features

- Add checkbox component (https://kdsjira.atlassian.net/browse/TRV3-2055, https://kdsjira.atlassian.net/browse/TRV3-2244)
- Add radio buttons component (https://kdsjira.atlassian.net/browse/TRV3-2058)

## 5.0.0

### New feature

- Loader component (https://kdsjira.atlassian.net/browse/TRV3-2057)

### Changes

- migrated previous green, orange & red to new (already existing) chart colors (https://kdsjira.atlassian.net/browse/TRV3-1942) affecting Badge, Banner, Breacrumb, CounterBadge & List components

### Removal

- removed old green (#89CE21), old red (#FF3B3B) & old orange (#FF9500) incidentally removing various exposed css classes (https://kdsjira.atlassian.net/browse/TRV3-1942): font-color-red, font-color-green, font-color-orange, background-color-red, background-color-green, background-color-orange, background-color-hover-red, background-color-hover-green, background-color-hover-orange, border-color-red, border-color-green, border-color-orange
  but also removing various enum values BackgroundColors.GREEN, BackgroundColors.RED, BackgroundColors.ORANGE, Colors.GREEN, Colors.RED, Colors.ORANGE.

## 4.3.0

### New feature

- Add text input component (https://kdsjira.atlassian.net/browse/TRV3-2053)

### Fix

- Fix a bug on scrollable table, where the first line was hidden when the table was initially hidden by CSS (https://kdsjira.atlassian.net/browse/TRV3-1992)

## 4.2.0

### New features

- Add modal component (https://kdsjira.atlassian.net/browse/TRV3-1975)
- Update button design: buttons now have 4 sizes (S, M, L, XL), a new fullWidth parameter,
  can be of four colors (blue, white, red and green) and have two aspect (outlined and filled) (https://kdsjira.atlassian.net/browse/TRV3-2041)
- Add new typography (and they are now displayed in documentation) (https://kdsjira.atlassian.net/browse/TRV3-2091)
- Allow to pre-select a tab programmatically (https://kdsjira.atlassian.net/browse/TRV3-2047)
- Make pagination transparent for non-selected page button (https://kdsjira.atlassian.net/browse/TRV3-2081)

### Fixes

- Fixes an issue in both tooltips where the events were not triggered when the tooltip was set on a component (https://kdsjira.atlassian.net/browse/TRV3-2018)

### Deprecation

- "full-width" size in button component is deprecated. Instead use "medium" size along with
  the new "fullwidth" prop.

## V4.1.0

### New features

- Add action to dismiss banner, add body content to banner, and add ability to add link at the end of lines of either heading or
  body of the banner (https://kdsjira.atlassian.net/browse/TRV3-1362)
- Redesign "selected" state of Card component, and add new "active" state
- Add colorization capabilities for icons (up to two colors) (https://kdsjira.atlassian.net/browse/TRV3-1503)

## V4.0.1 (released on 2020/10/30)

### Fixes

- Redisplay icons in documentation (https://kdsjira.atlassian.net/browse/TRV3-1969)
- Ensure white background for secondary button in all situations (https://kdsjira.atlassian.net/browse/TRV3-1968)

## V4.0.0 (released on 2020/10/27)

### New features

- Update icon to use new "neo-icon-kit" instead of "ui-kit" as a source (https://kdsjira.atlassian.net/browse/TRV3-1501)

### Breaking change

- remove the IconName enum following icon update

## V3.6.0 (released on 2020/10/27)

### New features

- Adds tooltip-shown, tooltip-hidden & tooltip-button-clicked events to info & dialog tooltips (https://kdsjira.atlassian.net/browse/TRV3-1410)

### Deprecation

- Deprecates buttonClicked directive attribute (use tooltip-button-clicked event listener instead)

## V3.5.0 (released on 2020/10/19)

### New features

- Adds the Content Switcher component (https://kdsjira.atlassian.net/browse/TRV3-1234)
- Adds a new layout version and a subtitle feature to the Header component (https://kdsjira.atlassian.net/browse/TRV3-1311)

## V3.4.0 (released on 2020/10/14)

### New features

- Add new icons (https://kdsjira.atlassian.net/browse/TRV3-1615 & https://kdsjira.atlassian.net/browse/TRV3-1913)

### Fixes

- Fixes various alignment issues with tabs (https://kdsjira.atlassian.net/browse/TRV3-1678 & https://kdsjira.atlassian.net/browse/TRV3-1799)

## V3.3.1 (released on 2020/10/01)

### Fixes

- Providing translations for all translatable strings and translation function was mandatory (creating an unexpected breaking change in 3.3.0).
  Individual components make it clear what they expect and we should not force translations to be provided when not using a given component or not using localizable components
  (https://kdsjira.atlassian.net/browse/TRV3-1875)

## V3.3.0 (released on 2020/10/01)

### New features

- Adds pagination component (https://kdsjira.atlassian.net/browse/TRV3-685)
- Non-modal dialog tooltip now also pops up on mouse hover (https://kdsjira.atlassian.net/browse/TRV3-1865)

## V3.2.1 (released on 2020/09/21)

### Fixes

- Fix an issue where focus was misplaced after tabbing out of a Dialog Tooltip (https://kdsjira.atlassian.net/browse/TRV3-1465)
- Fix an issue with Dialog Tooltip where pressing Enter/Space on trigger was causing a page change ((https://kdsjira.atlassian.net/browse/TRV3-1809)
- Make the tabs reactive to any change (https://kdsjira.atlassian.net/browse/TRV3-1790)

## V3.2.0 (released on 2020/08/18)

### New features

- Add new "Compact" & "Compact side" design to tabs (https://kdsjira.atlassian.net/browse/TRV3-1274)
- Add ability to add icons on tabs (https://kdsjira.atlassian.net/browse/TRV3-1274)

### Deprecation

- In tabs components, there is an API change. 'counterEntry' is deprecated and 'trailingCounterValue' is replacing it.

## V3.1.0 (released on 2020/07/28)

- Add breadcrumb component (https://kdsjira.atlassian.net/browse/TRV3-1331)

## V3.0.0 (released on 2020/07/16)

- Modify icon sizes and introduce 5 sizes (https://kdsjira.atlassian.net/browse/TRV3-1312)

## V2.1.0 (released on 2020/07/02)

- Add tick & payment due icons for https://kdsjira.atlassian.net/browse/TRV5-883
- Fix offset with scrollbar on scrollable table (https://kdsjira.atlassian.net/browse/TRV3-1592)

## V2.0.0 (released on 2020/06/22)

- Change colors to GBT chart (https://kdsjira.atlassian.net/browse/TRV3-1247)

## V1.9.0 (released on 2020/06/18)

- Add Non-dialog modal tooltip (https://kdsjira.atlassian.net/browse/TRV3-755)

## V1.8.0 (released on 2020/05/28)

- Add Table component (https://kdsjira.atlassian.net/browse/TRV3-657)

## V1.7.0 (released on 2020/04/21)

- Update uikit version to 9.6.0. Adds amenity-seat-white, eco-filled, eco-filled-white, eco-outline, eco-outline-white & location icons. (https://kdsjira.atlassian.net/browse/TRV3-1295)
- Added Badge component (https://kdsjira.atlassian.net/browse/TRV3-1156)

## V1.6.2 (released on 2020/03/24)

- Make the selected state in tab appear above border (https://kdsjira.atlassian.net/browse/TRV3-1296)

## V1.6.1 (released on 2020/03/18)

- Change CSS rule to increase their weight to mitigate override from other CSS declaration (https://kdsjira.atlassian.net/browse/TRV3-1281)

## V1.6.0 (released on 2020/03/11)

- Add option to hide first top border and last bottom of the list (https://kdsjira.atlassian.net/browse/TRV3-1199)
- Add parameter on tabs, to make the content scrollable (https://kdsjira.atlassian.net/browse/TRV3-1231)

## V1.5.2 (released on 2020/03/06)

- Fix blurry/cut/too small icons on IE11 due to size rounding (https://kdsjira.atlassian.net/browse/TRV3-1204)

## V1.5.1 (released on 2020/03/04)

- Remove margin between content and tabs (https://kdsjira.atlassian.net/browse/TRV3-1194)
- Fix an issue where "selected" display was disappearing when tab was pressed (https://kdsjira.atlassian.net/browse/TRV3-1196)

## V1.5.0 (released on 2020/02/28)

- Add "plus" prefix on counter badge component (https://kdsjira.atlassian.net/browse/TRV3-1107)
- Add Tabs component (https://kdsjira.atlassian.net/browse/TRV3-660)

## V1.4.0 (released on 2020/02/21)

- Added Empty State component (https://kdsjira.atlassian.net/browse/TRV3-1018)
- Added Page Header component (https://kdsjira.atlassian.net/browse/TRV3-989)

## V1.3.2 (released on 2020/02/20)

- Add typings in npm package (https://kdsjira.atlassian.net/browse/TRV3-1155)

## V1.3.1 (released on 2020/02/19)

- Remove unneeded files (mainly .git folder) from npm package to avoid travelv2 install issues (https://kdsjira.atlassian.net/browse/TRV3-1151)

## V1.3.0 (released on 2020/02/18)

- Add card component (https://kdsjira.atlassian.net/browse/TRV3-1019)

## V1.2.1 (released on 2020/02/18)

- Fix performance issue on tooltip (https://kdsjira.atlassian.net/browse/TRV3-1088)
- Make the tooltip content hoverable without dismissing the tooltip (https://kdsjira.atlassian.net/browse/TRV3-1087)
- Fix an issue where the screen-reader wasn't reading the tooltip content(https://kdsjira.atlassian.net/browse/TRV3-914)

## V1.2.0 (released on 2020/02/11)

- Add icon component (https://kdsjira.atlassian.net/browse/TRV3-932)
- Add counter badge component (https://kdsjira.atlassian.net/browse/TRV3-831)

## V1.1.0 (released on 2020/02/06)

- Add tooltip component (https://kdsjira.atlassian.net/browse/TRV3-693)
- Add list component (https://kdsjira.atlassian.net/browse/TRV3-659)

## V1.0.0 (released on 2019/11/19)

- Add button component (https://kdsjira.atlassian.net/browse/TRV3-656)
- Add banner component (https://kdsjira.atlassian.net/browse/TRV3-683)
