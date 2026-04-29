import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "https://resource-manager-w9u9.onrender.com"; // render URL

function SharedResource() {
  const { shareId } = useParams();
  const [resource, setResource] = useState(null);
  const [error, setError]       = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/share/resource/${shareId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.message) setError(data.message);
        else setResource(data);
      })
      .catch(() => setError("Failed to load resource"));
  }, [shareId]);

  if (error) return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>🔒 Not Found</h1>
        <p className="subtitle">{error}</p>
      </div>
    </div>
  );

  if (!resource) return <div className="loading">Loading…</div>;

  return (
    <div className="page">
      <div className="shared-banner">🔗 Shared Resource</div>
      <div className="form-card" style={{ marginTop: "24px" }}>
        <h2>{resource.title}</h2>
        <span className="category-badge">{resource.category}</span>
        {resource.description && (
          <p style={{ marginTop: "16px", color: "var(--muted)", fontSize: "14px" }}>
            {resource.description}
          </p>
        )}
        <hr className="divider" />
        <a href={resource.link} target="_blank" rel="noreferrer" className="btn btn-primary">
          Open Link ↗
        </a>
      </div>
    </div>
  );
}

export default SharedResource;