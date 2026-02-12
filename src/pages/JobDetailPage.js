import { Link, useParams } from 'react-router-dom';
import { jobs } from '../data/jobs';
import '../App.css';

export default function JobDetailPage() {
  const { category, id } = useParams();
  const decodedCategory = decodeURIComponent(category || '');
  const job = jobs.find((j) => j.id === id && j.category === decodedCategory);

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
              <button className="btn btn-primary">Apply Now</button>
              <Link className="btn btn-outline" to={`/jobs/${encodeURIComponent(decodedCategory)}`}>Back to {decodedCategory} Jobs</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
