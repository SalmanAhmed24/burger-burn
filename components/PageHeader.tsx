/* Shared header for inner pages, modelled on the split "menu cover" layout:
   stacked headline on the left, illustration panel on the right.
   Server component; the entrance is pure CSS so it costs no JavaScript. */

type Props = {
  lines: string[];
  script: string;
  lede: React.ReactNode;
  art: React.ReactNode;
  badge?: string;
};

export function PageHeader({ lines, script, lede, art, badge }: Props) {
  return (
    <header className="phead">
      <div className="phead__text">
        <h1 className="phead__title">
          {lines.map((line, i) => (
            <span className="phead__mask" key={line} style={{ "--i": i } as React.CSSProperties}>
              <span className="phead__line">{line}</span>
            </span>
          ))}
        </h1>
        <p className="phead__script">{script}</p>
        <div className="phead__lede">{lede}</div>
      </div>
      <div className="phead__visual" aria-hidden="true">
        <div className="phead__panel">
          <div className="phead__art">{art}</div>
          {badge && <span className="phead__badge">{badge}</span>}
        </div>
      </div>
    </header>
  );
}
