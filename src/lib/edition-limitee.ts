export const VISUALS_EDITION_LIMITEE_MAX = {
  "Le Toucan (Édition limitée)": {
    name: "Le Toucan",
    max: 50,
    edition: "Jungle Fluo",
  },
  "Le Tigre (Édition limitée)": {
    name: "Le Tigre",
    max: 50,
    edition: "Jungle Fluo",
  },
};

type LocalStorageEditionLimiteeData = {
  cmd: string;
  quantity: number;
};

export const updateRemainingEditionLimit = (
  visual: string,
  data: LocalStorageEditionLimiteeData,
): void => {
  const existingData = localStorage.getItem(`edition-limitee-${visual}`);
  const parsedData: LocalStorageEditionLimiteeData[] = JSON.parse(
    existingData || "[]",
  );

  const updatedData = new Set(
    [...parsedData, data].map((item) => JSON.stringify(item)),
  );
  localStorage.setItem(
    `edition-limitee-${visual}`,
    `[${[...updatedData].join(",")}]`,
  );
};

export const getCountEditionLimit = (visual: string): number => {
  const data = localStorage.getItem(`edition-limitee-${visual}`);
  if (!data) {
    return 0;
  }

  const parsedData: LocalStorageEditionLimiteeData[] = JSON.parse(data);
  return parsedData.reduce((total, item) => total + item.quantity, 0);
};

export const getEditionLimiteeData = (
  visualName: keyof typeof VISUALS_EDITION_LIMITEE_MAX,
  cmd: string,
): {
  editionName: string;
  visualNameCleaned: string;
  currentCount: number;
  maxCount: number;
} => {
  const editionInfo = VISUALS_EDITION_LIMITEE_MAX[visualName];

  if (!editionInfo) {
    throw new Error(`No edition info found for visual: ${visualName}`);
  }

  const visualNameCleaned = visualName.replace(
    /\s*\(Édition limitée\)\s*/g,
    "",
  ) as keyof typeof VISUALS_EDITION_LIMITEE_MAX;

  const visualNameSlug = visualNameCleaned.toLowerCase().replace(/\s+/g, "-");

  updateRemainingEditionLimit(visualNameSlug, { cmd, quantity: 1 });

  const editionName = editionInfo.edition;
  const maxCount = editionInfo.max;
  const currentCount = getCountEditionLimit(visualNameSlug);

  return {
    editionName,
    visualNameCleaned,
    currentCount,
    maxCount,
  };
};
