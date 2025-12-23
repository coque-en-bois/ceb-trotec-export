import template from "../assets/template.svg";

// Google Pixel imports
import pixel9 from "../assets/Google Pixel/9.svg";

// Samsung imports
import samsungS24 from "../assets/Samsung/S24.svg";

// iPhone imports
import iphone15 from "../assets/iPhone/15.svg";
import { PAGE_LENGTH, SLOTS } from "./constants";
import type { PhoneModel, Slot } from "../types/types";

const svgURLToString = (url: string): string =>
  decodeURI(url.replace(/^data:image\/svg\+xml,/, ""));

export function loadTemplateSVG(): string {
  return svgURLToString(template);
}

export function loadPhoneModels(): PhoneModel[] {
  const iPhoneModels = [
    { name: "iPhone 15", svgString: svgURLToString(iphone15), brand: "iPhone" },
  ];

  const samsungModels = [
    {
      name: "Samsung S24",
      svgString: svgURLToString(samsungS24),
      brand: "Samsung",
    },
  ];

  const googlePixelModels = [
    {
      name: "Google Pixel 9",
      svgString: svgURLToString(pixel9),
      brand: "Google Pixel",
    },
  ];

  return [...iPhoneModels, ...samsungModels, ...googlePixelModels];
}

export function generateSVG(
  templateSvg: string,
  slots: Slot[],
  curPage: number
) {
  if (!templateSvg) return "";

  let phonesContent = "";

  slots
    .slice(curPage * PAGE_LENGTH, (curPage + 1) * PAGE_LENGTH)
    .forEach(({ model, visual, cmd }, index) => {
      if (model) {
        const { name: modelName, svgString: modelSvgString } = model;
        try {
          const slot = SLOTS[index];

          const svgContentMatch = modelSvgString.match(
            /<svg[^>]*>([\s\S]*)<\/svg>/i
          );
          const phoneViewBoxMatch = modelSvgString.match(
            /<svg[^>]*viewBox='([^']+)'[^>]*>/i
          );

          if (svgContentMatch && phoneViewBoxMatch) {
            const content = svgContentMatch[1];

            const phoneViewBox = phoneViewBoxMatch[1].split(" ").map(Number);
            const phoneViewBoxWidth = phoneViewBox[2];
            const phoneViewBoxHeight = phoneViewBox[3];

            const translateX = slot.x + slot.width / 2 - phoneViewBoxWidth / 2;
            const translateY =
              slot.y + slot.height / 2 - phoneViewBoxHeight / 2;

            phonesContent += `
    <g transform="translate(${translateX}, ${translateY})">
      <text x="${phoneViewBoxWidth / 2}" y="${
              phoneViewBoxHeight / 2
            }" font-size="20" text-anchor="middle" fill="#936037">${cmd}</text>
      <text x="${phoneViewBoxWidth / 2}" y="${
              phoneViewBoxHeight / 2 + 30
            }" font-size="20" text-anchor="middle" fill="#936037">${modelName}</text>
      <text x="${phoneViewBoxWidth / 2}" y="${
              phoneViewBoxHeight / 2 + 60
            }" font-size="20" text-anchor="middle" fill="#936037">${visual}</text>
      ${content}
    </g>`;
          }
        } catch (err) {
          console.error(
            `Erreur lors du chargement du smartphone ${index}:`,
            err
          );
        }
      }
    });

  const finalSvg = templateSvg.replace("</svg>", `${phonesContent}\n</svg>`);

  return finalSvg;
}
