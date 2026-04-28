export {};

declare global {
  interface Window {
    neoIconsPromiseMap: Map<string, Promise<string>>;
  }
}
