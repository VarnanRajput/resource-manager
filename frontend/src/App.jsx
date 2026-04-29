import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import AddEditResource from "./pages/AddEditResource";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import SharedResource   from "./pages/SharedResource";
import SharedCollection from "./pages/SharedCollection";

// Simple auth check — reads token from localStorage
const isLoggedIn = () => !!localStorage.getItem("token");

// Protect routes: redirect to login if not authenticated
function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/resources" element={<PrivateRoute><Resources /></PrivateRoute>} />
        <Route path="/resources/new" element={<PrivateRoute><AddEditResource /></PrivateRoute>} />
        <Route path="/resources/edit/:id" element={<PrivateRoute><AddEditResource /></PrivateRoute>} />
        <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />

        <Route path="/share/resource/:shareId" element={<SharedResource />} />
        <Route path="/share/collection/:token" element={<SharedCollection />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {console.log("VERSION CHECK 2.0")}
    </>
  );
}

export default App;
