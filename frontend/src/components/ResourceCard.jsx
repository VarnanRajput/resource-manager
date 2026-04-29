import { useNavigate } from "react-router-dom";
import { deleteResource, toggleFavorite } from "../api";

function ResourceCard({ resource, onUpdate, onDelete }) {
  const navigate = useNavigate();

  // Toggle favorite and notify parent to refresh
  const handleFavorite = async () => {
    try {
      const updated = await toggleFavorite(resource._id);
      onUpdate(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete with confirmation
  const handleDelete = async () => {
    if (!confirm(`Delete "${resource.title}"?`)) return;
    try {
      await deleteResource(resource._id);
      onDelete(resource._id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="resource-card">
      {/* Top: title + favorite button */}
      <div className="resource-card-top">
        <div className="resource-card-title">
          <a href={resource.link} target="_blank" rel="noreferrer">
            {resource.title} ↗
          </a>
        </div>
        <button
          className={`fav-btn ${resource.isFavorite ? "active" : ""}`}
          onClick={handleFavorite}
          title="Toggle favorite"
        >
          {resource.isFavorite ? "★" : "☆"}
        </button>
      </div>

      {/* Description */}
      {resource.description && (
        <p className="resource-card-desc">{resource.description}</p>
      )}

      {/* Category + actions */}
      <div className="resource-card-meta">
        <span className="category-badge">{resource.category}</span>
        <div className="resource-card-actions">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(`/resources/edit/${resource._id}`)}
          >
            Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
