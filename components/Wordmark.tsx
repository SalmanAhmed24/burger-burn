export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      <span className="wordmark__main">bunfire</span>
      <span className="wordmark__sub">burger &amp; grill</span>
    </span>
  );
}
