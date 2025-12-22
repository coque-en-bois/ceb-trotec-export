const { ipcRenderer } = require("electron");
const { useState, useEffect } = React;
const fs = require("fs");
const path = require("path");

// Positions des 14 emplacements du template
const SLOTS = [
  { x: 39.3, y: 52.8, width: 238.1, height: 479.1 },
  { x: 307.8, y: 52.8, width: 238.1, height: 479.1 },
  { x: 576.2, y: 52.8, width: 238.1, height: 479.1 },
  { x: 844.7, y: 52.8, width: 238.1, height: 479.1 },
  { x: 1113.2, y: 52.8, width: 238.1, height: 479.1 },
  { x: 1381.7, y: 52.8, width: 238.1, height: 479.1 },
  { x: 1650.2, y: 52.8, width: 238.1, height: 479.1 },
  { x: 39.3, y: 573.6, width: 238.1, height: 479.1 },
  { x: 307.8, y: 573.6, width: 238.1, height: 479.1 },
  { x: 576.2, y: 573.6, width: 238.1, height: 479.1 },
  { x: 844.7, y: 573.6, width: 238.1, height: 479.1 },
  { x: 1113.2, y: 573.6, width: 238.1, height: 479.1 },
  { x: 1381.7, y: 573.6, width: 238.1, height: 479.1 },
  { x: 1650.2, y: 573.6, width: 238.1, height: 479.1 },
];

function SlotRow({
  slotIndex,
  selectedPhone,
  availablePhones,
  onPhoneSelect,
  onClear,
}) {
  return (
    <tr>
      <td>{slotIndex + 1}</td>
      <td>
        <select
          className="phone-select"
          value={selectedPhone || ""}
          onChange={(e) => onPhoneSelect(e.target.value)}
        >
          <option value="">-- Sélectionner un smartphone --</option>
          {availablePhones.map((phone) => (
            <option key={phone.path} value={phone.path}>
              {phone.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={onClear}
          disabled={!selectedPhone}
        >
          🗑️ Vider
        </button>
      </td>
    </tr>
  );
}

// Composant principal
function App() {
  const [slots, setSlots] = useState(Array(14).fill(null));
  const [availablePhones, setAvailablePhones] = useState([]);
  const [templateSvg, setTemplateSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  // Charger les smartphones disponibles
  useEffect(() => {
    const loadPhones = async () => {
      const phones = [];
      const assetsPath = path.join(__dirname, "assets");
      const brands = ["iphone", "samsung", "google"];

      for (const brand of brands) {
        const brandPath = path.join(assetsPath, brand);
        try {
          const files = fs.readdirSync(brandPath);
          files.forEach((file) => {
            if (file.endsWith(".svg")) {
              phones.push({
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
      setAvailablePhones(phones);
    };

    loadPhones();

    // Charger le template
    const templatePath = path.join(__dirname, "assets", "template.svg");
    try {
      const template = fs.readFileSync(templatePath, "utf-8");
      setTemplateSvg(template);
    } catch (err) {
      console.error("Erreur lors du chargement du template:", err);
    }
  }, []);

  // Générer le SVG final
  const generateSVG = () => {
    if (!templateSvg) return "";

    let phonesContent = "";

    slots.forEach((phonePath, index) => {
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

            // Centrer le smartphone dans l'emplacement
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

    // Combiner le template avec les smartphones
    const finalSvg = templateSvg.replace("</svg>", `${phonesContent}\n</svg>`);

    return finalSvg;
  };

  // Mettre à jour la prévisualisation
  useEffect(() => {
    const svgContent = generateSVG();
    setSvgPreview(svgContent);
    console.log("SVG Preview Updated");
  }, [slots, templateSvg]);

  // Sélectionner un smartphone pour un emplacement
  const selectPhone = (slotIndex, phonePath) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = phonePath || null;
    setSlots(newSlots);
  };

  // Vider un emplacement
  const clearSlot = (slotIndex) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = null;
    setSlots(newSlots);
  };

  // Vider tous les emplacements
  const clearAllSlots = () => {
    setSlots(Array(14).fill(null));
  };

  // Exporter le SVG
  const exportSVG = async () => {
    const result = await ipcRenderer.invoke("export-svg", svgPreview);

    if (result.success) {
      alert(`Fichier SVG exporté avec succès !\n${result.path}`);
    } else if (!result.cancelled) {
      alert(`Erreur lors de l'export : ${result.error}`);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🔷 CEB Trotec Export</h1>
      </header>

      <div className="controls">
        <button className="btn btn-danger" onClick={clearAllSlots}>
          🗑️ Vider tous les emplacements
        </button>
        <button className="btn btn-success" onClick={exportSVG}>
          💾 Exporter SVG
        </button>
      </div>

      <div className="table-container">
        <table id="dataTable">
          <thead>
            <tr>
              <th>Emplacement</th>
              <th>Smartphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((selectedPhone, index) => (
              <SlotRow
                key={index}
                slotIndex={index}
                selectedPhone={selectedPhone}
                availablePhones={availablePhones}
                onPhoneSelect={(phonePath) => selectPhone(index, phonePath)}
                onClear={() => clearSlot(index)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="preview-section">
        <h2>Prévisualisation</h2>
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

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
