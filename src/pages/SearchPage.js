import { Link, useSearchParams } from 'react-router-dom';
import { jobs } from '../data/jobs';
import '../App.css';

export default function SearchPage() {
  const [params] = useSearchParams();
  const role = (params.get('role') || '').trim().toLowerCase();
  const city = (params.get('city') || '').trim().toLowerCase();
  const type = (params.get('type') || '').trim().toLowerCase();
  const exp = (params.get('exp') || '').trim().toLowerCase();
  const shift = (params.get('shift') || '').trim().toLowerCase();
  const hasQuery = !!(role || city || type || exp || shift);

  const filtered = (() => {
    if (city && !role && !type && !exp && !shift) {
      return jobs.filter((j) => j.location.toLowerCase().includes(city));
    }
    return jobs.filter((j) => {
      const matchRole =
        !role ||
        j.title.toLowerCase().includes(role) ||
        j.company.toLowerCase().includes(role) ||
        j.category.toLowerCase().includes(role);
      const matchCity = !city || j.location.toLowerCase().includes(city);
      const matchType = !type || j.type.toLowerCase() === type;
      const matchExp =
        !exp ||
        (j.experience || '').toLowerCase().includes(exp);
      const matchShift =
        !shift ||
        (j.shift || '').toLowerCase().includes(shift);
      return matchRole && matchCity && matchType && matchExp && matchShift;
    });
  })();

  return (
    <div className="app-root">
      <section className="featured">
        <div className="container">
          <h2>Search Results</h2>
          {!hasQuery && (
            <div className="no-results">Enter filters (role, city, type) to search</div>
          )}
          {hasQuery && (
            <>
              <div className="results-meta">
                {filtered.length} results
                {role && ` • role: "${role}"`}
                {city && ` • city: "${city}"`}
              </div>
              <div className="grid jobs">
                {filtered.length === 0 && (
                  <div className="no-results">No jobs found. Try changing filters.</div>
                )}
                {filtered.map((j) => (
                  <div key={j.id} className="job-card">
                    <div className="job-title">{j.title}</div>
                    <div className="job-meta">
                      {j.company} • {j.location}
                    </div>
                    <div className="job-tags">
                      <span className="tag">{j.salary}</span>
                      <span className="tag">{j.type}</span>
                    </div>
                    <Link
                      className="btn btn-outline small"
                      to={`/jobs/${encodeURIComponent(j.category)}/${j.id}`}
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
          <div style={{ marginTop: 16 }}>
            <Link className="btn btn-outline" to="/">← Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
