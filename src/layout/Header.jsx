import { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import { useApiGet } from '../lib/useApi';

const links = [
  { to: '#accueil', label: 'Accueil' },
  { to: '#ce-que-je-fais', label: 'Ce que je fais' },
  { to: '#a-propos', label: 'À propos' },
  { to: '#realisations', label: 'Réalisations' },
  { to: '#cv', label: 'CV' },
  { to: '#contact', label: 'Contact' },
];

export default function Header() {
  const [activeId, setActiveId] = useState('accueil');
  const [menuOuvert, setMenuOuvert] = useState(false);
  const { data: cv } = useApiGet('/cv');

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.to.slice(1)))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Le menu téléphone se ferme avec la touche Échap
  useEffect(() => {
    if (!menuOuvert) return undefined;
    const fermer = (e) => e.key === 'Escape' && setMenuOuvert(false);
    window.addEventListener('keydown', fermer);
    return () => window.removeEventListener('keydown', fermer);
  }, [menuOuvert]);

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <a href="#accueil" className="flex items-center gap-2.5 font-display text-lg tracking-tight text-ink">
          <Logo className="h-8 w-8 shrink-0" />
          Aissatou Marone
        </a>
        <div className="flex items-center gap-2 sm:gap-6">
          <nav className="hidden gap-6 text-sm md:flex">
            {links.map((link) => {
              const isActive = activeId === link.to.slice(1);
              return (
                <a
                  key={link.to}
                  href={link.to}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative pb-1 transition-colors ${
                    isActive
                      ? 'text-ink after:absolute after:inset-x-0 after:-bottom-[1px] after:h-[2px] after:rounded-full after:bg-ink'
                      : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          {cv?.pdf && (
            <a
              href={cv.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-sm text-paper transition-colors hover:bg-ink/85 sm:px-4"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
              <span className="hidden sm:inline">Mon</span> CV
            </a>
          )}
          <button
            type="button"
            onClick={() => setMenuOuvert((ouvert) => !ouvert)}
            aria-expanded={menuOuvert}
            aria-controls="menu-telephone"
            aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
              {menuOuvert ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu téléphone : la liste des sections, sous la barre du haut */}
      {menuOuvert && (
        <nav id="menu-telephone" className="border-t border-line bg-paper md:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col px-6 py-2">
            {links.map((link) => {
              const isActive = activeId === link.to.slice(1);
              return (
                <li key={link.to}>
                  <a
                    href={link.to}
                    onClick={() => setMenuOuvert(false)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex items-center justify-between border-b border-line/70 py-3.5 text-base last:border-0 ${
                      isActive ? 'font-medium text-ink' : 'text-ink/70'
                    }`}
                  >
                    {link.label}
                    {isActive && <span className="h-2 w-2 rounded-full bg-amber" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}