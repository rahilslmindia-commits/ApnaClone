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
  const mode = (params.get('mode') || '').trim().toLowerCase();
  const limit = parseInt(params.get('limit') || '', 10);
  const hasQuery = !!(role || city || type || exp || shift || mode);

  const filtered = (() => {
    if (city && !role && !type && !exp && !shift) {
      return jobs.filter((j) => j.location.toLowerCase().includes(city));
    }
    const list = jobs.filter((j) => {
      const matchRole =
        !role ||
        j.title.toLowerCase().includes(role) ||
        j.company.toLowerCase().includes(role) ||
        j.category.toLowerCase().includes(role);
      const ignoreCity = !!mode || !!type;
      const matchCity = ignoreCity ? true : (!city || j.location.toLowerCase().includes(city));
      const matchType = !type || j.type.toLowerCase() === type;
      const matchExp =
        !exp ||
        (j.experience || '').toLowerCase().includes(exp);
      const matchShift =
        !shift ||
        (j.shift || '').toLowerCase().includes(shift);
      let matchMode = true;
      if (mode === 'wfh') {
        const wfhCats = ['it', 'data entry', 'telecaller', 'back office'];
        const hasRemoteWord =
          (j.title || '').toLowerCase().includes('remote') ||
          (j.description || '').toLowerCase().includes('remote') ||
          (j.shift || '').toLowerCase().includes('remote') ||
          (j.title || '').toLowerCase().includes('wfh') ||
          (j.description || '').toLowerCase().includes('wfh');
        matchMode = hasRemoteWord || wfhCats.includes((j.category || '').toLowerCase());
      } else if (mode === 'onsite') {
        const onsiteCats = [
          'delivery boy','sales','security guard','driver','cook','househelp','office boy','technician'
        ];
        matchMode = onsiteCats.includes((j.category || '').toLowerCase());
      }
      return matchRole && matchCity && matchType && matchExp && matchShift && matchMode;
    });
    if (mode && Number.isFinite(limit) && limit > 0) {
      return list.slice(0, limit);
    }
    if (mode && !Number.isFinite(limit)) {
      return list.slice(0, 10);
    }
    return list;
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
                {filtered.length} Results
                {role && ` • role: "${role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}"`}
                {city && ` • City: "${city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}"`}
                {mode && ` • Mode: "${mode}"`}
                {type && ` • Type: "${type}"`}
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
                      <span className="tag">
                        {mode === 'wfh' ? 'WFH' : mode === 'onsite' ? 'Onsite' : j.type}
                      </span>
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
