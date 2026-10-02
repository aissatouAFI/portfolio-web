export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-ink">Aissatou Marone</p>
          <p className="mt-1 text-sm text-ink/60">Développeuse backend &amp; frontend</p>
        </div>
        <div className="flex flex-col gap-1 text-sm sm:items-end">
          <a href="mailto:maronea865@gmail.com" className="text-ink/70 underline underline-offset-4 hover:text-ink">
            maronea865@gmail.com
          </a>
          <p className="text-ink/40">© {new Date().getFullYear()} Aissatou Marone</p>
        </div>
      </div>
    </footer>
  );
}
