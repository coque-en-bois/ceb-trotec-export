import { useEffect, useState } from "react";
import { SlotRow } from "./SlotRow";
import { CEBOrderCSVRow, Slot } from "../types/types";
import { PAGE_LENGTH } from "../lib/constants";

const initSlotPage = (): Slot[] =>
  Array(PAGE_LENGTH)
    .fill(null)
    .map(() => ({
      cmd: "",
      model: null,
      visual: "",
    }));

export function App() {
  const [curPage, setCurPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [slots, setSlots] = useState<Slot[]>(initSlotPage());
  const [availablePhones, setAvailablePhones] = useState([]);
  const [templateSvg, setTemplateSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  useEffect(() => {
    async function init() {
      const template = await window.nodeAPI.loadTemplateSVG();
      setTemplateSvg(template);

      const phones = await window.nodeAPI.loadPhoneModels();
      setAvailablePhones(phones);
    }

    init();
  }, []);

  useEffect(() => {
    const svgContent = window.nodeAPI.generateSVG(templateSvg, slots, curPage);
    setSvgPreview(svgContent);
  }, [slots, templateSvg, curPage]);

  const selectPhone = (slotIndex: number, phonePath: string | null) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      model: phonePath ? phonePath : null,
    };
    setSlots(newSlots);
  };

  const clearSlot = (slotIndex: number) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = null;
    setSlots(newSlots);
  };

  const clearAllSlots = () => {
    setSlots(initSlotPage());
  };

  const exportSVG = async () => {
    const result = await window.ipcRenderer.invoke("export-svg", svgPreview);

    if (result.success) {
      alert(`Fichier SVG exporté avec succès !\n${result.path}`);
    } else if (!result.cancelled) {
      alert(`Erreur lors de l'export : ${result.error}`);
    }
  };

  const importCSV = async () => {
    const { success, content } = await window.ipcRenderer.invoke("import-csv");

    if (!success) {
      alert(`Erreur lors de l'importation du CSV : ${content}`);
      return;
    }

    const importedSlots = content
      .filter((row: CEBOrderCSVRow) => row.Produit.startsWith("Coque"))
      .map((row: CEBOrderCSVRow) => {
        return {
          cmd: row['"CMD"'],
          model: row["Modèle"],
          visual: row["Produit"].split(" - ")[1],
        };
      });

    setSlots((prevSlots) => {
      const newSlots = [...prevSlots, importedSlots];

      return newSlots;
    });
  };

  const addNewPage = () => {
    setSlots((prevSlots) => [...prevSlots, ...initSlotPage()]);
    setTotalPages((prevTotal) => prevTotal + 1);
    setCurPage(totalPages);
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
          <button className="btn btn-danger" onClick={clearAllSlots}>
            🗑️ Ré-initialiser
          </button>
        </div>
        <button className="btn btn-success" onClick={exportSVG}>
          💾 Exporter SVG
        </button>
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
        {curPage === totalPages - 1 ? (
          <button className="btn btn-secondary" onClick={() => addNewPage()}>
            Nouvelle page
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => setCurPage(Math.min(totalPages - 1, curPage + 1))}
          >
            ▶️ Page Suivante
          </button>
        )}
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
            {slots
              .slice(curPage * PAGE_LENGTH, (curPage + 1) * PAGE_LENGTH)
              .map(({ cmd, model, visual }, index) => (
                <SlotRow
                  key={index}
                  slotIndex={index + curPage * PAGE_LENGTH}
                  selectedPhone={model}
                  commandNumber={cmd}
                  visualName={visual}
                  availablePhones={availablePhones}
                  onPhoneSelect={(phonePath) => selectPhone(index, phonePath)}
                  onClear={() => clearSlot(index)}
                />
              ))}
          </tbody>
        </table>
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
