import { PAGE_LENGTH, SLOTS } from "./constants";
import type { PhoneModel, Slot } from "../types/types";
import template from "../assets/template.svg";

// Gravures

import abstract from "../assets/gravures/ABSTRACT.svg";
import alohaSummer from "../assets/gravures/ALOHA_SUMMER.svg";
import appolo from "../assets/gravures/APPOLO.svg";
import arbreDeVie from "../assets/gravures/ARBRE_DE_VIE.svg";
import arbre from "../assets/gravures/ARBRE.svg";
import aztec from "../assets/gravures/AZTEC.svg";
import bivouac from "../assets/gravures/BIVOUAC.svg";
import campsite from "../assets/gravures/CAMPSITE.svg";
import cerf from "../assets/gravures/CERF.svg";
import chillout from "../assets/gravures/CHILLOUT.svg";
import enAltitude from "../assets/gravures/EN_ALTITUDE.svg";
import exploratrice from "../assets/gravures/EXPLORATRICE.svg";
import madeByNature from "../assets/gravures/MADE_BY_NATURE.svg";
import mandalaSanskrit from "../assets/gravures/MANDALA_SANSKRIT.svg";
import petitCoinDeParadis from "../assets/gravures/PETIT_COIN_DE_PARADIS.svg";
import pommeDePin from "../assets/gravures/POMME_DE_PIN.svg";
import roseDesVents from "../assets/gravures/ROSE_DES_VENTS.svg";
import sinjak from "../assets/gravures/SINJAK.svg";
import surfTime from "../assets/gravures/SURF_TIME.svg";
import wavyStyle from "../assets/gravures/WAVY_STYLE.svg";
import winterHolidays from "../assets/gravures/WINTER_HOLIDAYS.svg";

// Google Pixel imports
import pixel4 from "../assets/Google Pixel/4.svg";
import pixel4a from "../assets/Google Pixel/4A.svg";
import pixel4a5G from "../assets/Google Pixel/4A-5G.svg";
import pixel5 from "../assets/Google Pixel/5.svg";
import pixel5a from "../assets/Google Pixel/5A.svg";
import pixel6 from "../assets/Google Pixel/6.svg";
import pixel6Pro from "../assets/Google Pixel/6-PRO.svg";
import pixel6a from "../assets/Google Pixel/6A.svg";
import pixel7 from "../assets/Google Pixel/7.svg";
import pixel7Pro from "../assets/Google Pixel/7-PRO.svg";
import pixel7a from "../assets/Google Pixel/7A.svg";
import pixel8 from "../assets/Google Pixel/8.svg";
import pixel8Pro from "../assets/Google Pixel/8-PRO.svg";
import pixel8a from "../assets/Google Pixel/8A.svg";
import pixel9 from "../assets/Google Pixel/9.svg";
import pixel9Pro from "../assets/Google Pixel/9-PRO.svg";
import pixel9a from "../assets/Google Pixel/9A.svg";
import pixel9ProXL from "../assets/Google Pixel/9-PRO-XL.svg";
import pixel10 from "../assets/Google Pixel/10.svg";
import pixel10Pro from "../assets/Google Pixel/10-PRO.svg";
import pixel10ProXL from "../assets/Google Pixel/10-PRO-XL.svg";

// Samsung imports
import samsungA05S from "../assets/Samsung/A05S.svg";
import samsungA13 from "../assets/Samsung/A13.svg";
import samsungA15 from "../assets/Samsung/A15.svg";
import samsungA20E from "../assets/Samsung/A20E.svg";
import samsungA22 from "../assets/Samsung/A22.svg";
import samsungA23 from "../assets/Samsung/A23.svg";
import samsungA25 from "../assets/Samsung/A25.svg";
import samsungA26 from "../assets/Samsung/A26.svg";
import samsungA32 from "../assets/Samsung/A32.svg";
import samsungA40 from "../assets/Samsung/A40.svg";
import samsungA50 from "../assets/Samsung/A50.svg";
import samsungA51 from "../assets/Samsung/A51.svg";
import samsungA52 from "../assets/Samsung/A52.svg";
import samsungA54 from "../assets/Samsung/A54.svg";
import samsungA55 from "../assets/Samsung/A55.svg";
import samsungA56 from "../assets/Samsung/A56.svg";

import samsungS10 from "../assets/Samsung/S10.svg";
import samsungS10E from "../assets/Samsung/S10E.svg";
import samsungS20 from "../assets/Samsung/S20.svg";
import samsungS20FE from "../assets/Samsung/S20FE.svg";

import samsungS21 from "../assets/Samsung/S21.svg";
import samsungS21FE from "../assets/Samsung/S21FE.svg";
import samsungS21Ultra from "../assets/Samsung/S21-ULTRA.svg";
import samsungS21Plus from "../assets/Samsung/S21-PLUS.svg";

import samsungS22Ultra from "../assets/Samsung/S22-ULTRA.svg";
import samsungS22Plus from "../assets/Samsung/S22-PLUS.svg";
import samsungS22 from "../assets/Samsung/S22.svg";

import samsungS23 from "../assets/Samsung/S23.svg";
import samsungS23Plus from "../assets/Samsung/S23-PLUS.svg";
import samsungS23Ultra from "../assets/Samsung/S23-ULTRA.svg";
import samsungS23FE from "../assets/Samsung/S23FE.svg";

import samsungS24 from "../assets/Samsung/S24.svg";
import samsungS24Plus from "../assets/Samsung/S24-PLUS.svg";
import samsungS24Ultra from "../assets/Samsung/S24-ULTRA.svg";
import samsungS24FE from "../assets/Samsung/S24FE.svg";

import samsungS25 from "../assets/Samsung/S25.svg";
import samsungS25Plus from "../assets/Samsung/S25-PLUS.svg";
import samsungS25Ultra from "../assets/Samsung/S25-ULTRA.svg";
import samsungS25FE from "../assets/Samsung/S25FE.svg";

// Samsung S24 is the only model we keep for now

// iPhone imports
import iphone6 from "../assets/iPhone/6-6S.svg";
import iphone6Plus from "../assets/iPhone/6PLUS-6SPLUS.svg";
import iphone7 from "../assets/iPhone/7-8.svg";
import iphone7Plus from "../assets/iPhone/7PLUS-8PLUS.svg";

import iphoneX from "../assets/iPhone/X-XS.svg";
import iphoneXR from "../assets/iPhone/XR.svg";
import iphoneXS from "../assets/iPhone/X-XS.svg";
import iphoneXSMax from "../assets/iPhone/XS-MAX.svg";

import iphone11 from "../assets/iPhone/11.svg";
import iphone11Pro from "../assets/iPhone/11PRO.svg";
import iphone11ProMax from "../assets/iPhone/11PRO-MAX.svg";

import iphone12 from "../assets/iPhone/12-12PRO.svg";
import iphone12Mini from "../assets/iPhone/12MINI.svg";
import iphone12Pro from "../assets/iPhone/12-12PRO.svg";
import iphone12ProMax from "../assets/iPhone/12PRO-MAX.svg";

import iphone13 from "../assets/iPhone/13.svg";
import iphone13Pro from "../assets/iPhone/13PRO.svg";
import iphone13ProMax from "../assets/iPhone/13PRO-MAX.svg";
import iphone13Mini from "../assets/iPhone/13MINI.svg";

import iphone14 from "../assets/iPhone/14.svg";
import iphone14Plus from "../assets/iPhone/14PLUS.svg";
import iphone14Pro from "../assets/iPhone/14PRO.svg";
import iphone14ProMax from "../assets/iPhone/14PRO-MAX.svg";

import iphone15 from "../assets/iPhone/15.svg";
import iphone15Plus from "../assets/iPhone/15PLUS.svg";
import iphone15Pro from "../assets/iPhone/15PRO.svg";
import iphone15ProMax from "../assets/iPhone/15PRO-MAX.svg";

import iphone16 from "../assets/iPhone/16.svg";
import iphone16Plus from "../assets/iPhone/16PLUS.svg";
import iphone16Pro from "../assets/iPhone/16PRO.svg";
import iphone16ProMax from "../assets/iPhone/16PRO-MAX.svg";
import iphone16e from "../assets/iPhone/16E.svg";

import iphone17 from "../assets/iPhone/17.svg";
import iphone17Pro from "../assets/iPhone/17PRO.svg";
import iphone17ProMax from "../assets/iPhone/17PRO-MAX.svg";
import iphone17Air from "../assets/iPhone/17AIR.svg";

const svgURLToString = (url: string): string =>
  decodeURI(url.replace(/^data:image\/svg\+xml,/, ""));

export function loadTemplateSVG(): string {
  return svgURLToString(template);
}

export function loadPhoneModels(): PhoneModel[] {
  const iPhoneModels = [
    {
      name: "iPhone 6 / 6s",
      svgString: svgURLToString(iphone6),
      brand: "iPhone",
    },
    {
      name: "iPhone 6 Plus / 6s Plus",
      svgString: svgURLToString(iphone6Plus),
      brand: "iPhone",
    },
    {
      name: "iPhone 7 / 8",
      svgString: svgURLToString(iphone7),
      brand: "iPhone",
    },
    {
      name: "iPhone 7 Plus / 8 Plus",
      svgString: svgURLToString(iphone7Plus),
      brand: "iPhone",
    },
    { name: "iPhone 11", svgString: svgURLToString(iphone11), brand: "iPhone" },
    {
      name: "iPhone 11 Pro",
      svgString: svgURLToString(iphone11Pro),
      brand: "iPhone",
    },
    {
      name: "iPhone 11 Pro Max",
      svgString: svgURLToString(iphone11ProMax),
      brand: "iPhone",
    },
    { name: "iPhone 12", svgString: svgURLToString(iphone12), brand: "iPhone" },
    {
      name: "iPhone 12 Mini",
      svgString: svgURLToString(iphone12Mini),
      brand: "iPhone",
    },
    {
      name: "iPhone 12 Pro",
      svgString: svgURLToString(iphone12Pro),
      brand: "iPhone",
    },
    {
      name: "iPhone 12 Pro Max",
      svgString: svgURLToString(iphone12ProMax),
      brand: "iPhone",
    },
    { name: "iPhone 13", svgString: svgURLToString(iphone13), brand: "iPhone" },
    {
      name: "iPhone 13 Mini",
      svgString: svgURLToString(iphone13Mini),
      brand: "iPhone",
    },
    {
      name: "iPhone 13 Pro",
      svgString: svgURLToString(iphone13Pro),
      brand: "iPhone",
    },
    {
      name: "iPhone 13 Pro Max",
      svgString: svgURLToString(iphone13ProMax),
      brand: "iPhone",
    },
    { name: "iPhone 14", svgString: svgURLToString(iphone14), brand: "iPhone" },
    {
      name: "iPhone 14 Plus",
      svgString: svgURLToString(iphone14Plus),
      brand: "iPhone",
    },
    {
      name: "iPhone 14 Pro",
      svgString: svgURLToString(iphone14Pro),
      brand: "iPhone",
    },
    {
      name: "iPhone 14 Pro Max",
      svgString: svgURLToString(iphone14ProMax),
      brand: "iPhone",
    },
    { name: "iPhone X", svgString: svgURLToString(iphoneX), brand: "iPhone" },
    { name: "iPhone XR", svgString: svgURLToString(iphoneXR), brand: "iPhone" },
    { name: "iPhone XS", svgString: svgURLToString(iphoneXS), brand: "iPhone" },
    {
      name: "iPhone XS Max",
      svgString: svgURLToString(iphoneXSMax),
      brand: "iPhone",
    },
    { name: "iPhone 15", svgString: svgURLToString(iphone15), brand: "iPhone" },
    {
      name: "iPhone 15 Plus",
      svgString: svgURLToString(iphone15Plus),
      brand: "iPhone",
    },
    {
      name: "iPhone 15 Pro",
      svgString: svgURLToString(iphone15Pro),
      brand: "iPhone",
    },
    {
      name: "iPhone 15 Pro Max",
      svgString: svgURLToString(iphone15ProMax),
      brand: "iPhone",
    },
    { name: "iPhone 16", svgString: svgURLToString(iphone16), brand: "iPhone" },
    {
      name: "iPhone 16 Plus",
      svgString: svgURLToString(iphone16Plus),
      brand: "iPhone",
    },
    {
      name: "iPhone 16 Pro",
      svgString: svgURLToString(iphone16Pro),
      brand: "iPhone",
    },
    {
      name: "iPhone 16 Pro Max",
      svgString: svgURLToString(iphone16ProMax),
      brand: "iPhone",
    },
    {
      name: "iPhone 16e",
      svgString: svgURLToString(iphone16e),
      brand: "iPhone",
    },

    { name: "iPhone 17", svgString: svgURLToString(iphone17), brand: "iPhone" },
    {
      name: "iPhone 17 Pro",
      svgString: svgURLToString(iphone17Pro),
      brand: "iPhone",
    },
    {
      name: "iPhone 17 Pro Max",
      svgString: svgURLToString(iphone17ProMax),
      brand: "iPhone",
    },
    {
      name: "iPhone 17 Air",
      svgString: svgURLToString(iphone17Air),
      brand: "iPhone",
    },
  ];

  const samsungModels = [
    {
      name: "Samsung A05S",
      svgString: svgURLToString(samsungA05S),
      brand: "Samsung",
    },
    {
      name: "Samsung A13",
      svgString: svgURLToString(samsungA13),
      brand: "Samsung",
    },
    {
      name: "Samsung A15",
      svgString: svgURLToString(samsungA15),
      brand: "Samsung",
    },
    {
      name: "Samsung A20E",
      svgString: svgURLToString(samsungA20E),
      brand: "Samsung",
    },
    {
      name: "Samsung A22 5G",
      svgString: svgURLToString(samsungA22),
      brand: "Samsung",
    },
    {
      name: "Samsung A23",
      svgString: svgURLToString(samsungA23),
      brand: "Samsung",
    },
    {
      name: "Samsung A25",
      svgString: svgURLToString(samsungA25),
      brand: "Samsung",
    },
    {
      name: "Samsung A26 5G",
      svgString: svgURLToString(samsungA26),
      brand: "Samsung",
    },
    {
      name: "Samsung A32 4G",
      svgString: svgURLToString(samsungA32),
      brand: "Samsung",
    },
    {
      name: "Samsung A40",
      svgString: svgURLToString(samsungA40),
      brand: "Samsung",
    },
    {
      name: "Samsung A50",
      svgString: svgURLToString(samsungA50),
      brand: "Samsung",
    },
    {
      name: "Samsung A51",
      svgString: svgURLToString(samsungA51),
      brand: "Samsung",
    },
    {
      name: "Samsung A52",
      svgString: svgURLToString(samsungA52),
      brand: "Samsung",
    },
    {
      name: "Samsung A54 5G",
      svgString: svgURLToString(samsungA54),
      brand: "Samsung",
    },
    {
      name: "Samsung A55 5G",
      svgString: svgURLToString(samsungA55),
      brand: "Samsung",
    },
    {
      name: "Samsung A56 5G",
      svgString: svgURLToString(samsungA56),
      brand: "Samsung",
    },
    {
      name: "Samsung S10",
      svgString: svgURLToString(samsungS10),
      brand: "Samsung",
    },
    {
      name: "Samsung S10E",
      svgString: svgURLToString(samsungS10E),
      brand: "Samsung",
    },
    {
      name: "Samsung S20",
      svgString: svgURLToString(samsungS20),
      brand: "Samsung",
    },
    {
      name: "Samsung S20FE",
      svgString: svgURLToString(samsungS20FE),
      brand: "Samsung",
    },
    {
      name: "Samsung S21",
      svgString: svgURLToString(samsungS21),
      brand: "Samsung",
    },
    {
      name: "Samsung S21FE",
      svgString: svgURLToString(samsungS21FE),
      brand: "Samsung",
    },
    {
      name: "Samsung S21+",
      svgString: svgURLToString(samsungS21Plus),
      brand: "Samsung",
    },
    {
      name: "Samsung S21 Ultra",
      svgString: svgURLToString(samsungS21Ultra),
      brand: "Samsung",
    },
    {
      name: "Samsung S22",
      svgString: svgURLToString(samsungS22),
      brand: "Samsung",
    },
    {
      name: "Samsung S22+",
      svgString: svgURLToString(samsungS22Plus),
      brand: "Samsung",
    },
    {
      name: "Samsung S22 Ultra",
      svgString: svgURLToString(samsungS22Ultra),
      brand: "Samsung",
    },
    {
      name: "Samsung S23",
      svgString: svgURLToString(samsungS23),
      brand: "Samsung",
    },
    {
      name: "Samsung S23+",
      svgString: svgURLToString(samsungS23Plus),
      brand: "Samsung",
    },
    {
      name: "Samsung S23 Ultra",
      svgString: svgURLToString(samsungS23Ultra),
      brand: "Samsung",
    },
    {
      name: "Samsung S23FE",
      svgString: svgURLToString(samsungS23FE),
      brand: "Samsung",
    },
    {
      name: "Samsung S24",
      svgString: svgURLToString(samsungS24),
      brand: "Samsung",
    },
    {
      name: "Samsung S24+",
      svgString: svgURLToString(samsungS24Plus),
      brand: "Samsung",
    },
    {
      name: "Samsung S24 Ultra",
      svgString: svgURLToString(samsungS24Ultra),
      brand: "Samsung",
    },
    {
      name: "Samsung S24FE",
      svgString: svgURLToString(samsungS24FE),
      brand: "Samsung",
    },
    {
      name: "Samsung S25",
      svgString: svgURLToString(samsungS25),
      brand: "Samsung",
    },
    {
      name: "Samsung S25+",
      svgString: svgURLToString(samsungS25Plus),
      brand: "Samsung",
    },
    {
      name: "Samsung S25 Ultra",
      svgString: svgURLToString(samsungS25Ultra),
      brand: "Samsung",
    },
    {
      name: "Samsung S25FE",
      svgString: svgURLToString(samsungS25FE),
      brand: "Samsung",
    },
  ];

  const googlePixelModels = [
    {
      name: "Google Pixel 4",
      svgString: svgURLToString(pixel4),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 4a",
      svgString: svgURLToString(pixel4a),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 4a 5G",
      svgString: svgURLToString(pixel4a5G),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 5",
      svgString: svgURLToString(pixel5),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 5a",
      svgString: svgURLToString(pixel5a),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 6",
      svgString: svgURLToString(pixel6),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 6a",
      svgString: svgURLToString(pixel6a),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 6 Pro",
      svgString: svgURLToString(pixel6Pro),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 7",
      svgString: svgURLToString(pixel7),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 7a",
      svgString: svgURLToString(pixel7a),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 7 Pro",
      svgString: svgURLToString(pixel7Pro),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 8",
      svgString: svgURLToString(pixel8),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 8a",
      svgString: svgURLToString(pixel8a),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 8 Pro",
      svgString: svgURLToString(pixel8Pro),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 9",
      svgString: svgURLToString(pixel9),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 9a",
      svgString: svgURLToString(pixel9a),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 9 Pro",
      svgString: svgURLToString(pixel9Pro),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 9 Pro XL",
      svgString: svgURLToString(pixel9ProXL),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 10",
      svgString: svgURLToString(pixel10),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 10 Pro",
      svgString: svgURLToString(pixel10Pro),
      brand: "Google Pixel",
    },
    {
      name: "Google Pixel 10 Pro XL",
      svgString: svgURLToString(pixel10ProXL),
      brand: "Google Pixel",
    },
  ];

  return [...iPhoneModels, ...samsungModels, ...googlePixelModels];
}

export function getGravure(
  name: string
): { svgString: string; position: "full" | "centered" | "default" } | null {
  const gravures: Record<
    string,
    { svgString: string; position: "full" | "centered" | "default" }
  > = {
    ["L'Abstract"]: { svgString: svgURLToString(abstract), position: "full" },
    ["Aloha Summer"]: {
      svgString: svgURLToString(alohaSummer),
      position: "centered",
    },
    ["Appolo"]: { svgString: svgURLToString(appolo), position: "full" },
    ["L'Arbre de Vie"]: {
      svgString: svgURLToString(arbreDeVie),
      position: "centered",
    },
    ["L'Arbre"]: { svgString: svgURLToString(arbre), position: "default" },
    ["L'Aztec"]: { svgString: svgURLToString(aztec), position: "full" },
    ["Le Bivouac"]: {
      svgString: svgURLToString(bivouac),
      position: "centered",
    },
    ["Le Campsite"]: {
      svgString: svgURLToString(campsite),
      position: "default",
    },
    ["Le Cerf"]: { svgString: svgURLToString(cerf), position: "centered" },
    ["La Chill Out"]: {
      svgString: svgURLToString(chillout),
      position: "centered",
    },
    ["En Altitude"]: {
      svgString: svgURLToString(enAltitude),
      position: "centered",
    },
    ["L'Exploratrice"]: {
      svgString: svgURLToString(exploratrice),
      position: "full",
    },
    ["Made By Nature"]: {
      svgString: svgURLToString(madeByNature),
      position: "centered",
    },
    ["Le Mandala Sanskrit"]: {
      svgString: svgURLToString(mandalaSanskrit),
      position: "default",
    },
    ["Le Petit Coin de Paradis"]: {
      svgString: svgURLToString(petitCoinDeParadis),
      position: "centered",
    },
    ["La Pomme de Pin"]: {
      svgString: svgURLToString(pommeDePin),
      position: "full",
    },
    ["La Rose des Vents"]: {
      svgString: svgURLToString(roseDesVents),
      position: "default",
    },
    ["La Sinjak"]: { svgString: svgURLToString(sinjak), position: "full" },
    ["Surf Time"]: { svgString: svgURLToString(surfTime), position: "default" },
    ["Le Wavy Style"]: {
      svgString: svgURLToString(wavyStyle),
      position: "full",
    },
    ["Winter Holidays"]: {
      svgString: svgURLToString(winterHolidays),
      position: "default",
    },
  };

  return gravures[name] || null;
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
    .forEach(({ model, visual, cmd, inside }, index) => {
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
            const phoneContourPath = svgContentMatch[1];

            const phoneViewBox = phoneViewBoxMatch[1].split(" ").map(Number);
            const phoneViewBoxWidth = phoneViewBox[2];
            const phoneViewBoxHeight = phoneViewBox[3];

            const translateX = slot.x + slot.width / 2 - phoneViewBoxWidth / 2;
            const translateY =
              slot.y + slot.height / 2 - phoneViewBoxHeight / 2;

            let gravurePath = "";
            let gravurePosition = "";
            let gravureViewBoxWidth = 0;
            let gravureViewBoxHeight = 0;
            const gravureObj = getGravure(visual);
            if (gravureObj) {
              const { svgString: gravure, position } = gravureObj;
              gravurePosition = position;
              const gravureContentMatch = gravure.match(
                /<svg[^>]*>([\s\S]*)<\/svg>/i
              );
              if (gravureContentMatch) {
                gravurePath = gravureContentMatch[1];

                const gravureViewBoxMatch = gravure.match(
                  /<svg[^>]*viewBox='([^']+)'[^>]*>/i
                );
                if (gravureViewBoxMatch) {
                  const gravureViewBox = gravureViewBoxMatch[1]
                    .split(" ")
                    .map(Number);
                  gravureViewBoxWidth = gravureViewBox[2];
                  gravureViewBoxHeight = gravureViewBox[3];
                }
              }
            }

            phonesContent += `
    <g transform="translate(${translateX}, ${translateY})">
      ${phoneContourPath}
      <text x="${phoneViewBoxWidth / 2}" y="${
              phoneViewBoxHeight / 2
            }" font-size="20" text-anchor="middle" fill="#936037">${cmd}</text>
      <text x="${phoneViewBoxWidth / 2}" y="${
              phoneViewBoxHeight / 2 + 30
            }" font-size="20" text-anchor="middle" fill="#936037">${modelName}</text>
      <text x="${phoneViewBoxWidth / 2}" y="${
              phoneViewBoxHeight / 2 + 60
            }" font-size="20" text-anchor="middle" fill="#936037">${visual}</text>
      <text x="${phoneViewBoxWidth / 2}" y="${
              phoneViewBoxHeight / 2 + 90
            }" font-size="16" text-anchor="middle" fill="#936037">${inside}</text>
      ${
        gravurePath && gravurePosition === "full"
          ? `<g transform="scale(${phoneViewBoxWidth / gravureViewBoxWidth}, ${
              phoneViewBoxHeight / gravureViewBoxHeight
            })" >${gravurePath}</g>`
          : gravurePath && gravurePosition === "centered"
          ? `<g transform="translate(${
              (phoneViewBoxWidth - gravureViewBoxWidth) / 2
            }, ${
              (phoneViewBoxHeight -
                gravureViewBoxHeight +
                phoneViewBoxHeight / 3) /
              2
            })">${gravurePath}</g>`
          : gravurePath
          ? `<g transform="scale(${
              phoneViewBoxWidth / gravureViewBoxWidth
            }) translate(0, ${
              phoneViewBoxHeight -
              gravureViewBoxHeight * (phoneViewBoxWidth / gravureViewBoxWidth)
            })">${gravurePath}</g>`
          : ""
      }
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
