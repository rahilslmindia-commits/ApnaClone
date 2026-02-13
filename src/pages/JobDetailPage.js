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
  const [surname,setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cv, setCv] = useState(null);
  const [cvError, setCvError] = useState('');
  const [nameError, setNameError] = useState('');
  const [surnameError,setSurnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [post, setPost] = useState(job?.title || '');
  const [currentSalary, setCurrentSalary] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [genderError, setGenderError] = useState('');
  const [cityError, setCityError] = useState('');
  const [experienceError, setExperienceError] = useState('');
  const [qualificationError, setQualificationError] = useState('');
  const [postError, setPostError] = useState('');
  const [currentSalaryError, setCurrentSalaryError] = useState('');
  const [expectedSalaryError, setExpectedSalaryError] = useState('');
  const [noticePeriodError, setNoticePeriodError] = useState('');

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
                const surnameOk = surname.trim().length >= 2;
                const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
                const phoneOk = /^\d{10,15}$/.test(phone.trim());
                const cvOk = !!cv && !cvError;
                const genderOk = !!gender;
                const cityOk = city.trim().length >= 2;
                const expOk = experience.trim().length >= 1;
                const qualOk = qualification.trim().length >= 2;
                const postOk = post.trim().length >= 2;
                const curSalOk = /^\d+$/.test(currentSalary.trim());
                const expSalOk = /^\d+$/.test(expectedSalary.trim());
                const noticeOk = /^\d+$/.test(noticePeriod.trim());
                setNameError(nameOk ? '' : 'Please enter your full name');
                setSurnameError(surnameOk ? '' : 'Please enter your surname');
                setEmailError(emailOk ? '' : 'Please enter a valid email');
                setPhoneError(phoneOk ? '' : 'Please enter a valid phone number');
                setGenderError(genderOk ? '' : 'Please select your gender');
                setCityError(cityOk ? '' : 'Please enter your city');
                setExperienceError(expOk ? '' : 'Please enter your experience');
                setQualificationError(qualOk ? '' : 'Please enter your qualification');
                setPostError(postOk ? '' : 'Please enter the post');
                setCurrentSalaryError(curSalOk ? '' : 'Enter a valid number');
                setExpectedSalaryError(expSalOk ? '' : 'Enter a valid number');
                setNoticePeriodError(noticeOk ? '' : 'Enter a valid number');
                if (
                  !nameOk || !surnameOk || !emailOk || !phoneOk || !cvOk ||
                  !genderOk || !cityOk || !expOk || !qualOk || !postOk ||
                  !curSalOk || !expSalOk || !noticeOk
                ) return;
                alert('Application submitted');
                setShowApply(false);
                setName('');
                setSurname('');
                setEmail('');
                setPhone('');
                setCv(null);
                setGender('');
                setCity('');
                setExperience('');
                setQualification('');
                setPost(job.title);
                setCurrentSalary('');
                setExpectedSalary('');
                setNoticePeriod('');
              }}
            >
              <div className="apply-form-grid">
                <div className="form-row">
                  <label>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      const v = e.target.value;
                      setName(v);
                      setNameError(v.trim().length >= 2 ? '' : 'Please enter your name');
                    }}
                    placeholder="Enter Full Name"
                    required
                  />
                  {nameError && <div className="input-error">{nameError}</div>}
                </div>
                <div className="form-row">
                  <label>Surname</label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => {
                      const v = e.target.value;
                      setSurname(v);
                      setSurnameError(v.trim().length >= 2 ? '' : 'Please enter your surname');
                    }}
                    placeholder="Enter Surname"
                    required
                  />
                  {surnameError && <div className="input-error">{surnameError}</div>}
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
                    placeholder="Enter Email"
                    required
                  />
                  {emailError && <div className="input-error">{emailError}</div>}
                </div>
                <div className="form-row">
                  <label>Mobile Number</label>
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
                    placeholder="Enter Mobile Number"
                    required
                  />
                  {phoneError && <div className="input-error">{phoneError}</div>}
                </div>
                <div className="form-row">
                  <label>Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => {
                      const v = e.target.value;
                      setGender(v);
                      setGenderError(v ? '' : 'Please select your gender');
                    }}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {genderError && <div className="input-error">{genderError}</div>}
                </div>
                <div className="form-row">
                  <label>City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCity(v);
                      setCityError(v.trim().length >= 2 ? '' : 'Please enter your city');
                    }}
                    placeholder="Enter City"
                    required
                  />
                  {cityError && <div className="input-error">{cityError}</div>}
                </div>
                <div className="form-row">
                  <label>Experience</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => {
                      const v = e.target.value;
                      setExperience(v);
                      setExperienceError(v.trim().length >= 1 ? '' : 'Please enter your experience');
                    }}
                    placeholder="e.g. 2 years in Sales"
                    required
                  />
                  {experienceError && <div className="input-error">{experienceError}</div>}
                </div>
                <div className="form-row">
                  <label>Qualification</label>
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => {
                      const v = e.target.value;
                      setQualification(v);
                      setQualificationError(v.trim().length >= 2 ? '' : 'Please enter your qualification');
                    }}
                    placeholder="e.g. B.Com / 12th Pass"
                    required
                  />
                  {qualificationError && <div className="input-error">{qualificationError}</div>}
                </div>
                <div className="form-row">
                  <label>Post</label>
                  <input
                    type="text"
                    value={post}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPost(v);
                      setPostError(v.trim().length >= 2 ? '' : 'Please enter the post');
                    }}
                    placeholder="Role you are applying for"
                    required
                  />
                  {postError && <div className="input-error">{postError}</div>}
                </div>
                <div className="form-row">
                  <label>Current Salary</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="\d+"
                    value={currentSalary}
                    onChange={(e) => {
                      const digits = (e.target.value || '').replace(/\D/g, '');
                      setCurrentSalary(digits);
                      setCurrentSalaryError(/^\d+$/.test(digits) ? '' : 'Enter a valid number');
                    }}
                    placeholder="₹ per month"
                    required
                  />
                  {currentSalaryError && <div className="input-error">{currentSalaryError}</div>}
                </div>
                <div className="form-row">
                  <label>Expected Salary</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="\d+"
                    value={expectedSalary}
                    onChange={(e) => {
                      const digits = (e.target.value || '').replace(/\D/g, '');
                      setExpectedSalary(digits);
                      setExpectedSalaryError(/^\d+$/.test(digits) ? '' : 'Enter a valid number');
                    }}
                    placeholder="₹ per month"
                    required
                  />
                  {expectedSalaryError && <div className="input-error">{expectedSalaryError}</div>}
                </div>
                <div className="form-row">
                  <label>Notice Period (days)</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="\d+"
                    value={noticePeriod}
                    onChange={(e) => {
                      const digits = (e.target.value || '').replace(/\D/g, '');
                      setNoticePeriod(digits);
                      setNoticePeriodError(/^\d+$/.test(digits) ? '' : 'Enter a valid number');
                    }}
                    placeholder="e.g. 30"
                    required
                  />
                  {noticePeriodError && <div className="input-error">{noticePeriodError}</div>}
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
                      const n = file.name.toLowerCase();
                      const extOk = ['.pdf', '.doc', '.docx'].some((ext) => n.endsWith(ext));
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
              </div>
              <div className="apply-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    const nameOk = name.trim().length >= 2;
                    const surnameOk = surname.trim().length >= 2;
                    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
                    const phoneOk = /^\d{10,15}$/.test(phone.trim());
                    const cvOk = !!cv && !cvError;
                    const genderOk = !!gender;
                    const cityOk = city.trim().length >= 2;
                    const expOk = experience.trim().length >= 1;
                    const qualOk = qualification.trim().length >= 2;
                    const postOk = post.trim().length >= 2;
                    const curSalOk = /^\d+$/.test(currentSalary.trim());
                    const expSalOk = /^\d+$/.test(expectedSalary.trim());
                    const noticeOk = /^\d+$/.test(noticePeriod.trim());
                    if (!nameOk || !surnameOk || !emailOk || !phoneOk || !cvOk || !genderOk || !cityOk || !expOk || !qualOk || !postOk || !curSalOk || !expSalOk || !noticeOk) {
                      e.preventDefault();
                      setNameError(nameOk ? '' : 'Please enter your full name');
                      setSurnameError(surnameOk ? '' : 'Please enter your surname');
                      setEmailError(emailOk ? '' : 'Please enter a valid email');
                      setPhoneError(phoneOk ? '' : 'Please enter a valid phone number');
                      setCvError(cvOk ? '' : 'Please upload your CV (PDF or DOC/DOCX)');
                      setGenderError(genderOk ? '' : 'Please select your gender');
                      setCityError(cityOk ? '' : 'Please enter your city');
                      setExperienceError(expOk ? '' : 'Please enter your experience');
                      setQualificationError(qualOk ? '' : 'Please enter your qualification');
                      setPostError(postOk ? '' : 'Please enter the post');
                      setCurrentSalaryError(curSalOk ? '' : 'Enter a valid number');
                      setExpectedSalaryError(expSalOk ? '' : 'Enter a valid number');
                      setNoticePeriodError(noticeOk ? '' : 'Enter a valid number');
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
