import { DirectiveBinding } from "vue";

type PlacementBinding = "left" | "right" | "top" | "bottom";

const PLACEMENTS: PlacementBinding[] = ["left", "right", "top", "bottom"];

const DEFAULT_PLACEMENT: PlacementBinding = "top";

const OPPOSITE_PLACEMENTS_MAP = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right",
};

/**
 * Retrieves the placement set on a directive, if present
 * The only values allowed are those from the PLACEMENTS array
 * @param binding the initial directive bindings, from which to read one of the placement modifiers
 */
function getPlacement(binding: DirectiveBinding): PlacementBinding {
  if (binding?.modifiers) {
    return PLACEMENTS.find((placement) => binding.modifiers[placement]) ?? DEFAULT_PLACEMENT;
  }
  return DEFAULT_PLACEMENT;
}

function getOppositePlacement(placement: PlacementBinding) {
  return OPPOSITE_PLACEMENTS_MAP[placement];
}

export { PlacementBinding, getPlacement, getOppositePlacement };
