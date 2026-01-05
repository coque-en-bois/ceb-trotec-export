interface PrintViewProps {
  svgPreviews: string[];
}

export function PrintView({ svgPreviews }: PrintViewProps) {
  return (
    <div className="print-view">
      {svgPreviews.map((svgContent, index) => (
        <div
          key={index}
          className="print-page"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ))}
    </div>
  );
}
