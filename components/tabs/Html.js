"use client";

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export default function Html({ html, variant }) {
  const onClick = async (e) => {
    const el = e.target.closest?.(".code-block");
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (e.clientX < r.right - 80 || e.clientY > r.top + 36) return;
    if (await copyText(el.innerText)) {
      el.dataset.copied = "1";
      setTimeout(() => delete el.dataset.copied, 1300);
    }
  };
  return <div className="mc-content" data-variant={variant} onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />;
}
