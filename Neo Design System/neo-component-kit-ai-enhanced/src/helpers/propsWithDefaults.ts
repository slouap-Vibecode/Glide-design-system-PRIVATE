// Utility types
type NotUndefined<T> = T extends undefined ? never : T;

// The PropsWithDefaults type from vue 2.7
export type PropsWithDefaults<Base, Defaults> = Base & {
  [K in keyof Defaults]: K extends keyof Base
    ? Defaults[K] extends undefined
      ? Base[K]
      : NotUndefined<Base[K]>
    : never;
};
