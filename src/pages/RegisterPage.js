import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

  const handlePhoneChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    setPhone(numericValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirm.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const domain = email.split('@')[1];
    if (!allowedDomains.includes(domain)) {
      setError('Email must be gmail.com, yahoo.com, or outlook.com');
      return;
    }

    if (phone.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character'
      );
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

    // ✅ If everything is valid → redirect to login
    navigate('/login');
  };

  return (
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
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                maxLength="10"
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
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

              <Link to="/login" className="helper-link">
                Already have an account?
              </Link>
            </div>

            <div className="auth-actions">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <Link to="/" className="btn btn-outline">
                Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}