export default function NetworkMark({ className = '' }) {
  return (
    <svg viewBox="0 0 80 40" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="30" r="4" fill="currentColor" />
      <circle cx="40" cy="10" r="4" fill="currentColor" />
      <circle cx="70" cy="30" r="4" fill="currentColor" />
      <path d="M10 30 L40 10 L70 30" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}
