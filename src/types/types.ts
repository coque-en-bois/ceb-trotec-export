export type PhoneModel = {
  name: string;
  brand: string;
  svgString: string;
};

export type Slot = {
  cmd: string;
  model: PhoneModel | null;
  visual: string;
};

export type CEBOrderCSVRow = {
  CMD: string;
  Modèle: string;
  Produit: string;
  Date: string;
  "Essence de bois": string;
  Intérieur: string;
  Quantité: string;
};
