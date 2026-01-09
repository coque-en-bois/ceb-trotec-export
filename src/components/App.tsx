import { useEffect, useState } from "react";
import { PAGE_LENGTH } from "../lib/constants";
import type { CEBOrderCSVRow, PhoneModel, Slot } from "../types/types";
import { SlotRow } from "./SlotRow";
import { parseCSVText } from "../lib/csv.utils";
import {
  generateSVG,
  loadPhoneModels,
  loadTemplateSVG,
} from "../lib/svg.utils";
import { PrintView } from "./PrintView";
import { adjustSlotsForPagination } from "../lib/slot";

export function App() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [curPage, setCurPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [availableModels, setAvailableModels] = useState<PhoneModel[]>([]);
  const [templateSvg, setTemplateSvg] = useState("");
  const [svgPreviews, setSvgPreviews] = useState([""]);

  // Init
  useEffect(() => {
    async function init() {
      const template = loadTemplateSVG();
      setTemplateSvg(template);

      const phones = loadPhoneModels();
      setAvailableModels(phones);
    }

    init();
  }, []);

  // Update previews
  useEffect(() => {
    const svgContent = generateSVG(templateSvg, slots, curPage);
    setSvgPreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews[curPage] = svgContent;
      return newPreviews;
    });
  }, [slots, templateSvg, curPage]);

  // Update total pages
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil((slots.length + 1) / PAGE_LENGTH));
    setTotalPages(totalPages);
    const preview = [];
    for (let page = 0; page < totalPages; page++) {
      const svgContent = generateSVG(templateSvg, slots, page);
      preview.push(svgContent);
    }
    setSvgPreviews(preview);
  }, [slots, templateSvg]);

  const exportSVG = async () => {
    svgPreviews.forEach((svgContent, page) => {
      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("download", `CEB_Trotec_Page_${page + 1}.svg`);
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  const importCSV = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv";

    fileInput.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const csvText = await file.text();
        const content = await parseCSVText(csvText);
        handleImportedCSV(content);
      }
    };
    fileInput.click();
  };

  const handleImportedCSV = (content: CEBOrderCSVRow[]) => {
    const importedSlots = content
      // Keep only cases with no custom engravings
      .filter((row: CEBOrderCSVRow) => {
        const visual = row["Produit"].split(" - ")[1];
        return (
          row.Produit &&
          row.Modèle &&
          row.Produit.startsWith("Coque") &&
          visual !== "La Personnalisable"
        );
      })
      .map((row: CEBOrderCSVRow) => {
        const modelName = row["Modèle"];
        const type = row["Essence de bois"];
        const inside = row["Intérieur"];
        const curModel = availableModels.find(
          (m) => m.name.toLowerCase() === modelName.toLowerCase()
        );

        return {
          cmd: row["CMD"],
          model: curModel || null,
          visual: row["Produit"].split(" - ")[1],
          type,
          inside,
        };
      });

    setSlots((prevSlots) => {
      const allAssemblage = importedSlots.filter(
        (slot) => slot.type === "Assemblage"
      );
      const allMerisier = importedSlots.filter(
        (slot) => slot.type === "Merisier"
      );
      const allNoyer = importedSlots.filter((slot) => slot.type === "Noyer");

      const newSlots = [
        ...adjustSlotsForPagination(prevSlots, PAGE_LENGTH),
        ...adjustSlotsForPagination(allAssemblage, PAGE_LENGTH),
        ...adjustSlotsForPagination(allMerisier, PAGE_LENGTH),
        ...adjustSlotsForPagination(allNoyer, PAGE_LENGTH),
      ];

      return newSlots;
    });
  };

  return (
    <>
      <div className="container">
        <header>
          <h1>🔷 CEB Trotec Export</h1>
        </header>

        <div className="controls">
          <div className="inner-controls">
            <button className="btn btn-success" onClick={importCSV}>
              Import CSV (CEB-Orders)
            </button>
            <button className="btn btn-danger" onClick={() => setSlots([])}>
              Ré-initialiser
            </button>
          </div>
          <div className="inner-controls">
            <button className="btn btn-success" onClick={exportSVG}>
              Export SVG
            </button>
            <button className="btn btn-success" onClick={() => window.print()}>
              Export PDF
            </button>
          </div>
        </div>

        <div className="table-container">
          <table id="dataTable">
            <thead>
              <tr>
                <th>Emplacement</th>
                <th>N° Commande</th>
                <th>Modèle</th>
                <th>Visuel</th>
                <th>Type</th>
                <th>Intérieur</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                ...slots,
                { cmd: "", model: null, visual: "", type: "", inside: "" },
              ]
                .slice(curPage * PAGE_LENGTH, (curPage + 1) * PAGE_LENGTH)
                .map((slot, index) => (
                  <SlotRow
                    key={index}
                    slotIndex={index + curPage * PAGE_LENGTH}
                    availableModels={availableModels}
                    onEditSlot={(newSlot: Slot | null) => {
                      const i = index + curPage * PAGE_LENGTH;
                      // Suppression
                      if (!newSlot) {
                        const newSlots = slots.filter((_, idx) => idx !== i);
                        setSlots(newSlots);
                      }
                      // Modification ou ajout si modification sur le dernier slot vide
                      else {
                        const isLast = slots.length === i;
                        const newSlots = [
                          ...slots,
                          ...(isLast
                            ? [
                                {
                                  cmd: "",
                                  model: null,
                                  visual: "",
                                  type: "",
                                  inside: "",
                                },
                              ]
                            : []),
                        ];
                        newSlots[i] = newSlot;
                        setSlots(newSlots);
                      }
                    }}
                    slot={slot}
                    isLast={slots.length === index + curPage * PAGE_LENGTH}
                  />
                ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            className="btn btn-secondary"
            onClick={() => setCurPage(Math.max(0, curPage - 1))}
            disabled={curPage === 0}
          >
            ◀️ Page Précédente
          </button>
          <span>
            Page {curPage + 1} / {totalPages}
          </span>

          <button
            className="btn btn-secondary"
            onClick={() => setCurPage(Math.min(totalPages - 1, curPage + 1))}
            disabled={curPage === totalPages - 1}
          >
            ▶️ Page Suivante
          </button>
        </div>

        <div className="preview-section">
          <h2>Prévisualisation du fichier de prod</h2>
          <div className="svg-preview">
            {svgPreviews[curPage] ? (
              <div dangerouslySetInnerHTML={{ __html: svgPreviews[curPage] }} />
            ) : (
              <p className="empty-state">Chargement du template...</p>
            )}
          </div>
        </div>
      </div>
      <PrintView svgPreviews={svgPreviews} />
    </>
  );
}
