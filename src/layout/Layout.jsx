import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { apiPost } from '../lib/api';

// Compte une visite par session de navigation (aucune donnée personnelle n'est envoyée).
function useCompterVisite() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem('visite-comptee')) return;
      sessionStorage.setItem('visite-comptee', '1');
    } catch {
      // Stockage indisponible (navigation privée stricte) : on compte quand même
    }
    apiPost('/visites', {}).catch(() => {});
  }, []);
}

export default function Layout() {
  useCompterVisite();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
