// Le « baobab connecté » : l'arbre emblème du Sénégal dont les branches forment
// un réseau (mettre des gens en relation) ; le point orange au sommet, c'est moi.
export default function Logo({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <g stroke="#12172b" strokeWidth="1.4" strokeLinecap="round" opacity="0.38">
        <path d="M14 22 L21 11 L32 6 L43 11 L50 22" />
        <path d="M14 22 L50 22" />
      </g>
      <g stroke="#12172b" strokeWidth="3.2" strokeLinecap="round">
        <path d="M28 37 Q22 30 14 22" />
        <path d="M30 36 Q26 22 21 11" />
        <path d="M32 35 L32 7" />
        <path d="M34 36 Q38 22 43 11" />
        <path d="M36 37 Q42 30 50 22" />
      </g>
      <path d="M24 60 C25.5 52 25 44 23 37 Q32 33 41 37 C39 44 38.5 52 40 60 Z" fill="#12172b" />
      <g fill="#12172b">
        <circle cx="14" cy="22" r="3.3" />
        <circle cx="21" cy="11" r="3.3" />
        <circle cx="43" cy="11" r="3.3" />
        <circle cx="50" cy="22" r="3.3" />
      </g>
      <circle cx="32" cy="6" r="4.5" fill="#e2872b" />
    </svg>
  );
}
