import { IAutocompleteItem } from "@/main";
import { IFormFieldWithValidationAndCustomRulesProps } from "./internal/iFormFieldWithValidationAndCustomRulesProps";
import { INameFormFieldProps } from "./internal/iNameFormFieldProps";

export interface IAutocompleteProps<Data> extends INameFormFieldProps, IFormFieldWithValidationAndCustomRulesProps {
  /**
   * Value of the autocomplete.
   * This component supports the v-model pattern.
   */
  modelValue: Data | string | undefined /* string is when acceptArbitraryInput */;

  /**
   * Search input value.
   * Useful for prefilling the autocomplete.
   * Can be used with v-model arguments to update parent component with further updates to its value.
   *
   * Warning: if you also provide the v-model,
   * you are strongly encouraged to make sure the searchInput string
   * corresponds to the label of the v-model object.
   * For instance, providing "Paris, France" as a searchInput and
   * a Location object as v-model corresponding to London, UK is possible. But it would likely results
   * in unexpected behaviors for the user.
   */
  searchInput?: string;

  /**
   * Label of the autocompletion text input field.
   */
  label: string;

  /**
   * Icon name of an optional prefix icon displayed before the text input field.
   */
  leadingIcon?: string;

  /**
   * Alternative text for the cross icon button to clear input field.
   */
  clearButtonAltText: string;

  /**
   * Minimum number of characters triggering the retrieval of proposals matching the input.
   *
   * When left to 0, retrieval is performed upon initial focus with an empty input which
   * can lead to strange results because anything may match. Please use with caution.
   * Choosing this value opens (for instance) the possibility to provide a list of favorite or history proposals
   * upon focus before the user inputs any characters.
   *
   * When set to 1 or 2, it might also bring results which do not seem to match very well
   * the input. Matching a single letter is frequent.
   */
  minInputLength?: number;

  /**
   * Alternative text for assistive technology to describe the loading operation.
   */
  loadingText: string;

  /**
   * Text to display when no matching proposals are found.
   */
  noMatchesFoundText: string;

  /**
   * Text to display when an error occurs while retrieving matching proposals.
   */
  errorRetrievingProposalsText: string;

  /**
   * Text to display when the input does not match any proposal.
   */
  invalidSelectionErrorText: string;

  /**
   * Wording key of a text announcing the number of matching results to assistive technology.
   */
  numberOfMatchingResultsWording: string;

  /**
   * When enabled, the portion of the selected suggestion that has not been typed by the user appears
   * as a completion string, inline, afer the cursor, in the textbox.
   * The inline completion string is visually highlighted.
   */
  inlineAutocomplete?: boolean;

  /**
   * A function `(input: string) => Promise<IAutocompleteItem[]>`
   * receiving the user input string and returning a promise finding matching proposals.
   *
   * Upon resolution of the promise the matching results will be displayed.
   * If no results are found, a specific message is displayed.
   * If the promise is rejected, an error message is displayed.
   *
   * The IAutocompleteItem returned can have the following properties:
   *
   *  - label (string, mandatory): label for the option as displayed to the user
   *  - value (unknown/any type, mandatory): the technical value associated with this option. Value is used to uniquely identify the selected item so each item must have a unique value to avoid non deterministic behaviors.
   *  - disabled (boolean): disable value
   *  - subLabel (string): a text to display below the label
   *  - leadingIcon (string): icon to be displayed on the left side of the autocomplete item
   *  - trailingIcon (string): icon to be displayed on the right side of the autocomplete item
   *  - trailingCounterValue (number): a counter badge value to be displayed on the right side of the autocomplete item
   *  - labelOverrideForMenu (string): label override for the autocomplete's menu, the regular label will be displayed in the text box instead
   */
  proposalsRetriever: (input: string) => Promise<IAutocompleteItem<Data>[]>;

  /**
   * Determines if searching for matching proposals is performed upon every text input changes
   * or if the component waits for 300ms after last keystroke and triggers the search
   * if no ney keystroke has occurred in this period.
   *
   * If the data source is local (set list of results preloaded on UI side) and searching through it is quick,
   * disabling debounce is encouraged in order to provide a very swift experience to the user
   * and a feeling of performance.
   *
   * However, if the data source is distant (on back end side for instance) and involves network calls or
   * costly computations, prefer enabling debounce to limit the amount of calls to retrieve matching values while
   * the user is not done typing.
   */
  debounceInput?: boolean;

  /**
   * With this option, the results won't display in a popover but directly under the text field. It's ideal for using within a popover.
   */
  flat?: boolean;

  /**
   * With this option, the user can set whether the component automatically selects the first matching result or not.
   * By default, the component will automatically select the first matching result, and will automatically change its value by keyboard navigation.
   * If set to false, the user will have to manually select the result either with a mouse click or by pressing the enter key.
   * Note that if this option is set to false, the option inlineAutocomplete must also be set to false, otherwise an error will be thrown.
   * This is because the completion string displayed in the textbox, when inlineAutocomplete is true,
   * shows the label of the (auto)selected first suggestion while there is never any autoselected first suggestion when autoSelect is false.
   */
  autoSelect?: boolean;

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
   * This option, when set to true, displays the user's input at the top of the list of results and considers the arbitrary user input as a valid input.
   *
   * With this option, the user is not limited to select one of the defined values in the list of results, but can instead select his exact string input value.
   * If the user does not explicitly select any suggestion, the string typed by the user will become the value of the autocomplete.
   * Note that this option can only be used when the Autocomplete is in manual mode.
   * In other words, if the value of this option is set to true, the option autoSelect must be set to false, otherwise, it would result in an error.
   * Autocomplete variant automatically selecting result matching the user's input, while also accepting the user's exact input is a valid use case, but has specific challenges to address.
   * For instance, when the user inputs "Par", which matches and autoselects "Paris - Gare de Lyon" in the result list, when the user really wants to just choose "Par",
   * it is necessary to make it clear how to cancel the automatic selection and accept "Par". For such reasons and the absence of immediate need, scope was restricted.
   */
  acceptArbitraryInput?: boolean;

  /**
   * A sentence to wrap around the result corresponding to the user's arbitrary input in the list of proposals.
   * This option only has an effect if the option acceptArbitraryInput is set to true.
   *
   * For example the sentence can be: "Search for 'arbitraryInput'", or "Add 'arbitraryInput' to the list".
   * The wording must thus include a parameter for the arbitrary input.
   * This wording will be passed through the "translateAndFormat" function.
   * The following property will be passed as the second argument:
   *
   *   - arbitraryInput: the arbitrary input that was typed by the user.
   */
  arbitraryInputWrappingWording?: string;

  /**
   * Specifies a leading icon that displays on the left side of the result corresponding to the user's arbitrary input.
   * This option only has an effect if the option acceptArbitraryInput is set to true.
   */
  arbitraryInputPrefixIcon?: string;

  /**
   * Max height of the results container in 'rem'
   */
  maxHeight?: number;

  /**
   * @ignore
   * Additional content ids describing the input which are external to the autocomplete component.
   * For now let's keep it private as it requires testing but it would be nice to open it.
   */
  additionalDescribedBy?: string;

  /**
   * Allows sticking the input field at the top of the container of a flat autocomplete and making the result container scroll "under" the input.
   *
   * Useful when autocomplete (input + proposals list) should span 100% of the height of its container
   * while still allowing the scroll down the full list of matching results without losing the input field from sight.
   *
   * Only compatible with flat autocomplete.
   *
   * maxHeight of the results container cannot be specified in such case as the results container will span to fit the wrapping container of the autocomplete vertically.
   */
  stickyInput?: boolean;
}
