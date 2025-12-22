# Générateur SVG pour Découpe Laser

Application Electron permettant de générer des fichiers SVG pour la découpe laser via une interface de tableau éditable.

## Fonctionnalités

- ✅ Interface graphique avec tableau éditable
- ✅ Ajout/suppression de lignes dynamiques
- ✅ Support de plusieurs formes : Rectangle, Cercle, Ellipse, Ligne
- ✅ Configuration des paramètres : position (X, Y), dimensions (largeur, hauteur), rayon
- ✅ Prévisualisation en temps réel du SVG
- ✅ Export de fichiers SVG optimisés pour découpe laser

## Installation

```bash
npm install
```

## Lancement

```bash
npm start
```

## Utilisation

1. **Ajouter une forme** : Cliquez sur "➕ Ajouter une ligne"
2. **Configurer** : Sélectionnez le type de forme et remplissez les paramètres
3. **Prévisualiser** : Cliquez sur "👁️ Prévisualiser" ou les modifications sont automatiques
4. **Exporter** : Cliquez sur "💾 Exporter SVG" pour sauvegarder votre fichier

## Paramètres des formes

- **Forme** : Type de forme (Rectangle, Cercle, Ellipse, Ligne)
- **X / Y** : Position de départ en mm
- **Largeur / Hauteur** : Dimensions en mm
- **Rayon** : Rayon pour les formes circulaires en mm

## Technologies

- Electron
- HTML/CSS/JavaScript
- SVG

## Structure du projet

```
.
├── main.js          # Processus principal Electron
├── index.html       # Interface utilisateur
├── styles.css       # Styles de l'application
├── renderer.js      # Logique de l'interface
└── package.json     # Configuration du projet
```
