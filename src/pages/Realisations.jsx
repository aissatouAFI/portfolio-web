import { useApiGet } from '../lib/useApi';
import ProjectVisual from '../components/ProjectVisual';
import TechTag from '../components/TechTag';

export default function Realisations() {
  const { data, loading, error } = useApiGet('/realisations');

  return (
    <section id="realisations" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="font-display text-2xl text-ink">Mes réalisations</h2>
      <p className="mt-3 max-w-xl text-ink/60">
        Des projets menés en stage, en formation et à titre personnel.
      </p>

      {loading && <p className="mt-10 text-sm text-ink/50">Chargement…</p>}
      {error && <p className="mt-10 text-sm text-red-600">Impossible de charger les réalisations.</p>}

      <div className="mt-14 space-y-20">
        {data?.map((realisation, index) => (
          <article
            key={realisation.id}
            className={`flex flex-col gap-8 sm:flex-row sm:items-center ${
              index % 2 === 1 ? 'sm:flex-row-reverse' : ''
            }`}
          >
            <div className="flex-1">
              <ProjectVisual realisation={realisation} />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl text-ink">{realisation.titre}</h3>
              <p className="mt-3 text-sm text-ink/70">{realisation.description}</p>
              {Array.isArray(realisation.technologies) && realisation.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {realisation.technologies.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </div>
              )}
              {(realisation.lien_demo || realisation.lien_github) && (
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {realisation.lien_demo && (
                    <a
                      href={realisation.lien_demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-pine underline underline-offset-4"
                    >
                      Voir la démo →
                    </a>
                  )}
                  {realisation.lien_github && (
                    <a
                      href={realisation.lien_github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-pine underline underline-offset-4"
                    >
                      Code source →
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
