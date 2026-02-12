import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { jobs } from '../data/jobs';
import '../App.css';

export default function JobsPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const decodedCategory = decodeURIComponent(category || '');
  const view = (searchParams.get('view') || '').toLowerCase();
  const list = useMemo(
    () => jobs.filter((j) => j.category === decodedCategory),
    [decodedCategory]
  );

  return (
    <div className="app-root">
      <section className="featured">
        <div className="container">
          {decodedCategory === 'Delivery Boy' && view !== 'cards' && (
            <>
              <h2>Popular: Delivery Jobs</h2>
              <div className="stats-grid" style={{ marginTop: 12 }}>
                {[
                  { n: '₹16k–24k', l: 'Avg Monthly Earnings' },
                  { n: 'Flexible', l: 'Shifts Available' },
                  { n: 'Peak +', l: 'Incentives on Busy Hours' },
                  { n: '10+', l: 'Top Hiring Companies' },
                ].map((s) => (
                  <div key={s.l} className="stat-card">
                    <div className="stat-number">{s.n}</div>
                    <div className="stat-label">{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16 }}>
                <div className="feature-grid">
                  {[
                    { t: 'Quick onboarding', s: 'Join fast with simple KYC.' },
                    { t: 'Weekly payouts', s: 'Timely payments and bonuses.' },
                    { t: 'City-wide routes', s: 'Choose nearby delivery areas.' },
                    { t: 'Support 24x7', s: 'Helpdesk and safety support.' },
                  ].map((f) => (
                    <div key={f.t} className="feature-card">
                      <div className="feature-title">{f.t}</div>
                      <div className="feature-sub">{f.s}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <div className="footer-title">Top Companies</div>
                <div className="badges">
                  {['Zomato','Swiggy','Blinkit','Zepto','Dunzo','Amazon','Flipkart','Delhivery','Shadowfax'].map((c) => (
                    <span key={c} className="badge badge-light">{c}</span>
                  ))}
                </div>
              </div>
              <div className="job-detail-content" style={{ marginTop: 16 }}>
                <div className="job-detail-section">
                  <h3>Requirements</h3>
                  <ul>
                    {['Two-wheeler + valid license','Smartphone with internet','Basic communication','Aadhaar/PAN for KYC'].map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div className="job-detail-section">
                  <h3>Perks</h3>
                  <ul>
                    {['Peak-hour incentives','Fuel allowance (role-based)','Referral bonuses','Flexible shift selection'].map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="job-detail-actions">
                  <Link className="btn btn-primary" to="/search?role=Delivery">Search Delivery Jobs</Link>
                  <Link className="btn btn-outline" to="/search?type=Full-time&role=Delivery">Full-time Delivery</Link>
                </div>
              </div>
            </>
          )}
          <h2>{decodedCategory} Jobs</h2>
          <div className="results-meta">{list.length} results</div>
          <div className="grid jobs">
            {list.length === 0 && (
              <div className="no-results">No jobs found in this category.</div>
            )}
            {list.map((j) => (
              <Link key={j.id} to={`/jobs/${encodeURIComponent(decodedCategory)}/${j.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="job-card">
                  <div className="job-title">{j.title}</div>
                  <div className="job-meta">
                    {j.company} • {j.location}
                  </div>
                  <div className="job-tags">
                    <span className="tag">{j.salary}</span>
                    <span className="tag">{j.type}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link className="btn btn-outline" to="/">← Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
