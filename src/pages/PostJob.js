import React, { useState } from "react";

export default function PostJob() {
    const [form, setForm] = useState({
        jobTitle: "",
        companyName: "",
        city: "",
        type: "",
        openings: "",
        salary: "",
        description: "",
        requirements: "",
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (form.jobTitle.trim().length < 2)
            newErrors.jobTitle = "Enter valid job title";

        if (form.companyName.trim().length < 2)
            newErrors.companyName = "Enter company name";

        if (form.city.trim().length < 2)
            newErrors.city = "Enter city";

        if (!form.type)
            newErrors.type = "Select job type";

        if (!/^\d+$/.test(form.openings))
            newErrors.openings = "Enter valid number";

        if (form.salary.trim().length < 3)
            newErrors.salary = "Enter salary range";

        if (form.description.trim().length < 10)
            newErrors.description = "Description must be at least 10 characters";

        if (form.requirements.trim().length < 5)
            newErrors.requirements = "Enter job requirements";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;



        setForm({
            jobTitle: "",
            companyName: "",
            city: "",
            type: "",
            openings: "",
            salary: "",
            description: "",
            requirements: "",
        });
    };

    const handleChange = (e) => {
  const { name, value } = e.target;

  let updatedValue = value;

  if (name === "openings" || name === "salary") {
    updatedValue = value.replace(/\D/g, "");
  }

  setForm({ ...form, [name]: updatedValue });

  if (errors[name]) {
    setErrors({ ...errors, [name]: "" });
  }
};

    return (
        <form className="post-job-form" onSubmit={handleSubmit}>
            <h2>Post a Job</h2>

            <div className="form-grid">

                <div className="form-row">
                    <label>Job Title</label>
                    <input type="text" name="jobTitle" value={form.jobTitle} onChange={handleChange} />
                    {errors.jobTitle && <p className="error">{errors.jobTitle}</p>}
                </div>

                <div className="form-row">
                    <label>Company Name</label>
                    <input type="text" name="companyName" value={form.companyName} onChange={handleChange} />
                    {errors.companyName && <p className="error">{errors.companyName}</p>}
                </div>

                <div className="form-row">
                    <label>City</label>
                    <input type="text" name="city" value={form.city} onChange={handleChange} />
                    {errors.city && <p className="error">{errors.city}</p>}
                </div>

                <div className="form-row">
                    <label>Job Type</label>
                    <select name="type" value={form.type} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="WFH">WFH</option>
                        <option value="Onsite">Onsite</option>
                    </select>
                    {errors.type && <p className="error">{errors.type}</p>}
                </div>

                <div className="form-row">
                    <label>Openings</label>
                    <input type="text" name="openings" value={form.openings} onChange={handleChange} />
                    {errors.openings && <p className="error">{errors.openings}</p>}
                </div>

                <div className="form-row">
                    <label>Salary Range</label>
                    <input type="text" name="salary" value={form.salary} onChange={handleChange} />
                    {errors.salary && <p className="error">{errors.salary}</p>}
                </div>


                <div className="form-row full-width">
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div className="form-row full-width">
                    <label>Requirements</label>
                    <textarea name="requirements" value={form.requirements} onChange={handleChange} />
                    {errors.requirements && <p className="error">{errors.requirements}</p>}
                </div>

            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: "30px", cursor: "pointer" }}>Post Job</button>
        </form>
    );
}