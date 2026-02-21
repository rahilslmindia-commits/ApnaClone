import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [needs, setNeeds] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};
    if (name.trim().length < 2) e.name = 'Enter your name';
    if (company.trim().length < 2) e.company = 'Enter company name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Enter valid email';
    if (!/^\d{10,15}$/.test(phone.trim())) e.phone = 'Enter valid phone';
    if (city.trim().length < 2) e.city = 'Enter city';
    if (needs.trim().length < 2) e.needs = 'Describe hiring needs';
    if (!/^\d+$/.test(budget.trim())) e.budget = 'Enter numeric budget';
    if (timeline.trim().length < 1) e.timeline = 'Enter timeline';
    if (message.trim().length < 5) e.message = 'Enter a short message';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  return (
    <div className="app-root">
      <section className="article">
        <div className="container article-content">
          <h1 className="article-title">Contact Us</h1>
          <p style={{ color: '#64748b' }}>Share your hiring requirements. Our team will reach out quickly.</p>
          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!validate()) return;
              alert('Thanks! Our team will contact you shortly.');
              setName(''); setCompany(''); setEmail(''); setPhone('');
              setCity(''); setNeeds(''); setBudget(''); setTimeline(''); setMessage('');
              setErrors({});
            }}
          >
            <div className="form-group">
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              {errors.name && <div className="input-error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label>Company</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" />
              {errors.company && <div className="input-error">{errors.company}</div>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              {errors.email && <div className="input-error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="\d{10,15}"
                value={phone}
                onChange={(e) => setPhone((e.target.value || '').replace(/\D/g, ''))}
                placeholder="Phone number"
              />
              {errors.phone && <div className="input-error">{errors.phone}</div>}
            </div>
            <div className="form-group">
              <label>City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
              {errors.city && <div className="input-error">{errors.city}</div>}
            </div>
            <div className="form-group">
              <label>Hiring Needs</label>
              <input value={needs} onChange={(e) => setNeeds(e.target.value)} placeholder="Roles, count, experience" />
              {errors.needs && <div className="input-error">{errors.needs}</div>}
            </div>
            <div className="form-group">
              <label>Budget (₹ per hire)</label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="\d+"
                value={budget}
                onChange={(e) => setBudget((e.target.value || '').replace(/\D/g, ''))}
                placeholder="e.g. 5000"
              />
              {errors.budget && <div className="input-error">{errors.budget}</div>}
            </div>
            <div className="form-group">
              <label>Timeline</label>
              <input value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="e.g. 2 weeks" />
              {errors.timeline && <div className="input-error">{errors.timeline}</div>}
            </div>
            <div className="form-group">
              <label>Message</label>
              <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Anything else?" />
              {errors.message && <div className="input-error">{errors.message}</div>}
            </div>
            <div className="auth-actions">
              <button type="submit" className="btn btn-primary">Submit</button>
              <Link className="btn btn-outline" to="/">Cancel</Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
