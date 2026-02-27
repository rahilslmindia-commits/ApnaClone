import { Link } from 'react-router-dom';
import '../App.css';

export default function ContactPage() {
  return (
    <div className="app-root">
      <section className="article">
        <div className="container article-content">
          <h1 className="article-title">Contact Us</h1>

          <div className="article-section">
            <p>
              We'd love to hear from you. Whether you're a job seeker,
              employer, or just have a question about our services,
              feel free to reach out to us.
            </p>
          </div>

          <div className="article-section">
            <h3>📍 Office Address</h3>
            <p>
              No. 212, Circle P Complex,<br></br>
              Above Honest Restaurant,<br></br>
              Prahladnagar Corner,<br></br>
              S.G. Highway, Ahmedabad.
            </p>
          </div>

          <div className="article-section">
            <h3>📞 Phone</h3>
            <p>
              +91 9723 999723
            </p>
          </div>

          <div className="article-section">
            <h3>📧 Email</h3>
            <p>
              support@lmindia.com
            </p> 
          </div>

          <div className="article-section">
            <h3>💬 Support</h3>
            <p>
              For job-related queries, interview scheduling,
              or employer partnerships, please contact us via
              phone or email and our team will assist you promptly.
            </p>
          </div>

          <div className="article-actions">
            <Link className="btn btn-outline" to="/">Back to Home</Link>
          </div>

        </div>
      </section>
    </div>
  );
}