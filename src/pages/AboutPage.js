import { Link } from 'react-router-dom';
import '../App.css';

export default function AboutPage() {
  return (
    // <div className="app-root">
      <section className="article">
        <div className="container article-content">
          <h1 className="article-title">About LmIndia Placements</h1>
          <div className="article-section">
            <h3>Our Placement Services</h3>
            <p>
              LmIndia's goal is to connect candidates with the right jobs and companies with the right talent.
              We provide verified openings for freshers to experienced candidates
              across multiple cities and industries. Our platform offers direct HR chat, fast interview scheduling,
              and a quick hiring experience.
            </p>
          </div>
          <div className="article-section">
            <h3>What we provide</h3>
            <p>
              Campus drives, resume help, mock interviews, employer connect, and city-wise job discovery. There is a strong network on roles like Data Entry, Back Office, Telecaller, Delivery, Sales, Technician.
            </p>
          </div>
          <div className="article-section">
            <h3>Placement Process</h3>
            <p>
              Register → Profile complete → Relevant jobs apply → HR se chat → Interview schedule → Offer received → Join. The pure process has been kept transparent and fast.
            </p>
          </div>
          <div className="article-section">
            <h3>Cities & Companies</h3>
            <p>
              Major cities like Delhi NCR, Mumbai, Bengaluru, Pune, Hyderabad, Chennai, Kolkata, Jaipur, Ahmedabad, Surat, Indore, Lucknow are covered. Active openings are available with hiring partners like Zomato, Swiggy, Flipkart, Amazon, Ola, Uber, TCS, Wipro.
            </p>
          </div>
          <div className="article-actions">
            <Link className="btn btn-outline" to="/">Back to Home</Link>
            <Link className="btn btn-primary" to="/advice">Go to Career Advice</Link>
          </div>
        </div>
      </section>
    // </div>
  );
}
