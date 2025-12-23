import type { PhoneModel, Slot } from "../types/types";

interface SlotRowProps {
  slotIndex: number;
  slot: Slot;
  availableModels: PhoneModel[];
  onEditSlot: (newSlot: Slot | null) => void;
  isLast?: boolean;
}

export function SlotRow({
  slotIndex,
  slot,
  availableModels,
  onEditSlot,
  isLast,
}: SlotRowProps) {
  const { cmd, model, visual } = slot;

  return (
    <tr>
      <td>{slotIndex + 1}</td>
      <td>
        <input
          type="text"
          value={cmd}
          onChange={(e) => onEditSlot({ ...slot, cmd: e.target.value })}
        />
      </td>
      <td>
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
          <option value="">-- Sélectionner un modèle --</option>
          {availableModels.map((model) => (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="text"
          value={visual}
          onChange={(e) => onEditSlot({ ...slot, visual: e.target.value })}
        />
      </td>
      <td>
        {!isLast && (
          <button className="btn btn-danger" onClick={() => onEditSlot(null)}>
            Supprimer
          </button>
        )}
      </td>
    </tr>
  );
}
