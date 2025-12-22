const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle SVG export
ipcMain.handle("export-svg", async (event, svgContent) => {
  const { filePath } = await dialog.showSaveDialog(mainWindow, {
    title: "Exporter le fichier SVG",
    defaultPath: "design-laser.svg",
    filters: [{ name: "Fichiers SVG", extensions: ["svg"] }],
  });

  if (filePath) {
    try {
      fs.writeFileSync(filePath, svgContent);
      return { success: true, path: filePath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  return { success: false, cancelled: true };
});
