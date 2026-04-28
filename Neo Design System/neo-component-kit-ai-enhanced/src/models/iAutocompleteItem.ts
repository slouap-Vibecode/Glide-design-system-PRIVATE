import { IMenuItem } from "./iMenuItem";

export interface IAutocompleteItem<Data = unknown> extends IMenuItem<Data> {
  labelOverrideForMenu?: string;
}
