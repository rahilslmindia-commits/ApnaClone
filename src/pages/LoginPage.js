import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!identifier.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    alert('Logged in');
  };

  return (
    <section className="auth">
      <div className="auth-card">
        <h2 style={{ marginTop: 0, marginBottom: 16 }}>Login</h2>
        <p className="sub" style={{ marginTop: 0 }}>
          Enter your details to continue
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label>Phone or Email</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter phone or email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="helper">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password" className="helper-link">
              Forgot password?
            </Link>
          </div>

          <div className="auth-actions">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <Link to="/register" className="btn btn-outline">
              Create account
            </Link>
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}