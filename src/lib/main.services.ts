import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { Slot } from "../types/types";
import { PAGE_LENGTH, SLOTS } from "./constants";

export function readCSVFile(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

export function loadPhoneModels() {
  const models: { name: string; path: string; brand: string }[] = [];
  const assetsPath = path.join(__dirname, "../..", "assets");
  const brands = ["iPhone", "Samsung", "Google Pixel"];

  for (const brand of brands) {
    const brandPath = path.join(assetsPath, brand);
    try {
      const files = fs.readdirSync(brandPath);
      files.forEach((file) => {
        if (file.endsWith(".svg")) {
          models.push({
            name: `${
              brand.charAt(0).toUpperCase() + brand.slice(1)
            } ${file.replace(".svg", "")}`,
            path: path.join(assetsPath, brand, file),
            brand: brand,
          });
        }
      });
    } catch (err) {
      console.error(`Erreur lors du chargement de ${brand}:`, err);
    }
  }

  return models;
}

export function loadTemplateSVG(): string {
  const templatePath = path.join(__dirname, "../..", "assets", "template.svg");
  const template = fs.readFileSync(templatePath, "utf-8");

  return template;
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
    .forEach(({ model: phonePath }, index) => {
      if (phonePath) {
        try {
          const phoneSvg = fs.readFileSync(phonePath, "utf-8");
          const slot = SLOTS[index];

          const svgContentMatch = phoneSvg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
          const phoneViewBoxMatch = phoneSvg.match(
            /<svg[^>]*viewBox="([^"]+)"[^>]*>/i
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
