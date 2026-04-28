import { IFormFieldWithValidationAndCustomRulesProps } from "@/components/interfaces/internal/iFormFieldWithValidationAndCustomRulesProps";
import { INameFormFieldProps } from "@/components/interfaces/internal/iNameFormFieldProps";
import { DividerToken } from "@/constants/dividerToken";
import { MenuPosition } from "@/constants/menuPosition";
import { ValidationMode } from "@/constants/validation/validationMode";
import { IDropdownOption } from "@/models/iDropdownOption";

export interface IDropdownProps<Item> extends INameFormFieldProps, IFormFieldWithValidationAndCustomRulesProps {
  /**
   * Alternative display with label outside of input container
   */
  labelOutside?: boolean;

  /**
   * Whether the dropdown is in auto-select mode or not.
   * By default, auto-select is enabled and the value is selected as soon as navigated.
   * When disabled, the user will need to explicitely select the value with the "Enter" key".
   */
  autoSelect?: boolean;

  /**
   * Label of the field.
   */
  label: string;

  /**
   * The list of options available in the dropdown.
   * It is an array of object:
   *
   *  - label (string, mandatory): label for the option as displayed to the user
   *  - value (unknown/any type, mandatory): the technical value associated with this option
   *  - disabled (boolean): disable value
   *  - subLabel (string): a text to display below the label
   *
   * If you want to insert a divider in the dropdown, you can use a DividerToken in place of an IDropdownOption object.
   */
  options: Array<IDropdownOption<Item> | DividerToken>;

  /**
   * The max height in 'rem' the menu of the dropdown can take.
   */
  maxMenuHeight?: number;

  /**
   * Useful in modals, sets popover as position fixed and computes its coordinates in javascript instead of css.
   * Use this wisely as is it will impact your performances.
   *
   * Accessibility limitation: when this property is used and browser default font size is changed after page loading, the position of the dropdown menu will be wrong.
   * This problem does not occur when the browser font size is customized before initial page rendering.
   * This is a defect but considered as minor because a user requiring custom browser default font size will probably not fiddle constantly with this browser-wide setting after page load but set it once and for all.
   */
  ignoreParentOverflow?: boolean;

  /**
   * Position of the dropdown menu.
   *
   * Accepts one of the [MenuPosition](#menuposition)
   */
  menuPosition?: MenuPosition;

  /**
   * @ignore
   * Internal use only; modify when the field gets validated
   */
  validationMode?: ValidationMode;

  /**
   * @ignore internal use only
   * Set the dropdown in invalid mode on style
   */
  invalid?: boolean;

  /**
   * @ignore internal use only
   * Sync popover position with this element
   */
  triggerToSyncPositionWith?: HTMLElement | null;

  /**
   * Value of the field. This component supports "v-model" pattern.
   */
  modelValue: Item;
}
