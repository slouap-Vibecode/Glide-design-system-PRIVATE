export class ScrollListener {
  private readonly onScroll: (event: Event) => void;

  constructor(onScrollInner: () => void) {
    this.onScroll = () => {
      onScrollInner();
      this.stop();
    };
  }

  public start() {
    document.addEventListener("scroll", this.onScroll, true);
  }

  public stop() {
    document.removeEventListener("scroll", this.onScroll, true);
  }
}
