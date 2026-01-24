export default function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
      <div className="mt-3 divide-y divide-gray-100">{children}</div>
    </section>
  );
}
