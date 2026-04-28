export class AccessibilityHelper {
  public static generateId() {
    // an ID needs to start with a letter
    return "ah" + (Math.random() * 100000).toString(36).replace(/\./g, "_"); // dot in ID is causing query selector because it sees it as a class, so let's remove
  }
}
