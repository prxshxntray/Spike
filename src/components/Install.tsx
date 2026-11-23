import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const APP_URL = import.meta.env.VITE_APP_URL || 'https://spike-learning-rakesh.rockybloom22.chatgpt.site';

export function Install({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const linkField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialog.current?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const controls = dialog.current?.querySelectorAll<HTMLElement>('a[href],button,input,[tabindex="0"]');
      if (!controls?.length) return;
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) {
        event.preventDefault(); first.focus();
      }
    }
    document.addEventListener('keydown', keydown);
    return () => { document.removeEventListener('keydown', keydown); previous?.focus(); };
  }, [onClose]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(APP_URL);
      setCopied(true); setCopyFailed(false);
    } catch {
      setCopyFailed(true);
      linkField.current?.focus(); linkField.current?.select();
    }
  }

  return <div className="modal-backdrop" onClick={onClose}>
    <div className="modal install-modal" role="dialog" aria-modal="true" aria-labelledby="install-title" tabIndex={-1} ref={dialog} onClick={event => event.stopPropagation()}>
      <div className="modal-title"><h2 id="install-title">Take Spike with you</h2><button className="icon-button" aria-label="Close installation guide" onClick={onClose}>×</button></div>
      <div className="install-qr">
        <QRCodeSVG value={APP_URL} size={208} level="M" marginSize={4} bgColor="#ffffff" fgColor="#101916" title="Scan to open Spike on your iPhone"/>
        <p>Scan with your iPhone camera.<br/>This opens Spike’s website.</p>
      </div>
      <a className="primary install-open" href={APP_URL} target="_blank" rel="noreferrer">Open Spike</a>
      <label className="install-link-label">App link<input type="text" ref={linkField} aria-label="Spike app link" readOnly value={APP_URL} onClick={event => event.currentTarget.select()}/></label>
      <button className="text-button" onClick={copyLink}>{copied ? 'Link copied' : 'Copy app link'}</button>
      <p className="caption" role="status">{copyFailed ? 'The link is selected. Copy it from the field above.' : copied ? 'Paste this link into Safari on your iPhone.' : 'The private host asks you to sign in with your ChatGPT account on first access.'}</p>
      <details className="install-steps"><summary>Add it to your Home Screen</summary><ol><li>Open the link in Safari on your iPhone.</li><li>Tap Share, then Add to Home Screen. Enable “Open as Web App” if shown.</li><li>Open the new icon online once and wait for “Offline ready.”</li><li>Try airplane mode before your commute.</li></ol><p className="caption">No App Store download needed. Progress stays on each device; use Export / Import to move it. ChatGPT and paper links still need internet.</p></details>
    </div>
  </div>;
}
