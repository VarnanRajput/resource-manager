import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getResources } from "../api";
import ResourceCard from "../components/ResourceCard";

function Dashboard() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading]     = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    getResources()
      .then(setResources)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Update a card in state after favorite toggle
  const handleUpdate = (updated) =>
    setResources((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));

  // Remove card from state after delete
  const handleDelete = (id) =>
    setResources((prev) => prev.filter((r) => r._id !== id));

  const favorites  = resources.filter((r) => r.isFavorite);
  const recent     = resources.slice(0, 6); // show latest 6

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Hello, {user.username} 👋</h1>
        <Link to="/resources/new" className="btn btn-primary">+ Add Resource</Link>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{resources.length}</div>
          <div className="stat-label">Total Resources</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{favorites.length}</div>
          <div className="stat-label">Favorites</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {new Set(resources.map((r) => r.category)).size}
          </div>
          <div className="stat-label">Categories</div>
        </div>
      </div>

      {/* Recent resources */}
      <p className="section-title">Recent Resources</p>

      {loading ? (
        <div className="loading">Loading…</div>
      ) : recent.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No resources yet</h3>
          <p>Start by adding your first resource</p>
          <Link to="/resources/new" className="btn btn-primary">Add Resource</Link>
        </div>
      ) : (
        <div className="resource-grid">
          {recent.map((r) => (
            <ResourceCard
              key={r._id}
              resource={r}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
