import { formatDateRange } from '../lib/dates';

export default function Timeline({ items, titleKey = 'titre', subtitleKey = 'organisme' }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-ink/50">Rien à afficher pour le moment.</p>;
  }

  return (
    <ol className="space-y-8 border-l border-line pl-6">
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber" />
          <p className="text-xs uppercase tracking-wide text-ink/50">
            {formatDateRange(item.date_debut, item.date_fin)}
          </p>
          <h3 className="mt-1 font-display text-lg text-ink">{item[titleKey]}</h3>
          {item[subtitleKey] && <p className="text-sm text-ink/60">{item[subtitleKey]}</p>}
          {item.description && (
            <p className="mt-2 max-w-xl whitespace-pre-line text-sm text-ink/70">{item.description}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
