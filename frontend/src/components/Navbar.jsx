import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Clear storage and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Don't show navbar on auth pages
  if (!token) return null;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        resource<span>mgr</span>
      </div>

      <div className="navbar-links">
        <NavLink to="/"          end>Dashboard</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>

      <div className="navbar-user">
        <span>👤 {user.username || "User"}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
