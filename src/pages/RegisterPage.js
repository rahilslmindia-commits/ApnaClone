import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirm.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (!agree) {
      setError('Please accept Terms & Privacy');
      return;
    }
    alert('Account created');
  };

  return (
    <div className="app-root">
      <section className="auth">
        <div className="container">
          <div className="auth-card">
            <h2 style={{ marginTop: 0, marginBottom: 16 }}>Create Account</h2>
            <p className="sub" style={{ marginTop: 0 }}>
              Sign up to find jobs and get hired faster
            </p>
            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="auth-error">{error}</div>}
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set a password"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirm password"
                />
              </div>
              <div className="helper">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>I agree to Terms & Privacy</span>
                </label>
                <Link to="/login" className="helper-link">Already have an account?</Link>
              </div>
              <div className="auth-actions">
                <button type="submit" className="btn btn-primary">Register</button>
                <Link to="/" className="btn btn-outline">Back to Home</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
