import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getResources } from "../api";
import ResourceCard from "../components/ResourceCard";

function Favorites() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    getResources()
      .then((all) => setResources(all.filter((r) => r.isFavorite)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // When a resource is un-favorited, remove it from this page
  const handleUpdate = (updated) => {
    if (!updated.isFavorite) {
      setResources((prev) => prev.filter((r) => r._id !== updated._id));
    }
  };

  const handleDelete = (id) =>
    setResources((prev) => prev.filter((r) => r._id !== id));

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">★ Favorites</h1>
      </div>

      {loading ? (
        <div className="loading">Loading…</div>
      ) : resources.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">☆</div>
          <h3>No favorites yet</h3>
          <p>Star resources from the Resources page to find them here.</p>
          <Link to="/resources" className="btn btn-primary">Browse Resources</Link>
        </div>
      ) : (
        <>
          <p className="section-title">{resources.length} favorited resource{resources.length !== 1 ? "s" : ""}</p>
          <div className="resource-grid">
            {resources.map((r) => (
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

export default Favorites;
