import { useState } from "react";

const SUGGESTED = ["General", "Tutorial", "Tool", "Article", "Video", "Reference", "Research", "Course", "Book", "Other"];

function ResourceForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    title:       initial.title       || "",
    link:        initial.link        || "",
    description: initial.description || "",
    category:    initial.category    || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Click a chip → set as category (toggle off if already selected)
  const handleChip = (cat) =>
    setForm({ ...form, category: form.category === cat ? "" : cat });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, category: form.category || "General" });
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

      {/* Category — type custom or pick from suggestions */}
      <div className="form-group">
        <label>Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Type a category or pick one below…"
        />
        {/* Quick-select suggestion chips */}
        <div className="chip-group">
          {SUGGESTED.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip ${form.category === cat ? "chip-active" : ""}`}
              onClick={() => handleChip(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Saving…" : "Save Resource"}
      </button>
    </form>
  );
}

export default ResourceForm;