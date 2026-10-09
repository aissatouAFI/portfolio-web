import { useApiGet } from '../lib/useApi';
import { formatMonthYear } from '../lib/dates';

// Couleurs officielles de GitHub pour chaque langage
const COULEURS_LANGAGES = {
  PHP: '#4F5D95',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Dart: '#00B4AB',
  C: '#555555',
  Blade: '#f7523f',
};
const couleur = (langage) => COULEURS_LANGAGES[langage] || '#9ca3af';

export default function Github() {
  const { data } = useApiGet('/github');

  // Si GitHub ne répond pas, la section ne s'affiche pas plutôt que d'afficher une erreur
  if (!data?.depots?.length) return null;

  const totalLangages = data.langages.reduce((somme, l) => somme + l.depots, 0);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl text-ink">Mon code sur GitHub</h2>
          <p className="mt-3 max-w-xl text-ink/60">
            Mes dépôts publics, mis à jour automatiquement depuis GitHub.
          </p>
        </div>
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-3 rounded-full border border-line py-1.5 pr-5 pl-1.5 text-sm text-ink transition-colors hover:border-ink"
        >
          <img src={data.avatar} alt="" className="h-8 w-8 rounded-full" />
          @{data.login}
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="mt-10 rounded-2xl border border-line p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm text-ink/70">
            <span className="font-display text-3xl text-ink">{data.depots_publics}</span>
            {' '}dépôt{data.depots_publics > 1 ? 's' : ''} public{data.depots_publics > 1 ? 's' : ''}
          </p>
          <p className="text-sm text-ink/50">Langages utilisés</p>
        </div>

        <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-line" role="img" aria-label="Répartition des langages">
          {data.langages.map((l) => (
            <span
              key={l.nom}
              style={{ width: `${(l.depots / totalLangages) * 100}%`, backgroundColor: couleur(l.nom) }}
            />
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink/70">
          {data.langages.map((l) => (
            <li key={l.nom} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: couleur(l.nom) }} />
              {l.nom}
              <span className="text-ink/40">{Math.round((l.depots / totalLangages) * 100)} %</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {data.depots.map((depot) => (
          <a
            key={depot.nom}
            href={depot.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-line p-5 transition-colors hover:border-ink"
          >
            <span className="flex items-start justify-between gap-3">
              <span className="font-medium break-all text-ink">{depot.nom}</span>
              <span aria-hidden="true" className="text-ink/40 transition-transform group-hover:translate-x-0.5">↗</span>
            </span>
            {depot.description && <span className="mt-2 text-sm text-ink/70">{depot.description}</span>}
            <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs text-ink/55">
              {depot.langage && (
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: couleur(depot.langage) }} />
                  {depot.langage}
                </span>
              )}
              <span>Mis à jour en {formatMonthYear(depot.mis_a_jour)}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
