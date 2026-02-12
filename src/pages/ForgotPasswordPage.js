import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!identifier.trim()) {
      setError('Please enter phone or email');
      return;
    }
    setSuccess('Reset link/OTP has been sent to your contact');
  };

  return (
    <div className="app-root">
      <section className="auth">
        <div className="container">
          <div className="auth-card">
            <h2 style={{ marginTop: 0, marginBottom: 16 }}>Forgot Password</h2>
            <p className="sub" style={{ marginTop: 0 }}>
              Enter your phone or email to receive a reset link/OTP
            </p>
            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="auth-error">{error}</div>}
              {success && <div className="auth-success">{success}</div>}
              <div className="form-group">
                <label>Phone or Email</label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter phone or email"
                />
              </div>
              <div className="auth-actions">
                <button type="submit" className="btn btn-primary">Send Reset</button>
                <Link to="/login" className="btn btn-outline">Back to Login</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
