import Html from "./Html";
import styles from "./Extras.module.css";

export default function Extras({ id, variant, example, followups, links, note }) {
  if (!example && !followups && !links?.length && !note) return null;
  return (
    <div className="mc-content" data-variant={variant}>
      {example && (
        <>
          <h2 id={`${id}-example`}><span className="h2-mark">★</span>Worked example</h2>
          <Html html={example} variant={variant} />
        </>
      )}
      {followups && (
        <>
          <h2 id={`${id}-followups`}><span className="h2-mark">?</span>Interview follow-ups</h2>
          <Html html={followups} variant={variant} />
        </>
      )}
      {(links?.length > 0 || note) && (
        <div className={styles.deeper}>
          <span className={styles.label}>Go deeper</span>
          {links?.map((l) => (
            <a key={l.url} className={styles.chip} href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
          ))}
          {note && <span className={styles.note}>{note}</span>}
        </div>
      )}
    </div>
  );
}
