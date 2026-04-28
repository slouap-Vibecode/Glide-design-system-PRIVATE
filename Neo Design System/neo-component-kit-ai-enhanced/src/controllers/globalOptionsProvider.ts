import { INckGlobalOptions } from "@/models/iNckGlobalOptions";

export class GlobalOptionsProvider {
  public options: INckGlobalOptions | null;

  private static instance: GlobalOptionsProvider;

  private constructor() {
    this.options = null;
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new GlobalOptionsProvider();
    }
    return this.instance;
  }

  public static provideOptions(options: INckGlobalOptions) {
    this.getInstance().setOptions(options);
  }

  public getOptions() {
    return this.options;
  }

  private setOptions(options: INckGlobalOptions) {
    this.options = options;
  }
}
