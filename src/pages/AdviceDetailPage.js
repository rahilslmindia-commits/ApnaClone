import { Link, useParams } from 'react-router-dom';
import { adviceArticles } from '../data/advice';
import '../App.css';

export default function AdviceDetailPage() {
  const { slug } = useParams();
  const article = adviceArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="app-root">
        <div className="container" style={{ padding: '40px 0' }}>
          <h2>Article not found</h2>
          <Link className="btn btn-outline" to="/advice">← Back to Advice</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      <section className="article">
        <div className="container article-content">
          <h1 className="article-title">{article.title}</h1>
          {article.sections.map((s) => (
            <div key={s.heading} className="article-section">
              <h3>{s.heading}</h3>
              <p>{s.content}</p>
            </div>
          ))}
          <div className="article-actions">
            <Link className="btn btn-outline" to="/advice">Back to Advice</Link>
            <Link className="btn btn-primary" to="/">Go to Home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
