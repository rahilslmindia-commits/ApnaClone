import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [roleQuery, setRoleQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [filterMode, setFilterMode] = useState("");
  const navigate = useNavigate();

  return (
    <>
    <section className="hero">
      <div className="container hero-content">
        <h1 className="headline-gradient">
          Search Jobs Online | Hire Candidates | Post a Job
        </h1>

        <form
          className="searchbar"
          onSubmit={(e) => {
            e.preventDefault();

            const params = new URLSearchParams();

            if (roleQuery.trim()) params.set("role", roleQuery.trim());
            if (cityQuery.trim()) params.set("city", cityQuery.trim());

            if (filterMode === "wfh") {
              params.set("mode", "wfh");
              params.set("limit", "10");
            } else if (filterMode === "onsite") {
              params.set("mode", "onsite");
              params.set("limit", "10");
            } else if (filterMode === "full") {
              params.set("type", "Full-time");
              params.set("limit", "10");
            } else if (filterMode === "part") {
              params.set("type", "Part-time");
              params.set("limit", "10");
            }

            if (params.toString()) {
              navigate(`/search?${params.toString()}`);
            }
          }}
        >
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
          >
            <option value="">Job Type</option>
            <option value="wfh">WFH</option>
            <option value="onsite">Onsite</option>
            <option value="full">Full-time</option>
            <option value="part">Part-time</option>
          </select>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              !roleQuery.trim() &&
              !cityQuery.trim() &&
              !filterMode
            }
          >
            Search
          </button>
        </form>
      </div>
    </section>

<section className="landing-hero">
  <div className="landing-hero-content">
    <h1>Your next job starts here</h1>
    <p>
      Create an account or sign in to see your personalised job
      recommendations.
    </p>

    <button
      className="btn btn-primary hero-btn"
      onClick={() => navigate("/login")}
    >
      Get started
    </button>
  </div>
</section>
    </>
  );
}