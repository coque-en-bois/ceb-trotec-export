import type { Slot } from "../types/types";

export const getEmptySlot = (num: number, type: string) => {
  return Array.from({ length: num }, () => ({
    cmd: "",
    model: null,
    visual: "",
    type,
    inside: "",
  }));
};

export const adjustSlotsForPagination = (slots: Slot[], pageLength: number) => {
  if (slots.length % pageLength === 0) {
    return slots;
  } else {
    const emptySlotsNeeded = pageLength - (slots.length % pageLength);
    return [...slots, ...getEmptySlot(emptySlotsNeeded, slots[0]?.type || "")];
  }
};

const removeDuplicateSlots = (acc: Slot[], slot: Slot) => {
  const id = `${slot.cmd}-${slot.model ? slot.model.name : ""}-${slot.visual}-${slot.type}-${slot.inside}`;
  if (
    !acc.find((s) => {
      const existingId = `${s.cmd}-${s.model ? s.model.name : ""}-${s.visual}-${s.type}-${s.inside}`;
      return existingId === id;
    })
  ) {
    acc.push(slot);
  }
  return acc;
};

export const paginateSlotsByType = (
  oldSlots: Slot[],
  newSlots: Slot[],
  pageLength: number,
) => {
  const allSlots = [...oldSlots, ...newSlots];

  const allAssemblage = allSlots
    .filter((slot) => slot.type === "Assemblage")
    .reduce<Slot[]>(removeDuplicateSlots, []);
  const allMerisier = allSlots
    .filter((slot) => slot.type === "Merisier")
    .reduce<Slot[]>(removeDuplicateSlots, []);

  const allÉrable = allSlots
    .filter((slot) => slot.type === "Érable")
    .reduce<Slot[]>(removeDuplicateSlots, []);

  const slots = [
    ...adjustSlotsForPagination(allAssemblage, pageLength),
    ...adjustSlotsForPagination(allMerisier, pageLength),
    ...adjustSlotsForPagination(allÉrable, pageLength),
  ];

  return slots;
};
