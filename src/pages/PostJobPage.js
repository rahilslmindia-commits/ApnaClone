import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PostJobPage() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [openings, setOpenings] = useState('');
  const [salaryFrom, setSalaryFrom] = useState('');
  const [salaryTo, setSalaryTo] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};
    if (title.trim().length < 2) e.title = 'Enter job title';
    if (company.trim().length < 2) e.company = 'Enter company';
    if (city.trim().length < 2) e.city = 'Enter city';
    if (!type) e.type = 'Choose type';
    if (!/^\d+$/.test(openings.trim())) e.openings = 'Enter numeric openings';
    if (!/^\d+$/.test(salaryFrom.trim())) e.salaryFrom = 'Enter numeric salary';
    if (!/^\d+$/.test(salaryTo.trim())) e.salaryTo = 'Enter numeric salary';
    if (description.trim().length < 10) e.description = 'Add job description';
    if (requirements.trim().length < 5) e.requirements = 'Add requirements';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  return (
    <div className="app-root">
      <section className="article">
        <div className="container article-content">
          <h1 className="article-title">Post a Job</h1>
          <p style={{ color: '#64748b' }}>Share your opening. We will connect you with matching candidates.</p>
          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!validate()) return;
              alert('Thanks! Your job has been received. Our team will contact you.');
              setTitle(''); setCompany(''); setCity(''); setType('');
              setOpenings(''); setSalaryFrom(''); setSalaryTo('');
              setDescription(''); setRequirements(''); setErrors({});
            }}
          >
            <div className="form-group">
              <label>Job Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Sales Executive" />
              {errors.title && <div className="input-error">{errors.title}</div>}
            </div>
            <div className="form-group">
              <label>Company</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" />
              {errors.company && <div className="input-error">{errors.company}</div>}
            </div>
            <div className="form-group">
              <label>City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
              {errors.city && <div className="input-error">{errors.city}</div>}
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="WFH">WFH</option>
                <option value="Onsite">Onsite</option>
              </select>
              {errors.type && <div className="input-error">{errors.type}</div>}
            </div>
            <div className="form-group">
              <label>Openings</label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="\d+"
                value={openings}
                onChange={(e) => setOpenings((e.target.value || '').replace(/\D/g, ''))}
                placeholder="e.g. 5"
              />
              {errors.openings && <div className="input-error">{errors.openings}</div>}
            </div>
            <div className="form-group">
              <label>Salary Range (₹ per month)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="\d+"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom((e.target.value || '').replace(/\D/g, ''))}
                  placeholder="From"
                />
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="\d+"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo((e.target.value || '').replace(/\D/g, ''))}
                  placeholder="To"
                />
              </div>
              {(errors.salaryFrom || errors.salaryTo) && (
                <div className="input-error">{errors.salaryFrom || errors.salaryTo}</div>
              )}
            </div>
            <div className="form-group">
              <label>Description</label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short role description" />
              {errors.description && <div className="input-error">{errors.description}</div>}
            </div>
            <div className="form-group">
              <label>Requirements</label>
              <input value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="Key skills and experience" />
              {errors.requirements && <div className="input-error">{errors.requirements}</div>}
            </div>
            <div className="auth-actions">
              <button type="submit" className="btn btn-primary">Submit Job</button>
              <Link className="btn btn-outline" to="/">Cancel</Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
