import { useNavigate } from "react-router-dom";
import { deleteResource, toggleFavorite, toggleShareResource } from "../api";

function ResourceCard({ resource, onUpdate, onDelete }) {
  const navigate = useNavigate();

  const handleFavorite = async () => {
    try {
      const updated = await toggleFavorite(resource._id);
      onUpdate(updated);
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${resource.title}"?`)) return;
    try {
      await deleteResource(resource._id);
      onDelete(resource._id);
    } catch (err) { alert(err.message); }
  };

  // Toggle share and copy link to clipboard
  const handleShare = async () => {
    try {
      const updated = await toggleShareResource(resource._id);
      onUpdate(updated);
      if (updated.isPublic) {
        const link = `${window.location.origin}/share/resource/${updated.shareId}`;
        await navigator.clipboard.writeText(link);
        alert("✅ Share link copied to clipboard!");
      } else {
        alert("🔒 Resource is now private.");
      }
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="resource-card">
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

      {resource.description && (
        <p className="resource-card-desc">{resource.description}</p>
      )}

      <div className="resource-card-meta">
        <span className="category-badge">{resource.category}</span>
        <div className="resource-card-actions">
          {/* Share button — green if public */}
          <button
            className={`btn btn-sm ${resource.isPublic ? "btn-shared" : "btn-ghost"}`}
            onClick={handleShare}
            title={resource.isPublic ? "Click to make private" : "Share this resource"}
          >
            {resource.isPublic ? "🔗 Shared" : "Share"}
          </button>
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