import { useApiGet } from '../lib/useApi';
import Timeline from '../components/Timeline';

const CATEGORIE_LABELS = {
  backend: 'Backend',
  frontend: 'Frontend',
  outils: 'Outils',
  autre: 'Autre',
};

export default function Cv() {
  const { data, loading, error } = useApiGet('/cv');

  const competencesParCategorie = (data?.competences || []).reduce((acc, comp) => {
    const cat = comp.categorie || 'autre';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(comp);
    return acc;
  }, {});

  return (
    <section id="cv" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="font-display text-2xl text-ink">CV</h2>
      <p className="mt-3 max-w-xl text-ink/60">Expériences, formations et compétences.</p>

      {loading && <p className="mt-10 text-sm text-ink/50">Chargement…</p>}
      {error && <p className="mt-10 text-sm text-red-600">Impossible de charger le CV.</p>}

      {data && (
        <div className="mt-14 grid gap-16 sm:grid-cols-2">
          <div>
            <h3 className="mb-6 font-display text-lg text-ink">Expériences</h3>
            <Timeline items={data.experiences} titleKey="poste" subtitleKey="entreprise" />
          </div>
          <div>
            <h3 className="mb-6 font-display text-lg text-ink">Formations</h3>
            <Timeline items={data.formations} titleKey="diplome" subtitleKey="etablissement" />
          </div>
        </div>
      )}

      {data?.competences?.length > 0 && (
        <div className="mt-16">
          <h3 className="mb-6 font-display text-lg text-ink">Compétences</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(competencesParCategorie).map(([cat, comps]) => (
              <div key={cat}>
                <p className="text-xs uppercase tracking-wide text-ink/50">
                  {CATEGORIE_LABELS[cat] || cat}
                </p>
                <ul className="mt-3 space-y-2">
                  {comps.map((comp) => (
                    <li key={comp.id} className="text-sm text-ink/80">
                      {comp.nom}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {data?.pdf && (
        <a
          href={data.pdf}
          target="_blank"
          rel="noreferrer"
          className="mt-14 inline-block rounded-full bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-ink/85"
        >
          Télécharger mon CV (PDF)
        </a>
      )}
    </section>
  );
}
