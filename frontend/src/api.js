// Central place for all API calls
// Reads token from localStorage and attaches it to every request

const BASE_URL = "https://resource-manager-w9u9.onrender.com";

// Build headers — include JWT if available
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic fetch wrapper
const request = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

// Auth
export const signup = (body) => request("/auth/signup", { method: "POST", body: JSON.stringify(body) });
export const login  = (body) => request("/auth/login",  { method: "POST", body: JSON.stringify(body) });

// Resources
export const getResources    = ()         => request("/resources");
export const createResource  = (body)     => request("/resources",             { method: "POST",   body: JSON.stringify(body) });
export const updateResource  = (id, body) => request(`/resources/${id}`,       { method: "PUT",    body: JSON.stringify(body) });
export const deleteResource  = (id)       => request(`/resources/${id}`,       { method: "DELETE" });
export const toggleFavorite  = (id)       => request(`/resources/${id}/favorite`, { method: "PATCH" });
// Share
export const toggleShareResource   = (id)       => request(`/share/resource/${id}`,    { method: "POST" });
export const shareCollection       = (category) => request("/share/collection",         { method: "POST", body: JSON.stringify({ category }) });