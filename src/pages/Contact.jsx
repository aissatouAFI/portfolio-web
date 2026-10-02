import { useState } from 'react';
import { apiPost } from '../lib/api';

const EMPTY_FORM = { nom: '', email: '', sujet: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await apiPost('/contact', form);
      setStatus('success');
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="font-display text-2xl text-ink">Me contacter</h2>
      <p className="mt-3 max-w-xl text-ink/60">
        Une question, une opportunité, un projet ? Écris-moi.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 grid max-w-xl gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <input
            name="nom"
            value={form.nom}
            onChange={handleChange}
            placeholder="Ton nom"
            required
            className="rounded-lg border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-ink"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Ton email"
            required
            className="rounded-lg border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-ink"
          />
        </div>
        <input
          name="sujet"
          value={form.sujet}
          onChange={handleChange}
          placeholder="Sujet"
          required
          className="rounded-lg border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-ink"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Ton message"
          required
          rows={5}
          className="rounded-lg border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-ink"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-fit rounded-full bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-ink/85 disabled:opacity-60"
        >
          {status === 'loading' ? 'Envoi…' : 'Envoyer'}
        </button>
        {status === 'success' && (
          <p className="text-sm text-pine">Message envoyé, merci ! Je te réponds bientôt.</p>
        )}
        {status === 'error' && <p className="text-sm text-red-600">Erreur : {errorMsg}</p>}
      </form>
    </section>
  );
}
