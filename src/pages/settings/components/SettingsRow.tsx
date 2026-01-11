export default function SettingsRow({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between py-4"
    >
      <span className="text-gray-800 text-sm">{label}</span>
      <span className="text-gray-300">{">"}</span>
    </button>
  );
}
