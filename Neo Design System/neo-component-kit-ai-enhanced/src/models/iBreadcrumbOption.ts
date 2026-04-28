export interface IBreadcrumbOption {
  text: string;
  textSecondLine?: string;
  icon?: string;
  imageUrl?: string;
  iconOrImageAlternative?: string;
  counter?: boolean;
  errorState?: boolean;
  disabled?: boolean;
  onClick: () => void;
  tooltipHeading?: string;
  tooltipContent?: string;
}
