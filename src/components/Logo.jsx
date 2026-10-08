// Le « A de la relation » : le A d'Aissatou formé par deux personnes,
// reliées par la barre orange (mettre des gens en relation).
export default function Logo({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M13 58 L28 19" stroke="#12172b" strokeWidth="7.5" strokeLinecap="round" />
      <path d="M51 58 L36 19" stroke="#2f6f62" strokeWidth="7.5" strokeLinecap="round" />
      <circle cx="25.5" cy="9.5" r="5.6" fill="#12172b" />
      <circle cx="38.5" cy="9.5" r="5.6" fill="#2f6f62" />
      <path d="M21 41 L43 41" stroke="#e2872b" strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  );
}
