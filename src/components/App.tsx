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

export function App() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [curPage, setCurPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [availableModels, setAvailableModels] = useState<PhoneModel[]>([]);
  const [templateSvg, setTemplateSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

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

  // Update preview
  useEffect(() => {
    const svgContent = generateSVG(templateSvg, slots, curPage);
    setSvgPreview(svgContent);
  }, [slots, templateSvg, curPage]);

  // Update total pages
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(slots.length / PAGE_LENGTH)));
  }, [slots]);

  const exportSVG = async () => {
    for (let page = 0; page < totalPages; page++) {
      const svgContent = generateSVG(templateSvg, slots, page);
      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("download", `CEB_Trotec_Page_${page + 1}.svg`);
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
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
      .filter(
        (row: CEBOrderCSVRow) =>
          row.Produit && row.Modèle && row.Produit.startsWith("Coque")
      )
      .map((row: CEBOrderCSVRow) => {
        const modelName = row["Modèle"];
        const curModel = availableModels.find(
          (m) => m.name.toLowerCase() === modelName.toLowerCase()
        );

        return {
          cmd: row["CMD"],
          model: curModel || null,
          visual: row["Produit"].split(" - ")[1],
        };
      });

    setSlots((prevSlots) => {
      const newSlots = [...prevSlots, ...importedSlots];

      return newSlots;
    });
  };

  return (
    <div className="container">
      <header>
        <h1>🔷 CEB Trotec Export</h1>
      </header>

      <div className="controls">
        <div className="inner-controls">
          <button className="btn btn-success" onClick={importCSV}>
            🗂️ Import CSV (CEB-Orders)
          </button>
          <button className="btn btn-danger" onClick={() => setSlots([])}>
            🗑️ Ré-initialiser
          </button>
        </div>
        <button className="btn btn-success" onClick={exportSVG}>
          💾 Export SVG
        </button>
      </div>

      <div className="table-container">
        <table id="dataTable">
          <thead>
            <tr>
              <th>Emplacement</th>
              <th>N° Commande</th>
              <th>Modèle</th>
              <th>Visuel</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...slots, { cmd: "", model: null, visual: "" }]
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
                          ? [{ cmd: "", model: null, visual: "" }]
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
          {svgPreview ? (
            <div dangerouslySetInnerHTML={{ __html: svgPreview }} />
          ) : (
            <p className="empty-state">Chargement du template...</p>
          )}
        </div>
      </div>
    </div>
  );
}
