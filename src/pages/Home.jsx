import { useApiGet } from '../lib/useApi';
import NetworkMark from '../components/NetworkMark';
import Realisations from './Realisations';
import Github from './Github';
import Cv from './Cv';
import Contact from './Contact';

const DEFAULT_TITRE = 'Je construis des systèmes qui mettent des gens en relation.';
const DEFAULT_SOUS_TITRE =
  "Développeuse backend & frontend, je conçois des API Laravel et des interfaces React — de la logique métier jusqu'à l'écran que les gens touchent vraiment.";
const DEFAULT_A_PROPOS =
  "Je m'appelle Aissatou Marone. Je suis actuellement en stage chez Volkano, où j'ai développé RED Product, et en formation à AFI-UE. À côté de ça, je construis JEF CONNECT, mon projet personnel de mise en relation entre clients et travailleurs.";

const SERVICES_FALLBACK_ICON = '◆';

export default function Home() {
  const { data: profil } = useApiGet('/profil');
  const { data: services, loading, error } = useApiGet('/services');

  return (
    <>
      <section id="accueil" className="mx-auto max-w-5xl px-6 pt-16 pb-24 sm:px-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-16">
          <div className="flex-1">
            <NetworkMark className="mb-8 h-10 w-20 text-ink" />
            <h1 className="max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">
              {profil?.titre_accroche || DEFAULT_TITRE}
            </h1>
            <p className="mt-6 max-w-xl text-ink/70">{profil?.sous_titre || DEFAULT_SOUS_TITRE}</p>
            <div className="mt-9 flex gap-4">
              <a
                href="#ce-que-je-fais"
                className="rounded-full bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-ink/85"
              >
                Voir ce que je fais
              </a>
              <a
                href="#contact"
                className="rounded-full border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-ink"
              >
                Me contacter
              </a>
            </div>
          </div>
          {profil?.photo_url && (
            <img
              src={profil.photo_url}
              alt="Photo de profil d'Aissatou Marone"
              className="aspect-[3/4] w-56 shrink-0 rounded-2xl object-cover object-top sm:w-80"
            />
          )}
        </div>
      </section>

      <section id="ce-que-je-fais" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="font-display text-2xl text-ink">Ce que je fais</h2>
          <p className="mt-3 max-w-xl text-ink/60">
            Du backend à l'interface, je construis des produits complets.
          </p>

          {loading && <p className="mt-10 text-sm text-ink/50">Chargement…</p>}
          {error && <p className="mt-10 text-sm text-red-600">Impossible de charger les services.</p>}

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services?.map((service) => (
              <div key={service.id} className="rounded-2xl border border-line p-6">
                <span className="text-amber">{SERVICES_FALLBACK_ICON}</span>
                <h3 className="mt-4 font-display text-lg text-ink">{service.titre}</h3>
                <p className="mt-2 text-sm text-ink/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="a-propos" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="font-display text-2xl text-ink">À propos</h2>
          <p className="mt-6 max-w-2xl whitespace-pre-line text-ink/70">
            {profil?.a_propos || DEFAULT_A_PROPOS}
          </p>
        </div>
      </section>

      <div className="border-t border-line">
        <Realisations />
      </div>
      <div className="border-t border-line empty:hidden">
        <Github />
      </div>
      <div className="border-t border-line">
        <Cv />
      </div>
      <div className="border-t border-line">
        <Contact />
      </div>
    </>
  );
}