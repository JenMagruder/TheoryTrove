import { useState, useEffect } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4567';

const SERIES_COLORS = {
  'ACOTAR': 'var(--sapphire)',
  'Throne of Glass': 'var(--emerald)',
  'Crescent City': 'var(--crimson)',
  'Crossover': 'var(--gold)',
  'Valkyrie Cycle': 'var(--violet)',
};

const SERIES_LIST = Object.keys(SERIES_COLORS);

const Divider = ({ src, alt, height = 100 }) => (
  <div style={{ textAlign: 'center', padding: '1rem 0', opacity: 0.08 }}>
    <img src={src} alt={alt} style={{ height: `${height}px`, filter: 'invert(1) sepia(1) saturate(2) hue-rotate(10deg)' }} />
  </div>
);

function App() {
  const [theories, setTheories] = useState([]);
  const [theoryText, setTheoryText] = useState('');
  const [tags, setTags] = useState('');
  const [reference, setReference] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTheories();
  }, []);

  const fetchTheories = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/theories`);
      const data = await res.json();
      setTheories(data);
    } catch (err) {
      console.error('Failed to fetch theories', err);
    }
  };

  const submitTheory = async () => {
    if (!theoryText.trim()) {
      setMessage('Your theory cannot be empty.');
      return;
    }
    if (theoryText.length > 280) {
      setMessage('Your theory must be 280 characters or fewer.');
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/theories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theory_text: theoryText,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          reference: reference.trim(),
        }),
      });
      if (res.ok) {
        setTheoryText('');
        setTags('');
        setReference('');
        setMessage('Your theory has been added to the Trove. ✦');
        fetchTheories();
      }
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  const filteredTheories = activeFilter
    ? theories.filter(t => t.tags && t.tags.includes(activeFilter))
    : theories;

  const getColor = (tags) => {
    if (!tags) return 'var(--gold)';
    for (const series of SERIES_LIST) {
      if (tags.includes(series)) return SERIES_COLORS[series];
    }
    return 'var(--gold)';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      <header style={{ textAlign: 'center', padding: '2rem 2rem 1rem', borderBottom: '1px solid var(--border-dark)' }}>
        <div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--gold)', opacity: 0.7, marginBottom: '0.5rem' }}>
          ✦ &nbsp; A MAASVERSE FAN THEORY BOARD &nbsp; ✦
        </div>
        <h1 style={{ fontSize: '32px', letterSpacing: '4px', margin: 0 }}>THE THEORY TROVE</h1>
        <div style={{ margin: '0.75rem 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          <div style={{ height: '1px', width: '60px', background: 'var(--gold)', opacity: 0.4 }}></div>
          <span style={{ color: 'var(--rose)', fontSize: '13px', fontStyle: 'italic' }}>Where secrets of the Maasverse live</span>
          <div style={{ height: '1px', width: '60px', background: 'var(--gold)', opacity: 0.4 }}></div>
        </div>
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
          <a href="#theories">✦ Theories</a>
          <a href="#submit">✦ Submit</a>
          <a href="#rules">✦ Rules of the Trove</a>
        </nav>
      </header>

      <Divider src="/deer.svg" alt="" height={120} />

      <section id="submit" style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-dark)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--gold)', marginBottom: '0.25rem' }}>◈ &nbsp; SUBMIT A THEORY &nbsp; ◈</p>
          <p style={{ fontSize: '12px', opacity: 0.5, marginBottom: '1rem', fontStyle: 'italic' }}>"All secrets find their way to the Trove. Anonymous. 280 characters. No arguing."</p>
          <textarea
            value={theoryText}
            onChange={e => setTheoryText(e.target.value)}
            rows={3}
            maxLength={280}
            placeholder="Your theory awaits..."
            style={{ width: '100%', background: 'var(--card-bg)', border: '1px solid var(--violet)', borderTop: '2px solid var(--rose)', color: 'var(--text)', padding: '1rem', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}
          />
          <div style={{ textAlign: 'right', fontSize: '11px', opacity: 0.4, marginTop: '2px' }}>{theoryText.length} / 280</div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <input
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="✦ Tags, comma separated"
              style={{ flex: 1, background: 'var(--card-bg)', border: '1px solid var(--border-dark)', color: 'var(--text)', padding: '0.5rem', fontSize: '13px', minWidth: '140px', boxSizing: 'border-box' }}
            />
            <input
              value={reference}
              onChange={e => setReference(e.target.value)}
              placeholder="✦ Book / Chapter ref"
              style={{ flex: 1, background: 'var(--card-bg)', border: '1px solid var(--border-dark)', color: 'var(--text)', padding: '0.5rem', fontSize: '13px', minWidth: '140px', boxSizing: 'border-box' }}
            />
          </div>
          {message && <p style={{ marginTop: '0.5rem', fontSize: '13px', color: 'var(--gold)', fontStyle: 'italic' }}>{message}</p>}
          <button
            onClick={submitTheory}
            style={{ marginTop: '0.75rem', background: 'var(--card-bg)', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '0.6rem 2.5rem', fontSize: '13px', cursor: 'pointer', letterSpacing: '2px' }}
          >
            ✦ &nbsp; SUBMIT &nbsp; ✦
          </button>
        </div>
      </section>

      <Divider src="/mountains.svg" alt="" height={100} />

      <section id="theories" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => setActiveFilter(null)} style={{ background: activeFilter === null ? 'var(--gold)' : 'var(--card-bg)', color: activeFilter === null ? '#0a0a12' : 'var(--gold)', border: '1px solid var(--gold)', padding: '0.3rem 1rem', fontSize: '12px', cursor: 'pointer', letterSpacing: '1px' }}>✦ ALL</button>
          {SERIES_LIST.map(series => (
            <button key={series} onClick={() => setActiveFilter(series)} style={{ background: activeFilter === series ? SERIES_COLORS[series] : 'var(--card-bg)', color: activeFilter === series ? 'var(--text)' : SERIES_COLORS[series], border: `1px solid ${SERIES_COLORS[series]}`, padding: '0.3rem 1rem', fontSize: '12px', cursor: 'pointer', letterSpacing: '1px' }}>
              ◈ {series.toUpperCase()}
            </button>
          ))}
        </div>

        {filteredTheories.length === 0 && (
          <p style={{ textAlign: 'center', opacity: 0.4, fontStyle: 'italic', marginTop: '2rem' }}>No theories yet. Be the first to add to the Trove.</p>
        )}

        <div style={{ display: 'grid', gap: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
          {filteredTheories.map((theory, i) => {
            const color = getColor(theory.tags);
            return (
              <div key={i} style={{ background: 'var(--card-bg)', border: `1px solid ${color}`, borderTop: `2px solid ${color}`, padding: '1.25rem', position: 'relative' }}>
                {theory.tags && theory.tags.length > 0 && (
                  <div style={{ position: 'absolute', top: '-1px', left: '1rem', background: color, color: color === 'var(--gold)' ? '#0a0a12' : 'var(--text)', fontSize: '10px', padding: '2px 8px', letterSpacing: '2px' }}>
                    {theory.tags[0].toUpperCase()}
                  </div>
                )}
                <p style={{ margin: '0.75rem 0 0.75rem', fontSize: '15px', lineHeight: 1.7, fontStyle: 'italic' }}>"{theory.theory_text}"</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  {theory.tags && theory.tags.map((tag, j) => (
                    <span key={j} style={{ color, fontSize: '11px', border: `1px solid ${color}`, padding: '1px 8px', letterSpacing: '1px' }}>{tag}</span>
                  ))}
                </div>
                <p style={{ margin: 0, fontSize: '11px', opacity: 0.4, letterSpacing: '1px' }}>
                  ✦ &nbsp; {theory.reference || 'No reference'} &nbsp; · &nbsp; {new Date(theory.sk).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <Divider src="/compass-star.svg" alt="" height={80} />

      <footer style={{ borderTop: '1px solid var(--border-dark)', padding: '1.5rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', color: 'var(--gold)', opacity: 0.5, letterSpacing: '2px', marginBottom: '0.5rem' }}>✦ &nbsp; ✦ &nbsp; ✦</div>
        <p style={{ fontSize: '11px', opacity: 0.3, margin: 0, fontStyle: 'italic' }}>Unofficial fan site. All characters and lore belong to Sarah J. Maas and Bloomsbury Publishing. No affiliation or endorsement implied.</p>
      </footer>

    </div>
  );
}

export default App;