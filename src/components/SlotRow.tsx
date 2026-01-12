import type { PhoneModel, Slot } from "../types/types";

interface SlotRowProps {
  slotIndex: number;
  slot: Slot;
  availableModels: PhoneModel[];
  onEditSlot: (newSlot: Slot | null) => void;
  isLast?: boolean;
}

const insideOptions = [
  "Intérieur standard",
  "Intérieur bois",
  "Intérieur carbone",
];

const typeOptions = ["Assemblage", "Merisier", "Noyer"];

export function SlotRow({
  slotIndex,
  slot,
  availableModels,
  onEditSlot,
  isLast,
}: SlotRowProps) {
  const { cmd, model, visual, type, inside } = slot;

  return (
    <div className="table-line">
      <div className="table-data-item">{slotIndex + 1}</div>
      <div className="table-data-item">
        <input
          type="text"
          value={cmd}
          onChange={(e) => onEditSlot({ ...slot, cmd: e.target.value })}
        />
      </div>
      <div className="table-data-item">
        <select
          className="phone-select"
          value={model ? model.name : ""}
          onChange={(e) => {
            const selectedModel = availableModels.find(
              (m) => m.name === e.target.value
            );
            onEditSlot({
              ...slot,
              model: selectedModel || null,
            });
          }}
        >
          <option value="">-- Sélectionner --</option>
          {availableModels.map((model) => (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <div className="table-data-item">
        <input
          type="text"
          value={visual}
          onChange={(e) => onEditSlot({ ...slot, visual: e.target.value })}
        />
      </div>
      <div className="table-data-item">
        <select
          className="phone-select"
          value={type}
          onChange={(e) => {
            onEditSlot({
              ...slot,
              type: e.target.value,
            });
          }}
        >
          <option value="">-- Sélectionner --</option>
          {typeOptions.map((typeOption) => (
            <option key={typeOption} value={typeOption}>
              {typeOption}
            </option>
          ))}
        </select>
      </div>
      <div className="table-data-item">
        <select
          className="phone-select"
          value={inside}
          onChange={(e) => {
            onEditSlot({
              ...slot,
              inside: e.target.value,
            });
          }}
        >
          <option value="">-- Sélectionner --</option>
          {insideOptions.map((insideOption) => (
            <option key={insideOption} value={insideOption}>
              {insideOption}
            </option>
          ))}
        </select>
      </div>
      <div className="table-data-item">
        {!isLast && (
          <button className="btn btn-danger" onClick={() => onEditSlot(null)}>
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
}
