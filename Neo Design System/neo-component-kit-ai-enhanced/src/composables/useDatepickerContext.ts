import type { IDatepickerRangeProperties } from "@/components/interfaces/internal/iDatepickerRangeProperties";
import { PropsWithDefaults } from "@/helpers/propsWithDefaults";
import type { IDateWithRange } from "@/models/iDateWithRange";
import { InjectionKey, provide, inject } from "vue";

interface IDatepickerRangePropertiesDefaults {
  modelValue: [IDateWithRange | Date | null, IDateWithRange | Date | null];
  isRange: true;
}

type IDatepickerContextData = PropsWithDefaults<IDatepickerRangeProperties, IDatepickerRangePropertiesDefaults>;

const INTERNAL_DATEPICKER_GENERIC_COMMON_PROPERTIES_INJECTION_KEY: InjectionKey<IDatepickerContextData> = Symbol(
  "INTERNAL_DATEPICKER_GENERIC_COMMON_PROPERTIES_INJECTION_KEY",
);

function provideDatepickerContext(props: IDatepickerContextData): void {
  return provide(INTERNAL_DATEPICKER_GENERIC_COMMON_PROPERTIES_INJECTION_KEY, props);
}

function injectDatepickerContext(): IDatepickerContextData {
  const injected = inject(INTERNAL_DATEPICKER_GENERIC_COMMON_PROPERTIES_INJECTION_KEY);

  if (!injected) {
    throw new Error(`missing internal datepicker context`);
  }

  return injected;
}

export function useDatepickerContext() {
  return {
    provideDatepickerContext,
    injectDatepickerContext,
  };
}
