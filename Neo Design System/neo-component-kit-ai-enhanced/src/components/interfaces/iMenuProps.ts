import { IMenuItem } from "../../models/iMenuItem";
import { DividerToken } from "../../constants/dividerToken";

export interface IMenuProps<Data, Multiple> {
  /**
   * Whether the menu is in auto-select mode or not.
   * By default, auto-select is enabled and the value is selected as soon as navigated.
   * When disabled, the user will need to explicitely select value with "Enter" key".
   * When a menu is multiselectable, auto selection is not possible.
   */
  autoSelect?: boolean;

  /**
   * The various items to display in the menu.
   * It is an array of objects as follow:
   *
   *  - label (string, mandatory): label for the option as displayed to the user
   *  - value (unknown/any type, mandatory): the technical value associated with this option
   *  - disabled (boolean): disable value
   *  - subLabel (string): a text to display below the label
   *  - leadingIcon (string): icon to be displayed on the left side of the menu item
   *  - trailingIcon (string): icon to be displayed on the right side of the menu item
   *  - trailingCounterValue (number): a counter badge value to be displayed on the right side of the menu item
   *
   * If you want to insert a divider in the menu, you can use a DividerToken in place of an IMenuItem object.
   */
  items: Array<IMenuItem<Data> | DividerToken>;

  /**
   * The currently selected value.
   * If multiselect, it can contain multiple values.
   */
  selectedValue?: Multiple extends false ? Data : Data[];

  /**
   * Whether the user can multi select elements or not.
   */
  multiselect?: Multiple & boolean;

  /**
   * Max height of the menu in 'rem'
   */
  maxHeight?: number;

  /**
   * Set the menu in the tab order (tabindex="0") so users can focus it
   * like other interactive elements
   */
  focusableByUser?: boolean;

  /**
   * This prop allows to go against the default behaviour, focusing the first non disabled item when there is no selectedValue and autoSelect is disabled.
   *
   * If a selectedValue is set, the corresponding item will be focused regardless of autoSelect value.
   * Otherwise, if no selectedValue is set :
   *
   * - If autoSelect = false, the first non-disabled item will be focused unless this prop is false.
   * - If autoSelect = true, this prop will have no effect since the focused element is automatically selected.
   */
  navigateToFirstElementIfNoSelection?: boolean;

  /**
   * This private prop enables the persistent display of the focus aspect around a navigated menu item, even when the item is not technically in focus.
   * @ignore
   */
  forceFocusAspectOnNavigatedMenuItem?: boolean;

  /**
   * @ignore
   * This private prop enables expanding the menu up to 100% of its container height instead of relying on maxHeight default or custom value.
   * Any specified value for maxHeight will be overriden when fullHeight is true.
   */
  fullHeight?: boolean;
}
