import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getResources } from "../api";
import ResourceCard from "../components/ResourceCard";
import { getResources, shareCollection } from "../api";

const handleShareCollection = async (category) => {
  try {
    const data = await shareCollection(category);
    const link = `${window.location.origin}/share/collection/${data.collectionToken}`;
    await navigator.clipboard.writeText(link);
    alert(`✅ Collection link copied! (${data.count} resources shared)`);
  } catch (err) {
    alert(err.message);
  }
};

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");

  useEffect(() => {
    getResources()
      .then(setResources)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = (updated) =>
    setResources((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));

  const handleDelete = (id) =>
    setResources((prev) => prev.filter((r) => r._id !== id));

  // Get unique categories from resources
  const categories = ["All", ...new Set(resources.map((r) => r.category))];

  // Filter by search text and category
  const filtered = resources.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
                    r.description.toLowerCase().includes(search.toLowerCase()) ||
                    r.category.toLowerCase().includes(search.toLowerCase());
    const matchCat    = category === "All" || r.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Resources</h1>
        <Link to="/resources/new" className="btn btn-primary">+ Add Resource</Link>
      </div>

      {/* Search + filter */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search resources…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No resources found</h3>
          <p>{resources.length === 0 ? "Add your first resource!" : "Try a different search."}</p>
          {resources.length === 0 && (
            <Link to="/resources/new" className="btn btn-primary">Add Resource</Link>
          )}
        </div>
      ) : (
        <>
          <p className="section-title">{filtered.length} resource{filtered.length !== 1 ? "s" : ""}</p>
          {category !== "All" && (
  <button
    className="btn btn-ghost btn-sm"
    onClick={() => handleShareCollection(category)}
  >
    🔗 Share "{category}" collection
  </button>
)}
          <div className="resource-grid">
            {filtered.map((r) => (
              <ResourceCard
                key={r._id}
                resource={r}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Resources;
