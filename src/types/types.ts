export type Slot = {
  cmd: string;
  model: string | null;
  visual: string;
};

export type CEBOrderCSVRow = {
  '"CMD"': string;
  Modèle: string;
  Produit: string;
  Date: string;
  "Essence de bois": string;
  Intérieur: string;
  Quantité: string;
};
