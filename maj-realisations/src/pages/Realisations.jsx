import { useApiGet } from '../lib/useApi';
import ProjectVisual from '../components/ProjectVisual';
import TechTag from '../components/TechTag';

export default function Realisations() {
  const { data: realisations, loading, error } = useApiGet('/realisations');

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Réalisations</h1>
      <p className="mt-4 max-w-xl text-ink/70">
        Une sélection de projets sur lesquels j'ai construit le backend,
        le frontend, ou les deux.
      </p>

      {loading && (
        <p className="mt-12 text-sm text-ink/50">Chargement des projets…</p>
      )}

      {error && (
        <p className="mt-12 text-sm text-pine">
          Impossible de charger les réalisations pour le moment.
        </p>
      )}

      {realisations && realisations.length === 0 && (
        <p className="mt-12 text-sm text-ink/50">
          Aucune réalisation pour l'instant — ajoute-en une depuis l'admin.
        </p>
      )}

      <div className="mt-16 flex flex-col gap-20">
        {realisations?.map((realisation, index) => (
          <article
            key={realisation.id}
            className={`grid gap-8 sm:grid-cols-2 sm:items-center ${
              index % 2 === 1 ? 'sm:[&>*:first-child]:order-2' : ''
            }`}
          >
            <ProjectVisual realisation={realisation} />

            <div>
              {realisation.en_avant && (
                <span className="text-xs tracking-wide text-amber">
                  Projet phare
                </span>
              )}
              <h2 className="mt-2 font-display text-2xl text-ink">
                {realisation.titre}
              </h2>
              <p className="mt-3 text-sm text-ink/70">{realisation.description}</p>

              {realisation.technologies?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {realisation.technologies.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </div>
              )}

              <div className="mt-6 flex gap-4 text-sm">
                {realisation.lien_demo && (
                  <a
                    href={realisation.lien_demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
                  >
                    Voir la démo
                  </a>
                )}
                {realisation.lien_github && (
                  <a
                    href={realisation.lien_github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink/60 hover:text-ink"
                  >
                    Code source
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
