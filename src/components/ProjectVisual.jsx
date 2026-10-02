export default function ProjectVisual({ realisation }) {
  if (realisation?.image_url) {
    return (
      <img
        src={realisation.image_url}
        alt={realisation.titre}
        className="aspect-video w-full rounded-2xl object-cover"
      />
    );
  }

  const initial = realisation?.titre ? realisation.titre.charAt(0).toUpperCase() : '?';

  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-ink">
      <span className="font-display text-5xl text-paper">{initial}</span>
    </div>
  );
}
