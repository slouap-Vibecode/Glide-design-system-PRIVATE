export class ElementSelectionController {
  public static getPreviousNonDisabledElementIndex(
    items: Array<{ disabled?: boolean }>,
    currentSelectedIndex: number,
  ): number {
    let newSelectedIndex = -1;
    for (let i = currentSelectedIndex - 1; i >= 0; i--) {
      if (!items[i].disabled) {
        newSelectedIndex = i;
        break;
      }
    }

    if (newSelectedIndex < 0) {
      for (let i = items.length - 1; i > currentSelectedIndex; i--) {
        if (!items[i].disabled) {
          newSelectedIndex = i;
          break;
        }
      }
    }

    if (newSelectedIndex < 0) {
      // if still no value found, it means only current can be focused
      newSelectedIndex = currentSelectedIndex;
    }
    return newSelectedIndex;
  }

  public static getNextNonDisabledElementIndex(
    items: Array<{ disabled?: boolean }>,
    currentSelectedIndex: number,
  ): number {
    let newSelectedIndex = items.findIndex((option, index) => index > currentSelectedIndex && !option.disabled);
    if (newSelectedIndex < 0) {
      // go back at the beginning
      newSelectedIndex = items.findIndex((option, index) => index < currentSelectedIndex && !option.disabled);
      if (newSelectedIndex < 0) {
        // if still no value found, it means only current can be focused
        newSelectedIndex = currentSelectedIndex;
      }
    }

    return newSelectedIndex;
  }
}
