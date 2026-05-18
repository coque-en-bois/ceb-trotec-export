export const SLOTS = [
  { x: 39.3, y: 52.8, width: 238.1, height: 479.1 },
  { x: 307.8, y: 52.8, width: 238.1, height: 479.1 },
  { x: 576.2, y: 52.8, width: 238.1, height: 479.1 },
  { x: 844.7, y: 52.8, width: 238.1, height: 479.1 },
  { x: 1113.2, y: 52.8, width: 238.1, height: 479.1 },
  { x: 1381.7, y: 52.8, width: 238.1, height: 479.1 },
  { x: 1650.2, y: 52.8, width: 238.1, height: 479.1 },
  { x: 39.3, y: 573.6, width: 238.1, height: 479.1 },
  { x: 307.8, y: 573.6, width: 238.1, height: 479.1 },
  { x: 576.2, y: 573.6, width: 238.1, height: 479.1 },
  { x: 844.7, y: 573.6, width: 238.1, height: 479.1 },
  { x: 1113.2, y: 573.6, width: 238.1, height: 479.1 },
  { x: 1381.7, y: 573.6, width: 238.1, height: 479.1 },
  { x: 1650.2, y: 573.6, width: 238.1, height: 479.1 },
];

export const PAGE_LENGTH = SLOTS.length;

// Visuels qui doivent être traités comme "Assemblage CHF" (chêne fumé)
// lorsqu'ils sont importés avec l'essence "Assemblage".
export const CHF_VISUALS = ["Le Loup", "Le Triangle", "L'Ancre", "La Skull"];

export const inferType = (type: string, visual: string): string => {
  if (type === "Assemblage" && CHF_VISUALS.includes(visual)) {
    return "Assemblage CHF";
  }
  return type;
};
