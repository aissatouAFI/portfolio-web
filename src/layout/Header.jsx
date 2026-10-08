import { useEffect, useState } from 'react';
import Logo from '../components/Logo';

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
        <nav className="hidden gap-6 text-sm sm:flex">
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
      </div>
    </header>
  );
}