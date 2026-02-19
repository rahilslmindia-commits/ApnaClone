import { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { jobs } from './data/jobs';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import SearchPage from './pages/SearchPage';
import AdvicePage from './pages/AdvicePage';
import AdviceDetailPage from './pages/AdviceDetailPage';
import AboutPage from './pages/AboutPage';
import { adviceArticles } from './data/advice';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';
import Logo from '../src/images/Media.png';

function Home() {
  const [roleQuery, setRoleQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [filterMode, setFilterMode] = useState('');
  const navigate = useNavigate();
  const categories = [
    'Delivery Boy',
    'Telecaller',
    'Sales',
    'Back Office',
    'BPO',
    'Receptionist',
    'Accountant',
    'Data Entry',
    'Teacher',
    'Marketing',
    'Security Guard',
    'Driver',
    'Cook',
    'Househelp',
    'Office Boy',
    'Technician',
  ];
  const cities = [
    'Delhi NCR',
    'Mumbai',
    'Bengaluru',
    'Pune',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Jaipur',
    'Ahmedabad',
    'Surat',
    'Indore',
    'Lucknow',
    'Nagpur',
    'Bhopal',
  ];
  const companies = [
    'Flipkart',
    'Amazon',
    'Ola',
    'Uber',
    'HDFC Bank',
    'Reliance',
    'TCS',
    'Wipro',
  ];
  const dedupe = (arr) => {
    const seen = new Set();
    return arr.filter((j) => {
      const k = `${j.title}|${j.company}|${j.location}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };
  const filteredFeatured = jobs.filter((j) => {
    const r = roleQuery.trim().toLowerCase();
    const c = cityQuery.trim().toLowerCase();
    const matchRole =
      !r ||
      j.title.toLowerCase().includes(r) ||
      j.company.toLowerCase().includes(r);
    const matchCity = !c || j.location.toLowerCase().includes(c);
    return matchRole && matchCity;
  });
  
  // Featured jobs based on search or default
  const homeResults = roleQuery.trim() || cityQuery.trim()
    ? dedupe(filteredFeatured).slice(0, 6)
    : dedupe(jobs).slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="container hero-content reveal-up">
          <h1 className="headline-gradient">Search Jobs Online | Hire Candidates | Post a Job</h1>
          <p className="sub"></p>
          <div className="searchbar">
            <input
              type="text"
              placeholder="Role or company"
              value={roleQuery}
              onChange={(e) => setRoleQuery(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
            />
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              aria-label="Job mode"
            >
              <option value="">Job Type</option>
              <option value="wfh">WFH</option>
              <option value="onsite">Onsite</option>
              <option value="full">Full-time</option>
              <option value="part">Part-time</option>
            </select>
            <button
              className="btn btn-primary"
              disabled={!roleQuery.trim() && !cityQuery.trim() && !filterMode}
              title={!roleQuery.trim() && !cityQuery.trim() && !filterMode ? 'Enter role/city or choose a mode' : undefined}
              onClick={() => {
                const params = new URLSearchParams();
                if (roleQuery.trim()) params.set('role', roleQuery.trim());
                if (cityQuery.trim()) params.set('city', cityQuery.trim());
                if (filterMode === 'wfh') {
                  params.set('mode', 'wfh');
                  params.set('limit', '10');
                } else if (filterMode === 'onsite') {
                  params.set('mode', 'onsite');
                  params.set('limit', '10');
                } else if (filterMode === 'full') {
                  params.set('type', 'Full-time');
                  params.set('limit', '10');
                } else if (filterMode === 'part') {
                  params.set('type', 'Part-time');
                  params.set('limit', '10');
                }
                if (params.toString()) {
                  navigate(`/search?${params.toString()}`);
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section - NOW USING homeResults VARIABLE */}
      {/* {homeResults.length > 0 && (
        <section className="featured-jobs">
          <div className="container">
            <h2>{roleQuery.trim() || cityQuery.trim() ? 'Search Results' : 'Featured Jobs'}</h2>
            <div className="jobs-grid">
              {homeResults.map((job, index) => (
                <div key={index} className="job-card">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-company">{job.company}</p>
                  <p className="job-location">
                    <span>📍 {job.location}</span>
                    {job.salary && <span>💰 {job.salary}</span>}
                  </p>
                  <div className="job-type">
                    {job.type && <span className="badge">{job.type}</span>}
                    {job.mode && <span className="badge">{job.mode}</span>}
                  </div>
                  <Link 
                    to={`/jobs/${encodeURIComponent(job.title)}/${job.id || index}`} 
                    className="btn btn-primary btn-small"
                  >
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
            {(roleQuery.trim() || cityQuery.trim()) && (
              <div className="view-all-link">
                <Link to={`/search?role=${encodeURIComponent(roleQuery)}&city=${encodeURIComponent(cityQuery)}`} className="btn btn-outline">
                  View All Results →
                </Link>
              </div>
            )}
          </div>
        </section>
      )} */}

      < section id="jobs" className="categories">
        <div className="container">
          <h2>Popular Categories</h2>
          <div className="grid">
            {categories.map((c) => (
              <div key={c} className="card">
                <div className="card-title">{c}</div>
                <div className="card-sub">
                  <Link to={`/jobs/${encodeURIComponent(c)}${c === 'Delivery Boy' ? '?view=cards' : ''}`}>View Jobs</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {[
              { n: '25,000+', l: 'Live Jobs' },
              { n: '5,000+', l: 'Hiring Companies' },
              { n: '30+', l: 'Cities Covered' },
              { n: '1M+', l: 'Daily Users' },
            ].map((s) => (
              <div key={s.l} className="stat-card">
                <div className="stat-number">{s.n}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-advice">
        <div className="container">
          <h2>Latest Advice</h2>
          <div className="grid">
            {adviceArticles.slice(0, 3).map((a) => (
              <div key={a.slug} className="advice-card">
                <div className="advice-title">{a.title}</div>
                <div className="advice-summary">{a.sections[0]?.content}</div>
                <div className="advice-actions">
                  <Link className="btn btn-outline small" to={`/advice/${a.slug}`}>Read</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how">
        <div className="container">
          <h2>How it works</h2>
          <div className="how-grid">
            {[
              { t: 'Sign up', s: 'Create your free profile in minutes.' },
              { t: 'Search & apply', s: 'Find relevant jobs and apply instantly.' },
              { t: 'Chat with HR', s: 'Discuss details and schedule interviews.' },
              { t: 'Get hired', s: 'Join your new job quickly.' },
            ].map((x) => (
              <div key={x.t} className="how-card">
                <div className="how-title">{x.t}</div>
                <div className="how-sub">{x.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why choose LmIndia</h2>
          <div className="feature-grid">
            {[
              { t: 'Verified openings', s: 'Reviewed listings with real-time updates.' },
              { t: 'Direct chat with HR', s: 'Clarify details and schedule interviews quickly.' },
              { t: 'City-wise filters', s: 'Find roles in your location easily.' },
              { t: 'Fast hiring', s: 'Streamlined apply flow and quick response.' },
            ].map((f) => (
              <div key={f.t} className="feature-card">
                <div className="feature-title">{f.t}</div>
                <div className="feature-sub">{f.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="download">
        <div className="container download-content">
          <div>
            <h2>Download the LmIndia</h2>
            <p className="sub">Find jobs, chat with HR, schedule interviews and get hired faster.</p>
            <div className="stores">
              <a href="#play" className="store">Get it on Play Store</a>
              <a href="#appstore" className="store">Download on App Store</a>
            </div>
          </div>
          <div className="phone-mock" aria-hidden="true"></div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2>What our users say</h2>
          <div className="grid">
            {[
              {
                name: 'Shiwangi Singla',
                text:
                  'Thanks LmIndia for helping me find a job without much hassle. If you are a fresher or a skilled person with expert knowledge in a specific field, you can easily find a job through the LmIndia.',
              },
              {
                name: 'Jenil Ghevariya',
                text:
                  'This app is very helpful if you are looking for a job and the team is also very supportive and friendly. They guided me through every stage. It is very easy to find a job on LmIndia because there are a lot of job options here for everyone. I got a job interview call very quickly after applying.',
              },
              {
                name: 'Kaynat Mansuri',
                text:
                  'It is definitely a great app with correct and true information on the job details. I am happy to use it and I would also recommend my friends to use it for their career development.',
              },
              {
                name: 'Rekha',
                text:
                  'Good and helpful app, even for freshers who don\'t have good qualifications. There are jobs for Caretakers, Househelp and many more. It\'s very easy to find jobs here. Thank you, LmIndia!',
              },
            ].map((t) => (
              <div key={t.name} className="t-card">
                <div className="t-stars">★★★★☆ 4.5</div>
                <p className="t-text">{t.text}</p>
                <div className="t-name">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cities">
        <div className="container">
          <h2>Popular Cities</h2>
          <div className="badges">
            {cities.map((city) => (
              <span key={city} className="badge">{city}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="companies">
        <div className="container">
          <h2>Top Companies</h2>
          <div className="badges">
            {companies.map((c) => (
              <span key={c} className="badge badge-light">{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <h2>FAQs</h2>
          <div className="faq-grid">
            {[
              { q: 'How to apply for a job on Lamindia?', a: 'Type Role/City in the search bar, press Apply on the job card and fill in the basic details.' },
              { q: 'Are there jobs available for freshers?', a: 'Yes, roles like delivery, telecaller, back office, data entry are available for freshers.' },
              { q: 'How do employers post jobs?', a: 'Employers can reach candidates instantly by adding job details through the Post a Job button.' },
              { q: 'How is the interview scheduled?', a: 'You can fix the interview time by chatting with everyone through the app.' },
            ].map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <div className="faq-answer">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      
      <section id="employers" className="cta">
        <div className="container cta-content">
          <div>
            <h2>Hire candidates faster</h2>
            <p className="sub">Reach millions of job seekers across India.</p>
          </div>
          <a href="#post" className="btn btn-primary">
            Post a Job
          </a>
        </div>
      </section>
    </>
  );
}

function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const jobsRef = useRef(null);
  const { pathname } = useLocation();
  
  useEffect(() => {
    const onDocClick = (e) => {
      if (jobsOpen && jobsRef.current && !jobsRef.current.contains(e.target)) {
        setJobsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [jobsOpen]);
  
  useEffect(() => {
    const el = document.documentElement;
    if (dark) {
      el.classList.add('theme-dark');
    } else {
      el.classList.remove('theme-dark');
    }
  }, [dark]);
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="app-root">
      <header className="header">
        <div className="container header-content">
          <Link to="/" onClick={() => setMenuOpen(false)} style={{ display: 'block' }}>
            <img
              src={Logo}
              alt="JTM India Logo"
              style={{
                height: "50px",
                width: "auto",
                cursor: "pointer",
                objectFit: "contain",
                display: "block"
              }}
            />
          </Link>
          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)}>Menu</button>
          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <div style={{ position: 'relative' }} ref={jobsRef}>
              <button
                className={`jobs-toggle ${jobsOpen ? 'active' : ''}`}
                onClick={() => setJobsOpen((v) => !v)}
              >
                Jobs
              </button>
              {jobsOpen && (
                <div className="mega">
                  <div className="mega-col">
                    <div className="mega-title">Explore</div>
                    <Link to="/search?type=Part-time&limit=10" onClick={() => { setMenuOpen(false); setJobsOpen(false); }}>Part Time Jobs</Link>
                    <Link to="/search?type=Full-time&limit=10" onClick={() => { setMenuOpen(false); setJobsOpen(false); }}>Full Time Jobs</Link>
                    <Link to="/search?exp=fresher" onClick={() => { setMenuOpen(false); setJobsOpen(false); }}>Freshers Jobs</Link>
                    <Link to="/search?shift=night" onClick={() => { setMenuOpen(false); setJobsOpen(false); }}>Night Shift Jobs</Link>
                    <Link to="/search?mode=onsite&limit=10" onClick={() => { setMenuOpen(false); setJobsOpen(false); }}>Delivery/Driver Jobs</Link>
                    <Link to="/search?mode=wfh&limit=10" onClick={() => { setMenuOpen(false); setJobsOpen(false); }}>Back Office Jobs</Link>
                  </div>
                  <div className="mega-col">
                    <div className="mega-title">Jobs by City</div>
                    <div className="mega-grid">
                      {[
                        'Delhi NCR', 'Mumbai', 'Bengaluru', 'Pune', 'Hyderabad', 'Chennai',
                        'Kolkata', 'Jaipur', 'Ahmedabad', 'Surat', 'Indore', 'Lucknow'
                      ].map((c) => (
                        <Link
                          key={c}
                          to={`/search?city=${encodeURIComponent(c)}`}
                          onClick={() => { setMenuOpen(false); setJobsOpen(false); }}
                        >
                          Jobs in {c}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link to="/jobs/Delivery%20Boy" onClick={() => setMenuOpen(false)}>Popular: Delivery</Link>
            <Link to="/advice" onClick={() => setMenuOpen(false)}>Career Advice</Link>
            <a href="#download" onClick={() => setMenuOpen(false)}>Download App</a>
            <Link to="/login" className="btn btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="btn btn-outline" onClick={() => setMenuOpen(false)}>Register</Link>
            <button className="btn btn-outline small" onClick={() => setDark((v) => !v)}>
              {dark ? 'Light' : 'Dark'}
            </button>
          </nav>
        </div>
      </header>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:category" element={<JobsPage />} />
        <Route path="/jobs/:category/:id" element={<JobDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/advice" element={<AdvicePage />} />
        <Route path="/advice/:slug" element={<AdviceDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-col">
            <Link to="/" style={{ display: 'block' }}>
              <img
                src={Logo}
                alt="JTM India Logo"
                style={{
                  height: "50px",
                  width: "auto",
                  cursor: "pointer",
                  objectFit: "contain",
                  display: "block"
                }}
              />
            </Link>
            <div className="copy">© {new Date().getFullYear()} LmIndia</div>
          </div>
          <div className="footer-col">
            <div className="footer-title">Resources</div>
            <div className="footer-links">
              <Link to="/advice">Career Advice</Link>
              <a href="#contact">Contact</a>
              <Link to="/about">About</Link>
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
            </div>
          </div>
        </div>
      </footer>
      
      <div className="floating-contacts" aria-label="Quick contact">
        <a
          className="contact-btn whatsapp-btn"
          href="https://whatsapp.com/channel/0029Vb7dNva2975Ark5OJ60s"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open WhatsApp"
          title="WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4.3 16.7A9.5 9.5 0 1 1 21 11c0 5.2-4.3 9.5-9.5 9.5-1.6 0-3.1-.4-4.5-1.1L3 21l1.3-4.3z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M8.6 9.1c.3-.6 1-.8 1.5-.4.3.3.6.9.5 1.5-.2.6-.6.8.1 1.7.7 1.1 1.6 1.7 2.4 2 .7.2 1.1.1 1.4-.2.2-.2.5-.5.8-.5.3 0 .8.2 1.1.5.4.3.5.7.4 1.2-.1.6-.7 1.4-1.5 1.7-.9.3-2 .2-3.2-.2-1.6-.6-3-1.7-4-2.9-1-1.2-1.4-2.4-1.5-3.3 0-.8.5-1.5 1.1-1.8.5-.2.9 0 1.1.4z" fill="#ffffff"></path>
          </svg>
        </a>
        <a
          className="contact-btn call-btn"
          href="tel:+919999999999"
          aria-label="Call"
          title="Call"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M22 16c-2 0-4-1-5-2l-3 3c-4-2-7-5-9-9l3-3c-1-1-2-3-2-5H2C2 7 9 14 17 18c2 1 3 1 5 1z" fill="currentColor"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;