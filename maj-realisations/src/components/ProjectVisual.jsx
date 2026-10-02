import { API_URL } from '../lib/api';

// L'API renvoie un chemin relatif (ex: "realisations/xyz.jpg") stocké via
// Laravel Storage — on reconstruit l'URL publique à partir de l'URL de l'API.
const STORAGE_URL = API_URL.replace(/\/api\/?$/, '/storage');

export default function ProjectVisual({ realisation }) {
  if (realisation.image) {
    return (
      <img
        src={`${STORAGE_URL}/${realisation.image}`}
        alt={realisation.titre}
        className="aspect-[4/3] w-full rounded-lg object-cover"
      />
    );
  }

  // Pas d'image encore renseignée : un visuel de marque plutôt qu'un
  // rectangle gris vide, avec l'initiale du projet.
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-ink">
      <span className="font-display text-6xl text-amber">
        {realisation.titre.charAt(0)}
      </span>
    </div>
  );
}
