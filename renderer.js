const { ipcRenderer } = require("electron");

let rowCounter = 0;

// Ajouter une ligne au tableau
document.getElementById("addRow").addEventListener("click", addRow);

function addRow() {
  const tableBody = document.getElementById("tableBody");
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>
            <select class="shape-select">
                <option value="rectangle">Rectangle</option>
                <option value="circle">Cercle</option>
                <option value="ellipse">Ellipse</option>
                <option value="line">Ligne</option>
            </select>
        </td>
        <td><input type="number" class="x-input" value="10" min="0" step="0.1"></td>
        <td><input type="number" class="y-input" value="10" min="0" step="0.1"></td>
        <td><input type="number" class="width-input" value="50" min="0" step="0.1"></td>
        <td><input type="number" class="height-input" value="50" min="0" step="0.1"></td>
        <td><input type="number" class="radius-input" value="5" min="0" step="0.1"></td>
        <td>
            <button class="btn btn-danger delete-row">🗑️ Supprimer</button>
        </td>
    `;

  tableBody.appendChild(row);
  rowCounter++;

  // Ajouter l'événement de suppression
  row.querySelector(".delete-row").addEventListener("click", function () {
    row.remove();
    updatePreview();
  });

  // Ajouter les événements de mise à jour
  const inputs = row.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("input", updatePreview);
  });

  updatePreview();
}

// Générer le SVG
function generateSVG() {
  const rows = document.querySelectorAll("#tableBody tr");
  let shapes = "";

  rows.forEach((row) => {
    const shape = row.querySelector(".shape-select").value;
    const x = parseFloat(row.querySelector(".x-input").value) || 0;
    const y = parseFloat(row.querySelector(".y-input").value) || 0;
    const width = parseFloat(row.querySelector(".width-input").value) || 0;
    const height = parseFloat(row.querySelector(".height-input").value) || 0;
    const radius = parseFloat(row.querySelector(".radius-input").value) || 0;

    switch (shape) {
      case "rectangle":
        shapes += `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="none" stroke="black" stroke-width="0.1"/>\n    `;
        break;
      case "circle":
        shapes += `<circle cx="${x + width / 2}" cy="${y + height / 2}" r="${
          width / 2
        }" fill="none" stroke="black" stroke-width="0.1"/>\n    `;
        break;
      case "ellipse":
        shapes += `<ellipse cx="${x + width / 2}" cy="${y + height / 2}" rx="${
          width / 2
        }" ry="${
          height / 2
        }" fill="none" stroke="black" stroke-width="0.1"/>\n    `;
        break;
      case "line":
        shapes += `<line x1="${x}" y1="${y}" x2="${x + width}" y2="${
          y + height
        }" stroke="black" stroke-width="0.1"/>\n    `;
        break;
    }
  });

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600mm" height="400mm" viewBox="0 0 600 400">
    ${shapes}
</svg>`;

  return svgContent;
}

// Prévisualiser le SVG
function updatePreview() {
  const svgContent = generateSVG();
  const previewDiv = document.getElementById("svgPreview");

  if (document.querySelectorAll("#tableBody tr").length === 0) {
    previewDiv.innerHTML =
      '<p class="empty-state">Ajoutez des formes pour voir la prévisualisation</p>';
  } else {
    previewDiv.innerHTML = svgContent;
  }
}

// Prévisualiser manuellement
document.getElementById("previewSvg").addEventListener("click", updatePreview);

// Exporter le SVG
document.getElementById("exportSvg").addEventListener("click", async () => {
  const svgContent = generateSVG();

  if (document.querySelectorAll("#tableBody tr").length === 0) {
    alert("Veuillez ajouter au moins une forme avant d'exporter.");
    return;
  }

  const result = await ipcRenderer.invoke("export-svg", svgContent);

  if (result.success) {
    alert(`Fichier SVG exporté avec succès !\n${result.path}`);
  } else if (!result.cancelled) {
    alert(`Erreur lors de l'export : ${result.error}`);
  }
});

// Ajouter une ligne initiale
addRow();
updatePreview();
