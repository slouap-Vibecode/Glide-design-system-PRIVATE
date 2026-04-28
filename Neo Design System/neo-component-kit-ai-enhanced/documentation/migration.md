## From v15 (& below) to v16 (& above)

NckProgressIndicator has been removed and should be replaced with a NckTimeline with *type* "TimelineType.PROGRESS_INDICATOR".

## From v14 (& below) to v15 (& above)

V15 now requires Vue3, you are required to update your Vue version. Please follow the [official migration guide](https://v3-migration.vuejs.org/breaking-changes/).

The following list of component has also API changes following Vue 3 update (list component)
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

For those component, you will need to replace 'value' prop by 'modelValue', and 'input' event has been changed to 'update:modelValue'

## From v13 (& below) to v14 (& above)

### nck-datepicker-range & nck-datepicker-single

The expected wordings & options to provide have been strongly modified to offer the possibility to input custom time in `nck-datepicker-range` & `nck-datepicker-single` components (https://kdsjira.atlassian.net/browse/NCK-1582).

- The `dateFormatExplanationWording` [global translation](#translations) wording should not have a `dateFormat` variable anymore
- New [global translation](#translations) wordings are required when using `withTime = true` in `nck-datepicker-range` & `nck-datepicker-single` components:
  - `timeFormatExplanationWording`
  - `numberOfTimeOptionsWording`
  - `timeFormatInvalid` (containing a `format` parameter)
- New specific options must be filled under the `datepicker` key of the [componentOptions](#installation) when using `withTime = true` in `nck-datepicker-range` & `nck-datepicker-single` components:
  - `timeParser` function
  - `timeFormat` wording

For each existing instance of `nck-datepicker-range`:
- a new `startTimeClearButtonAltText` props is now required
- a new `endTimeClearButtonAltText` props is now required

For each existing instance of `nck-datepicker-single`:
- a new `timeClearButtonAltText` props is now required

### Neo Icon Kit peer dependency version upgrade

Neo Component Kit now requires a version of the Neo Icon Kit peer dependency `@neotechnologygroup/neo-icon-kit` above or equal [version 4.0.0](#https://gitlab.kdsneo.kds.com/neo/neo-icon-kit/-/releases/4.0.0) to be referenced in the consuming application. Version 4.0.0 removes a few icons and might require code changes in the consuming application to ensure absence of resulting problems.

## From v12 (& below) to v13 (& above)

### nck-datepicker-range & nck-datepicker-single

Using the `nck-datepicker-range` & `nck-datepicker-single` component now requires the consuming application to provide [a new global translation](#translations) wording `dateFormatExplanationWording` containing a `dateFormat` variable.
This label is required to explain the expected date format to users at higher resolution display. It is not required if the consuming application does not use any date picker yet.
See details in [nck-datepicker-range](#nckdatepickerrange).

### nck-header

- The property 'titlePosition' is removed. There is no possibility anymore to have a centered title on high resolution or a left aligned title on medium and low resolution. From now on we will always have the title centered on low/medium resolutions and left aligned on desktop. Consequently, the subtitle always will be positioned under the title on low/medium resolutions.

## From v11 (& below) to v12 (& above)

### v12.0.0 & above

#### nck-datepicker

The `nck-datepicker` component has been renamed to [nck-datepicker-range](#nckdatepickerrange), in order to introduce the new [nck-datepicker-single](#nckdatepickersingle) component.

While the [nck-datepicker-range](#nckdatepickerrange) works exactly the same as before,
several API breaking changes have been made, in order to make it clearer. Here are the details:

- Renamed `validRangeStartDate` to `minDateAllowed`.
- Renamed `validRangeEndDate` to `maxDateAllowed`.
- Renamed `beforeValidRangeErrorMessage` to `beforeMinDateErrorMessage`.
- Renamed `afterValidRangeErrorMessage` to `afterMaxDateErrorMessage`.
- The `v-model` does not accept `undefined` values anymore.

### v12.1.0 & above

#### nck-datepicker-range & nck-datepicker-single

Using the new `nck-datepicker-range` & `nck-datepicker-single` components also requires the consuming application to provide [a new global translation](#translations) wording: `datepickerCancel`.
This translation is required when consuming any date picker: it describes the label for the cancel button in the popover.
See details in [nck-datepicker-range](#nckdatepickerrange).

## From v10 (& below) to v11 (& above)

### BadgeType

Enum **BadgeType** which was used for [Recommended Badge](#nckrecommendedbadge) has been renamed to [RecommendedBadgeType](#recommendedbadgetype). The new [BadgeType](#badgetype) now is used for [Badge](#nckbadge).

## From v9 (& below) to v10 (& above)

The following APIs are breaking in V10. Here is a guide that will aim to provide alternative on how to migrate.

### nck-tabs

- 'counterEntry' is removed. Replace it with 'trailingCounterValue'. 'trailingCounterValue' works exactly the same way as 'counterEntry' so a simple replace is sufficient.

### dialog tooltips

- 'buttonClicked' is removed. By default, the tooltip button does nothing more than closing the tooltip. 'buttonClicked' allowed to add a handler to process a function behavior before closing the tooltip, which can then control whether the tooltip is actually closed by returning a truthy value (close it) or not (leave it open). It has been replaced by the 'closeOnButtonClick' attribute for deciding if the tooltip should be closed after its button has been clicked, and the 'tooltip-button-clicked' event for the callback function or functions to be called after the tooltip's button is clicked.

### nck-button

- "FULL_WIDTH" size is removed. You should replace with size "M" with "fullwidth" prop.

### nck-header

- The properties 'iconName', 'iconAltText' and 'iconPosition' are removed. A header with an existing iconPosition set to 'left' (resp. 'right') should use 'leftIconName' and 'leftIconAltText' (resp. 'rightIconName' and 'rightIconAltText') instead of 'iconName' and 'iconAltText', and discard the 'iconPosition' property.
- The event 'page-header-button-clicked' is removed. When migrating to the new properties (see above), please use 'page-header-left-button-clicked' for a left icon button event, and 'page-header-right-button-clicked' for a right icon button event.

### nck-empty-state

- Component is removed. Please use NckPlaceholder which answers a similar need but is more flexible. Instead of setting "imageURL" of the NckEmptyState, set an "img" tag inside the "image-placeholder" slot of NckPlaceholder.

### nck-badge

- All tooltips related props on the badge are removed. To use tooltips on badge, use the directive "v-nck-info-tooltip" directly on "nck-badge" tag to have the tooltip and set "interactive" prop to have the appropriate style for the badge as such:

```jsx
<nck-badge
  style="display: inline-block;"
  label="interactive badge. Hover me!"
  interactive
  v-nck-info-tooltip="'I\'m a tooltip put on a badge. Don\'t forget interactive to have hover style'"
/>
```

## From v7 (& below) to v8 (& above)

The [Menu](#nckmenu) component has been turned into a simpler component meant to be wrapped into another container.
One API breaking change has been made and several visual breaking changes. Pre-existing [Menus](#nckmenu) should generally get wrapped into a [Popover](#nckpopover) component to maintain the original look and behavior.

Here is the detail of what was changed:

- **API breaking change**: `displayed` prop is removed. [Menu](#nckmenu) is not meant to be used as a standalone component anymore but should be contained within a container governing its own appearance.
- **Visual breaking changes**: drop shadow is removed making it look borderless, rounded corners are removed, background color is made transparent, min width & max width are removed.
