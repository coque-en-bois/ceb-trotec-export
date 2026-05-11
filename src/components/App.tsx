/* eslint-disable react-hooks/set-state-in-effect */

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
import { paginateSlotsByType } from "../lib/slot";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useUndoRedo } from "../lib/useUndoRedo";

const LOCAL_STORAGE_SLOTS_KEY = "saved_slots";

const grid = 8;

const getItemStyle = (_isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `0 0 ${grid}px 0`,

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = () => ({
  padding: grid,
});

export function App() {
  const {
    state: slots,
    set: setSlots,
    undo,
    redo,
    reset: resetSlots,
    canUndo,
    canRedo,
  } = useUndoRedo<Slot[]>(
    localStorage.getItem(LOCAL_STORAGE_SLOTS_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_SLOTS_KEY)!)
      : [],
  );
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

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil((slots.length + 1) / PAGE_LENGTH));
    setTotalPages(totalPages);
    const pageSlots = slots.slice(
      curPage * PAGE_LENGTH,
      (curPage + 1) * PAGE_LENGTH,
    );
    const preview = generateSVG(templateSvg, pageSlots);
    setSvgPreview(preview);
    localStorage.setItem(LOCAL_STORAGE_SLOTS_KEY, JSON.stringify(slots));
  }, [slots, templateSvg, curPage]);

  const exportSVG = async () => {
    const previews = [];
    for (let page = 0; page < totalPages; page++) {
      const pageSlots = slots.slice(
        page * PAGE_LENGTH,
        (page + 1) * PAGE_LENGTH,
      );
      const svgContent = generateSVG(templateSvg, pageSlots);
      const type = pageSlots[0]?.type || "";
      previews.push({ svgContent, type });
    }

    const allInterieursBois = slots.filter(
      (slot) => slot.inside === "Intérieur bois",
    );
    const previewsBois = [];
    for (
      let page = 0;
      page < Math.ceil(allInterieursBois.length / PAGE_LENGTH);
      page++
    ) {
      const pageSlots = allInterieursBois.slice(
        page * PAGE_LENGTH,
        (page + 1) * PAGE_LENGTH,
      );
      const svgContent = generateSVG(
        templateSvg,
        pageSlots.map((s) => ({
          ...s,
          visual: "Logo CEB",
        })),
      );
      previewsBois.push({ svgContent, type: "Int_Bois" });
    }

    const allInterieursCarbone = slots.filter(
      (slot) => slot.inside === "Intérieur carbone",
    );

    const previewsCarbone = [];
    for (
      let page = 0;
      page < Math.ceil(allInterieursCarbone.length / PAGE_LENGTH);
      page++
    ) {
      const pageSlots = allInterieursCarbone.slice(
        page * PAGE_LENGTH,
        (page + 1) * PAGE_LENGTH,
      );
      const svgContent = generateSVG(
        templateSvg,
        pageSlots.map((s) => ({
          ...s,
          visual: "Logo CEB",
        })),
      );
      previewsCarbone.push({ svgContent, type: "Int_Carbone" });
    }

    const allFiles = [...previews, ...previewsBois, ...previewsCarbone];
    for (let page = 0; page < allFiles.length; page++) {
      const { svgContent, type } = allFiles[page];
      if (!type) continue;

      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("download", `${page + 1}_CEB-Trotec_${type}.svg`);
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Petit délai pour éviter que le navigateur ne bloque les téléchargements multiples
      await new Promise((resolve) => setTimeout(resolve, 200));
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
          (m) => m.name.toLowerCase() === modelName.toLowerCase(),
        );

        return {
          cmd: row["CMD"],
          model: curModel || null,
          visual: row["Produit"].split(" - ")[1],
          type,
          inside,
        };
      });

    setSlots((prevSlots) =>
      paginateSlotsByType(prevSlots, importedSlots, PAGE_LENGTH),
    );
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedSlots = Array.from(slots);
    const [removed] = reorderedSlots.splice(
      result.source.index + curPage * PAGE_LENGTH,
      1,
    );
    reorderedSlots.splice(
      result.destination.index + curPage * PAGE_LENGTH,
      0,
      removed,
    );
    setSlots(reorderedSlots);
  };

  const reset = () => {
    resetSlots([]);
    setCurPage(0);
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
            <button className="btn btn-danger" onClick={reset}>
              Ré-initialiser
            </button>
            <button
              className="btn btn-secondary"
              onClick={undo}
              disabled={!canUndo}
              title="Annuler (Ctrl+Z)"
            >
              ↩ Annuler
            </button>
            <button
              className="btn btn-secondary"
              onClick={redo}
              disabled={!canRedo}
              title="Rétablir (Ctrl+Shift+Z)"
            >
              ↪ Rétablir
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
          <DragDropContext onDragEnd={onDragEnd}>
            <div id="dataTable">
              <div className="table-header">
                <div className="table-data-header">Emplacement</div>
                <div className="table-data-header">N° Commande</div>
                <div className="table-data-header">Modèle</div>
                <div className="table-data-header">Visuel</div>
                <div className="table-data-header">Type</div>
                <div className="table-data-header">Intérieur</div>
                <div className="table-data-header">Actions</div>
              </div>
              <div className="table-body">
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle()}
                    >
                      {[
                        ...slots,
                        {
                          cmd: "",
                          model: null,
                          visual: "",
                          type: "",
                          inside: "",
                        },
                      ]
                        .slice(
                          curPage * PAGE_LENGTH,
                          (curPage + 1) * PAGE_LENGTH,
                        )
                        .map((slot, index) => (
                          <Draggable
                            key={`${index + curPage * PAGE_LENGTH}`}
                            draggableId={`${index + curPage * PAGE_LENGTH}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style,
                                )}
                              >
                                <SlotRow
                                  key={index}
                                  slotIndex={index + curPage * PAGE_LENGTH}
                                  availableModels={availableModels}
                                  onEditSlot={(newSlot: Slot | null) => {
                                    const i = index + curPage * PAGE_LENGTH;
                                    // Suppression
                                    if (!newSlot) {
                                      const newSlots = slots.filter(
                                        (_, idx) => idx !== i,
                                      );
                                      setSlots(
                                        paginateSlotsByType(
                                          newSlots,
                                          [],
                                          PAGE_LENGTH,
                                        ),
                                      );
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
                                      setSlots(
                                        paginateSlotsByType(
                                          newSlots,
                                          [],
                                          PAGE_LENGTH,
                                        ),
                                      );
                                    }
                                  }}
                                  slot={slot}
                                  isLast={
                                    slots.length ===
                                    index + curPage * PAGE_LENGTH
                                  }
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
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
      <PrintView slots={slots} />
    </>
  );
}
