import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { jobs } from '../data/jobs';
import '../App.css';

export default function JobDetailPage() {
  const { category, id } = useParams();
  const decodedCategory = decodeURIComponent(category || '');
  const job = jobs.find((j) => j.id === id && j.category === decodedCategory);
  const [showApply, setShowApply] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cv, setCv] = useState(null);
  const [cvError, setCvError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  if (!job) {
    return (
      <div className="app-root">
        <div className="container" style={{ padding: '40px 0' }}>
          <h2>Job not found</h2>
          <Link className="btn btn-outline" to={`/jobs/${encodeURIComponent(decodedCategory)}`}>← Back to Jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      <section className="job-detail">
        <div className="container job-detail-content">
          <div>
            <h1 className="job-detail-title">{job.title}</h1>
            <div className="job-detail-meta">{job.company} • {job.location}</div>
            <div className="job-tags" style={{ marginTop: 10 }}>
              <span className="tag">{job.salary}</span>
              <span className="tag">{job.type}</span>
            </div>
            <div className="job-detail-section">
              <h3>Description</h3>
              <p>{job.description}</p>
            </div>
            <div className="job-detail-section">
              <h3>Requirements</h3>
              <ul>
                {job.requirements?.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="job-detail-section">
                <h3>Responsibilities</h3>
                <ul>
                  {job.responsibilities.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            )}
            {(job.shift || job.experience || job.education) && (
              <div className="job-detail-section">
                <h3>Role Info</h3>
                {job.shift && <p><strong>Shift:</strong> {job.shift}</p>}
                {job.experience && <p><strong>Experience:</strong> {job.experience}</p>}
                {job.education && <p><strong>Education:</strong> {job.education}</p>}
              </div>
            )}
            {job.benefits && job.benefits.length > 0 && (
              <div className="job-detail-section">
                <h3>Benefits</h3>
                <ul>
                  {job.benefits.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            )}
            {(job.openings || job.contact) && (
              <div className="job-detail-section">
                <h3>Hiring Details</h3>
                {job.openings && <p><strong>Openings:</strong> {job.openings}</p>}
                {job.contact && <p><strong>Contact:</strong> {job.contact}</p>}
              </div>
            )}
            <div className="job-detail-actions">
              <button className="btn btn-primary" onClick={() => setShowApply(true)}>Apply Now</button>
              <Link className="btn btn-outline" to={`/jobs/${encodeURIComponent(decodedCategory)}`}>Back to {decodedCategory} Jobs</Link>
            </div>
          </div>
        </div>
      </section>
      {showApply && (
        <div className="modal-overlay" onClick={() => setShowApply(false)}>
          <div className="apply-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Apply for {job.title}</h3>
            <form
              className="apply-form"
              onSubmit={(e) => {
                e.preventDefault();
                const nameOk = name.trim().length >= 2;
                const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
                const phoneOk = /^\d{10,15}$/.test(phone.trim());
                const cvOk = !!cv && !cvError;
                setNameError(nameOk ? '' : 'Please enter your full name');
                setEmailError(emailOk ? '' : 'Please enter a valid email');
                setPhoneError(phoneOk ? '' : 'Please enter a valid phone number');
                if (!nameOk || !emailOk || !phoneOk || !cvOk) return;
                alert('Application submitted');
                setShowApply(false);
                setName('');
                setEmail('');
                setPhone('');
                setCv(null);
              }}
            >
              <div className="form-row">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    const v = e.target.value;
                    setName(v);
                    setNameError(v.trim().length >= 2 ? '' : 'Please enter your full name');
                  }}
                  placeholder="Enter full name"
                  required
                />
                {nameError && <div className="input-error">{nameError}</div>}
              </div>
              <div className="form-row">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const v = e.target.value;
                    setEmail(v);
                    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
                    setEmailError(ok ? '' : 'Please enter a valid email');
                  }}
                  placeholder="Enter email"
                  required
                />
                {emailError && <div className="input-error">{emailError}</div>}
              </div>
              <div className="form-row">
                <label>Phone Number</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="\d{10,15}"
                  maxLength={15}
                  value={phone}
                  onChange={(e) => {
                    const digits = (e.target.value || '').replace(/\D/g, '');
                    setPhone(digits);
                    const ok = /^\d{10,15}$/.test(digits);
                    setPhoneError(ok ? '' : 'Please enter a valid phone number');
                  }}
                  placeholder="Enter phone number"
                  required
                />
                {phoneError && <div className="input-error">{phoneError}</div>}
              </div>
              <div className="form-row">
                <label>Upload CV</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (!file) {
                      setCv(null);
                      setCvError('');
                      return;
                    }
                    const name = file.name.toLowerCase();
                    const extOk = ['.pdf', '.doc', '.docx'].some((ext) => name.endsWith(ext));
                    const isImage = (file.type || '').startsWith('image/');
                    if (!extOk || isImage) {
                      setCv(null);
                      setCvError('Please upload only PDF or DOC/DOCX files');
                      e.target.value = '';
                    } else {
                      setCv(file);
                      setCvError('');
                    }
                  }}
                />
                {cvError && <div className="input-error">{cvError}</div>}
              </div>
              <div className="apply-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    const nameOk = name.trim().length >= 2;
                    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
                    const phoneOk = /^\d{10,15}$/.test(phone.trim());
                    const cvOk = !!cv && !cvError;
                    if (!nameOk || !emailOk || !phoneOk || !cvOk) {
                      e.preventDefault();
                      setNameError(nameOk ? '' : 'Please enter your full name');
                      setEmailError(emailOk ? '' : 'Please enter a valid email');
                      setPhoneError(phoneOk ? '' : 'Please enter a valid phone number');
                      setCvError(cvOk ? '' : 'Please upload your CV (PDF or DOC/DOCX)');
                    }
                  }}
                >
                  Done
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setShowApply(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
