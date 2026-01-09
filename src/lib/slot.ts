import type { Slot } from "../types/types";

export const getEmptySlot = (num: number) => {
  return Array.from({ length: num }, () => ({
    cmd: "",
    model: null,
    visual: "",
    type: "",
    inside: "",
  }));
};

export const adjustSlotsForPagination = (slots: Slot[], pageLength: number) => {
  if (slots.length % pageLength === 0) {
    return slots;
  } else {
    const emptySlotsNeeded = pageLength - (slots.length % pageLength);
    return [...slots, ...getEmptySlot(emptySlotsNeeded)];
  }
};
