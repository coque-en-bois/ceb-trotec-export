/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />

declare global {
  interface Window {
    nodeAPI: {
      ipcRenderer: typeof import("electron").ipcRenderer;
      loadTemplateSVG: () => Promise<string>;
      loadPhoneModels: () => Promise<
        { name: string; path: string; brand: string }[]
      >;
      generateSVG: (
        templateSvg: string,
        slots: Slot[],
        curPage: number,
        PAGE_LENGTH: number,
        SLOTS: { x: number; y: number; width: number; height: number }[]
      ) => string;
    };
  }
}
