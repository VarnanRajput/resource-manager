import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "https://resource-manager-w9u9.onrender.com"; // ← your render URL

function SharedCollection() {
  const { token }                 = useParams();
  const [collection, setCollection] = useState(null);
  const [error, setError]           = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/share/collection/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.message) setError(data.message);
        else setCollection(data);
      })
      .catch(() => setError("Failed to load collection"));
  }, [token]);

  if (error) return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>🔒 Not Found</h1>
        <p className="subtitle">{error}</p>
      </div>
    </div>
  );

  if (!collection) return <div className="loading">Loading…</div>;

  return (
    <div className="page">
      <div className="shared-banner">🔗 Shared Collection</div>
      <div className="page-header" style={{ marginTop: "24px" }}>
        <h1 className="page-title">{collection.category}</h1>
        <span className="section-title">{collection.resources.length} resources</span>
      </div>
      <div className="resource-grid">
        {collection.resources.map((r) => (
          <div key={r._id} className="resource-card">
            <div className="resource-card-title">
              <a href={r.link} target="_blank" rel="noreferrer">{r.title} ↗</a>
            </div>
            {r.description && <p className="resource-card-desc">{r.description}</p>}
            <span className="category-badge">{r.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SharedCollection;