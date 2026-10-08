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

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <a href="#accueil" className="flex items-center gap-2.5 font-display text-lg tracking-tight text-ink">
          <Logo className="h-8 w-8 shrink-0" />
          Aissatou Marone
        </a>
        <div className="flex items-center gap-6">
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
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-ink/85"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
              Mon CV
            </a>
          )}
        </div>
      </div>
    </header>
  );
}