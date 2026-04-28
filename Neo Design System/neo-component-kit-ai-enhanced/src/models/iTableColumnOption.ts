import { TextAlignment } from "../constants/textAlignment";
import { SortOrder } from "../constants/sortOrder";

export interface ITableColumnOptions {
  headerLabel: string;
  slotName?: string;
  dataPath?: string;
  width?: string;
  headerAlignment?: TextAlignment;
  rowAlignment?: TextAlignment;
  onSort?: (newSort: SortOrder) => Promise<undefined> | undefined;
}
