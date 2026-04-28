export class Debouncer {
  private readonly debounceTime: number;
  private activeTimeout: number;

  constructor(debounceTime: number) {
    this.debounceTime = debounceTime;
    this.activeTimeout = -1;
  }

  public delay(fn: () => void) {
    this.cancelDelay();
    this.activeTimeout = setTimeout(fn, this.debounceTime);
  }

  public cancelDelay() {
    if (this.activeTimeout >= 0) {
      clearTimeout(this.activeTimeout);
      this.activeTimeout = -1;
    }
  }
}
