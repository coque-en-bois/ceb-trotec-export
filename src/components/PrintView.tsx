import type { Slot } from "../types/types";

interface PrintViewProps {
  slots: Slot[];
}

export function PrintView({ slots }: PrintViewProps) {
  const orderedSlots = slots.reduce(
    (acc, slot) => {
      if (slot.type === "Assemblage") {
        acc.Assemblage.push(slot);
      } else if (slot.type === "Merisier") {
        acc.Merisier.push(slot);
      } else if (slot.type === "Érable") {
        acc.Érable.push(slot);
      } else if (slot.type === "Noyer") {
        acc.Noyer.push(slot);
      }
      return acc;
    },
    {
      Assemblage: [] as Slot[],
      Merisier: [] as Slot[],
      Érable: [] as Slot[],
      Noyer: [] as Slot[],
    },
  );

  return (
    <div className="print-view">
      {Object.entries(orderedSlots).map(([type, typeSlots]) => (
        <div key={type} className="print-section">
          <h2>{type}</h2>
          <table className="print-table">
            <thead>
              <tr>
                <th>CMD</th>
                <th>Modèle</th>
                <th>Visuel</th>
                <th>Intérieur</th>
              </tr>
            </thead>
            <tbody>
              {typeSlots.map((slot, index) => (
                <tr key={index}>
                  <td>{slot.cmd}</td>
                  <td>{slot.model ? slot.model.name : ""}</td>
                  <td>{slot.visual}</td>
                  <td>{slot.inside}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
