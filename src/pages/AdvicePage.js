import { Link } from 'react-router-dom';
import '../App.css';

export default function AdvicePage() {
  const articles = [
    {
      slug: 'resume-tips',
      title: 'Resume Tips',
      summary: 'Create an ATS-friendly resume: clear sections, keywords, measurable results.',
    },
    {
      slug: 'interview-prep',
      title: 'Interview Prep',
      summary: 'Common questions, STAR method, company research and mock interviews.',
    },
    {
      slug: 'communication-skills',
      title: 'Communication Skills',
      summary: 'Improve professional tone, clarity and listening skills.',
    },
    {
      slug: 'career-growth',
      title: 'Career Growth',
      summary: 'Skill roadmap, certifications and networking accelerate growth.',
    },
    {
      slug: 'first-job',
      title: 'First Job Guide',
      summary: 'Complete Guide for Freshers: Expectations, Etiquette and Learning.',
    },
    {
      slug: 'salary-negotiation',
      title: 'Salary Negotiation',
      summary: 'Market research, value articulation aur confident negotiation tips.',
    },
  ];

  return (
    <div className="app-root">
      <section className="advice">
        <div className="container">
          <h1>Career Advice</h1>
          <p className="sub">Career guidance for better resume, interviews and growth.</p>
          <div className="advice-grid">
            {articles.map((a) => (
              <div key={a.slug} className="advice-card">
                <div className="advice-title">{a.title}</div>
                <div className="advice-summary">{a.summary}</div>
                <div className="advice-actions">
                  <Link className="btn btn-outline small" to={`/advice/${a.slug}`}>Read</Link>
                </div>
              </div>
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
