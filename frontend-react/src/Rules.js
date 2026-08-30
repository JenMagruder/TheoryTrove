import './App.css';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ borderTop: '1px solid var(--border-dark)', padding: '1.5rem 2rem', textAlign: 'center' }}>
    <div style={{ fontSize: '11px', color: 'var(--gold)', opacity: 0.5, letterSpacing: '2px', marginBottom: '0.5rem' }}>✦ &nbsp; ✦ &nbsp; ✦</div>
    <p style={{ fontSize: '12px', marginBottom: '0.75rem' }}>
      <a href="https://ko-fi.com/theorytrove" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', letterSpacing: '1px' }}>
        ✦ Support the Trove
      </a>
    </p>
    <p style={{ fontSize: '11px', opacity: 0.3, margin: 0, fontStyle: 'italic' }}>Unofficial fan site. All characters and lore belong to Sarah J. Maas and Bloomsbury Publishing. No affiliation or endorsement implied.</p>
  </footer>
);

function Rules() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      <header style={{ textAlign: 'center', padding: '2rem 2rem 1rem', borderBottom: '1px solid var(--border-dark)' }}>
        <div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--gold)', opacity: 0.7, marginBottom: '0.5rem' }}>
          ✦ &nbsp; A MAASVERSE FAN THEORY BOARD &nbsp; ✦
        </div>
        <h1 style={{ fontSize: '32px', letterSpacing: '4px', margin: 0 }}>THE THEORY TROVE</h1>
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
          <Link to="/" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>✦ Theories</Link>
          <Link to="/rules" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>✦ Rules of the Trove</Link>
          <Link to="/contact" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>✦ Contact</Link>
        </nav>
      </header>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>

        <div style={{ background: 'var(--rose)', color: 'var(--text)', padding: '1rem 1.5rem', marginBottom: '2rem', borderLeft: '3px solid var(--gold)' }}>
          <p style={{ margin: 0, fontSize: '14px', letterSpacing: '1px' }}>
            ⚠️ &nbsp; <strong>SPOILER WARNING</strong> — Theories on this site may reference any book across all three series including the most recent releases. Read at your own risk.
          </p>
        </div>

        <h2 style={{ fontSize: '20px', letterSpacing: '3px', marginBottom: '0.5rem' }}>Welcome to the Trove.</h2>
        <p style={{ fontStyle: 'italic', opacity: 0.7, marginBottom: '2rem', lineHeight: 1.8 }}>
          This is a safe space for fans of the Maasverse — ACOTAR, Throne of Glass, and Crescent City. Every theory is welcome here. Every fan is welcome here.
        </p>

        <h3 style={{ fontSize: '14px', letterSpacing: '3px', marginBottom: '1.5rem', color: 'var(--gold)' }}>◈ &nbsp; THE RULES OF THE TROVE</h3>

        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {[
            { num: '1', text: 'If you disagree with a theory, keep scrolling. This is not a debate space. There are no wrong theories, only yours and someone else\'s.' },
            { num: '2', text: 'Be kind. No bullying, no mockery, no negativity toward other fans or their theories.' },
            { num: '3', text: 'Protect yourself. Do not share personal information — your real name, location, or contact details.' },
            { num: '4', text: 'Keep theories about the books. This is not a space to discuss Sarah J. Maas as a person.' },
            { num: '5', text: 'No advertising, self promotion, or spam of any kind.' },
            { num: '6', text: 'Fan art submissions must be your own original work. You must hold the rights to anything you submit.' },
            { num: '7', text: null },
          ].map(rule => rule.num === '7' ? (
            <div key="7" style={{ background: 'var(--card-bg)', border: '1px solid var(--gold)', borderLeft: '3px solid var(--gold)', padding: '1.25rem' }}>
              <p style={{ margin: '0 0 0.5rem', fontSize: '11px', letterSpacing: '2px', color: 'var(--gold)' }}>◈ RULE 7 — COPYRIGHT</p>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.8 }}>
                <strong>Do not reproduce text from the books word for word.</strong> The works of Sarah J. Maas are protected by copyright and belong to her and Bloomsbury Publishing. You may reference a passage by book and chapter, but copying and pasting text directly from the books is not permitted and will be removed. This rule exists to protect this site and to respect the author's work.
              </p>
            </div>
          ) : (
            <div key={rule.num} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-dark)', padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--gold)', fontSize: '13px', minWidth: '20px', marginTop: '2px' }}>✦</span>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.8 }}>{rule.text}</p>
            </div>
          ))}
        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Rules;