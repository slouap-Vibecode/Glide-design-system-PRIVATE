import { IDatepickerCommonProperties } from "@/components/interfaces/internal/iDatepickerCommonProperties";

type targetKeys = keyof Pick<IDatepickerCommonProperties, "beforeMinDateErrorMessage" | "afterMaxDateErrorMessage">;

export function getErrorMessageOrKill(props: IDatepickerCommonProperties, keyToLookup: targetKeys): string {
  if (!props[keyToLookup]) {
    throw new Error(`Error: you must provide the '${keyToLookup}' option`);
  }
  return props[keyToLookup];
}
