import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createResource, getResources, updateResource } from "../api";
import ResourceForm from "../components/ResourceForm";

function AddEditResource() {
  const { id }     = useParams();     // id exists when editing
  const navigate   = useNavigate();
  const isEdit     = !!id;

  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  // If editing, load existing resource data
  useEffect(() => {
    if (!isEdit) return;
    getResources()
      .then((resources) => {
        const found = resources.find((r) => r._id === id);
        if (found) setInitial(found);
        else navigate("/resources"); // not found — go back
      })
      .finally(() => setFetching(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (isEdit) {
        await updateResource(id, formData);
      } else {
        await createResource(formData);
      }
      navigate("/resources");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="loading">Loading…</div>;

  return (
    <div className="page">
      <div className="form-card">
        <h2>{isEdit ? "Edit Resource" : "Add New Resource"}</h2>
        <ResourceForm
          initial={initial || {}}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <hr className="divider" />
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
          ← Cancel
        </button>
      </div>
    </div>
  );
}

export default AddEditResource;
