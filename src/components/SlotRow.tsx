interface SlotRowProps {
  slotIndex: number;
  selectedPhone: string | null;
  commandNumber: string;
  visualName: string;
  availablePhones: { name: string; path: string }[];
  onPhoneSelect: (phonePath: string) => void;
  onClear: () => void;
}

export function SlotRow({
  slotIndex,
  selectedPhone,
  commandNumber,
  visualName,
  availablePhones,
  onPhoneSelect,
  onClear,
}: SlotRowProps) {
  return (
    <tr>
      <td>{slotIndex + 1}</td>
      <td>
        <input type="text" value={commandNumber} />
      </td>
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
        <input type="text" value={visualName} />
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
