import './App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4567';

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

function Contact() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendMessage = async () => {
    if (!name.trim() || !message.trim()) {
      setStatus('Name and message are required.');
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, subject, message }),
      });
      if (res.ok) {
        setName('');
        setSubject('');
        setMessage('');
        setStatus('Your message has been sent to the Trove. ✦');
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      <header style={{ textAlign: 'center', padding: '2rem 2rem 1rem', borderBottom: '1px solid var(--border-dark)' }}>
        <div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--gold)', opacity: 0.7, marginBottom: '0.5rem' }}>
          ✦ &nbsp; A MAASVERSE FAN THEORY BOARD &nbsp; ✦
        </div>
        <h1 style={{ fontSize: '32px', letterSpacing: '4px', margin: 0 }}>THE THEORY TROVE</h1>
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
          <Link to="/" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>✦ Theories</Link>
          <Link to="/rules" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>✦ Rules of the Trove</Link>
          <Link to="/contact" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>✦ Contact</Link>
        </nav>
      </header>

      <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '0 2rem' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--gold)', textAlign: 'center', marginBottom: '0.25rem' }}>◈ &nbsp; SEND A MESSAGE &nbsp; ◈</p>
        <p style={{ fontSize: '12px', opacity: 0.5, textAlign: 'center', fontStyle: 'italic', marginBottom: '2rem' }}>"Whether it be a question, a concern, or a theory too big for 280 characters."</p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="✦ Your name"
            style={{ width: '100%', background: 'var(--card-bg)', border: '1px solid var(--border-dark)', color: 'var(--text)', padding: '0.75rem', fontSize: '14px', boxSizing: 'border-box' }}
          />
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="✦ Subject (optional)"
            style={{ width: '100%', background: 'var(--card-bg)', border: '1px solid var(--border-dark)', color: 'var(--text)', padding: '0.75rem', fontSize: '14px', boxSizing: 'border-box' }}
          />
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={6}
            placeholder="✦ Your message..."
            style={{ width: '100%', background: 'var(--card-bg)', border: '1px solid var(--violet)', borderTop: '2px solid var(--rose)', color: 'var(--text)', padding: '0.75rem', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {status && <p style={{ marginTop: '0.75rem', fontSize: '13px', color: 'var(--gold)', fontStyle: 'italic', textAlign: 'center' }}>{status}</p>}

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={sendMessage}
            style={{ background: 'var(--card-bg)', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '0.6rem 2.5rem', fontSize: '13px', cursor: 'pointer', letterSpacing: '2px' }}
          >
            ✦ &nbsp; SEND &nbsp; ✦
          </button>
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default Contact;