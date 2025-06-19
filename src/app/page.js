  "use client"
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [accessToken, setAccessToken] = useState('');
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      setAccessToken(token);
      // optional: clean URL after setting
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const handleConnect = () => {
    const url = `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;
    window.location.href = url;
  };

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({ ...form, token: accessToken }),
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>GHL OAuth + Contact Form</h1>
      {!accessToken ? (
        <button onClick={handleConnect}>Connect with GHL</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} required /><br />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} required /><br />
          <button type="submit">Create Contact</button>
        </form>
      )}
    </main>
  );
}
