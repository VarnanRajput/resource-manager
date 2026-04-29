import { useState } from "react";

const CATEGORIES = ["General", "Tutorial", "Tool", "Article", "Video", "Reference", "Other"];

// Reusable form for both Add and Edit
function ResourceForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    title:       initial.title       || "",
    link:        initial.link        || "",
    description: initial.description || "",
    category:    initial.category    || "General",
  });

  // Update form field by name
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // pass form data up to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="React Docs"
          required
        />
      </div>

      <div className="form-group">
        <label>Link *</label>
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="https://react.dev"
          type="url"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="What is this resource about?"
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Saving…" : "Save Resource"}
      </button>
    </form>
  );
}

export default ResourceForm;
