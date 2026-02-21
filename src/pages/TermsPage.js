import { Link } from 'react-router-dom';
import '../App.css';

export default function TermsPage() {
  return (
    <div className="app-root">
      <section className="article">
        <div className="container article-content">
          <h1 className="article-title">Terms & Conditions</h1>

          <div className="article-section">
            <p>
              Welcome to LmIndia. By accessing and using our website
              and services, you agree to comply with these Terms & Conditions.
              Please read them carefully before using our platform.
            </p>
          </div>

          <div className="article-section">
            <h3>1. Our Services</h3>
            <p>
              We provide recruitment and placement services to connect job
              seekers with employers. We act as an intermediary between
              candidates and hiring companies and do not guarantee employment
              or candidate selection.
            </p>
          </div>

          <div className="article-section">
            <h3>2. User Responsibilities</h3>
            <p><strong>For Job Seekers:</strong></p>
            <p>
              • Provide accurate and truthful information.<br />
              • Do not submit false documents or misleading details.<br />
              • Attend interviews scheduled through our platform responsibly.
            </p>

            <p><strong>For Employers:</strong></p>
            <p>
              • Provide genuine job requirements.<br />
              • Follow fair and ethical hiring practices.<br />
              • Inform us of hiring decisions promptly.
            </p>
          </div>

          <div className="article-section">
            <h3>3. No Employment Guarantee</h3>
            <p>
              We do not guarantee job placement, interview calls, or hiring
              confirmation. Final hiring decisions are made solely by the
              employers.
            </p>
          </div>

          <div className="article-section">
            <h3>4. Confidentiality</h3>
            <p>
              All personal and professional information shared with us will be
              handled confidentially and used only for recruitment purposes.
            </p>
          </div>

          <div className="article-section">
            <h3>5. Limitation of Liability</h3>
            <p>
              We are not responsible for:
              <br />• Employment decisions made by employers
              <br />• Salary disputes
              <br />• Workplace conditions
              <br />• Any loss arising from job offers or employment termination
            </p>
          </div>

          <div className="article-section">
            <h3>6. Changes to Terms</h3>
            <p>
              We may update these Terms & Conditions at any time.
              Continued use of our services implies acceptance of the
              revised terms.
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