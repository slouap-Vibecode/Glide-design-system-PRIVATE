import { AccessibilityHelper } from "@/helpers/accessibilityHelper";

export class ValidationKeyManager {
  private static readonly availableKeys: string[] = [];
  public static getKey(): string {
    let value;
    if (this.availableKeys.length > 0) {
      value = this.availableKeys.pop();
    }
    value ??= AccessibilityHelper.generateId();
    return value;
  }

  public static releaseKey(key: string) {
    this.availableKeys.push(key);
  }
}
