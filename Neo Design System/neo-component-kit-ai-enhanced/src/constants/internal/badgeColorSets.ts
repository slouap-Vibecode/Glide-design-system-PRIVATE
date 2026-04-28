import { BadgeColor } from "../badgeColor";
import { BadgeType } from "../badgeType";
import { Colors } from "../colors";
import { IconColors } from "../iconColors";

export interface IBadgeColorsProperties {
  backgroundColor: Colors;
  labelColor: Colors;
  iconColor: IconColors;
  borderColor?: Colors;
}

interface IBadgeColorSetItem {
  [BadgeType.OUTLINE]: IBadgeColorsProperties;
  [BadgeType.SOLID]: IBadgeColorsProperties;
  [BadgeType.SUBTLE]: IBadgeColorsProperties;
}

type BadgeColorSets = Record<BadgeColor, IBadgeColorSetItem>;

export const badgeColorSets: BadgeColorSets = {
  "blue-grey": {
    [BadgeType.OUTLINE]: {
      backgroundColor: Colors.WHITE,
      labelColor: Colors.INK_100,
      iconColor: IconColors.BLUE_GREY_700,
      borderColor: Colors.BLUE_GREY_700,
    },
    [BadgeType.SOLID]: {
      backgroundColor: Colors.BLUE_GREY_600,
      labelColor: Colors.WHITE,
      iconColor: IconColors.WHITE,
    },
    [BadgeType.SUBTLE]: {
      backgroundColor: Colors.BLUE_GREY_200,
      labelColor: Colors.INK_100,
      iconColor: IconColors.BLUE_GREY_700,
    },
  },
  "bright-blue": {
    [BadgeType.OUTLINE]: {
      backgroundColor: Colors.WHITE,
      labelColor: Colors.BRIGHT_BLUE_300,
      iconColor: IconColors.BRIGHT_BLUE_300,
      borderColor: Colors.BRIGHT_BLUE_300,
    },
    [BadgeType.SOLID]: {
      backgroundColor: Colors.BRIGHT_BLUE_300,
      labelColor: Colors.WHITE,
      iconColor: IconColors.WHITE,
    },
    [BadgeType.SUBTLE]: {
      backgroundColor: Colors.BRIGHT_BLUE_100,
      labelColor: Colors.BRIGHT_BLUE_300,
      iconColor: IconColors.BRIGHT_BLUE_300,
    },
  },
  "deep-blue": {
    [BadgeType.OUTLINE]: {
      backgroundColor: Colors.WHITE,
      labelColor: Colors.DEEP_BLUE_300,
      iconColor: IconColors.DEEP_BLUE_300,
      borderColor: Colors.DEEP_BLUE_300,
    },
    [BadgeType.SOLID]: {
      backgroundColor: Colors.DEEP_BLUE_300,
      labelColor: Colors.WHITE,
      iconColor: IconColors.WHITE,
    },
    [BadgeType.SUBTLE]: {
      backgroundColor: Colors.DEEP_BLUE_100,
      labelColor: Colors.DEEP_BLUE_300,
      iconColor: IconColors.DEEP_BLUE_300,
    },
  },
  green: {
    [BadgeType.OUTLINE]: {
      backgroundColor: Colors.WHITE,
      labelColor: Colors.GREEN_300,
      iconColor: IconColors.GREEN_300,
      borderColor: Colors.GREEN_300,
    },
    [BadgeType.SOLID]: {
      backgroundColor: Colors.GREEN_300,
      labelColor: Colors.WHITE,
      iconColor: IconColors.WHITE,
    },
    [BadgeType.SUBTLE]: {
      backgroundColor: Colors.GREEN_100,
      labelColor: Colors.GREEN_300,
      iconColor: IconColors.GREEN_300,
    },
  },
  orange: {
    [BadgeType.OUTLINE]: {
      backgroundColor: Colors.WHITE,
      labelColor: Colors.ORANGE_400,
      iconColor: IconColors.ORANGE_400,
      borderColor: Colors.ORANGE_400,
    },
    [BadgeType.SOLID]: {
      backgroundColor: Colors.ORANGE_400,
      labelColor: Colors.WHITE,
      iconColor: IconColors.WHITE,
    },
    [BadgeType.SUBTLE]: {
      backgroundColor: Colors.ORANGE_100,
      labelColor: Colors.ORANGE_400,
      iconColor: IconColors.ORANGE_400,
    },
  },
  red: {
    [BadgeType.OUTLINE]: {
      backgroundColor: Colors.WHITE,
      labelColor: Colors.RED_300,
      iconColor: IconColors.RED_300,
      borderColor: Colors.RED_300,
    },
    [BadgeType.SOLID]: {
      backgroundColor: Colors.RED_300,
      labelColor: Colors.WHITE,
      iconColor: IconColors.WHITE,
    },
    [BadgeType.SUBTLE]: {
      backgroundColor: Colors.RED_100,
      labelColor: Colors.RED_300,
      iconColor: IconColors.RED_300,
    },
  },
  white: {
    [BadgeType.OUTLINE]: {
      backgroundColor: Colors.WHITE,
      labelColor: Colors.INK_70,
      iconColor: IconColors.BLUE_GREY_600,
      borderColor: Colors.BLUE_GREY_400,
    },
    [BadgeType.SOLID]: {
      backgroundColor: Colors.WHITE,
      labelColor: Colors.INK_70,
      iconColor: IconColors.BLUE_GREY_600,
    },
    [BadgeType.SUBTLE]: {
      backgroundColor: Colors.WHITE,
      labelColor: Colors.INK_70,
      iconColor: IconColors.BLUE_GREY_600,
    },
  },
  yellow: {
    [BadgeType.OUTLINE]: {
      backgroundColor: Colors.WHITE,
      labelColor: Colors.YELLOW_400,
      iconColor: IconColors.YELLOW_400,
      borderColor: Colors.YELLOW_400,
    },
    [BadgeType.SOLID]: {
      backgroundColor: Colors.YELLOW_300,
      labelColor: Colors.INK_100,
      iconColor: IconColors.BLUE_GREY_700,
    },
    [BadgeType.SUBTLE]: {
      backgroundColor: Colors.YELLOW_100,
      labelColor: Colors.YELLOW_400,
      iconColor: IconColors.YELLOW_400,
    },
  },
};
