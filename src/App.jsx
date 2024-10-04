import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ErrorPage from "./page/ErrorPage";
import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";
import Register from "./page/Register";
import Login from "./page/Login";
import Details from "./page/Details";
import MainLayout from "./layouts/MainLayout";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    } else if (!location.pathname.includes("register")) {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  function ProtectedRouter({ children }) {
    if (!token) {
      navigate("/login");
      return null;
    }

    return children;
  }

  return (
    <div className="base-container">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRouter>
          }
        />
        <Route
          path="/details"
          element={
            <ProtectedRouter>
              <MainLayout>
                <Details />
              </MainLayout>
            </ProtectedRouter>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRouter>
              <MainLayout>
                <About />
              </MainLayout>
            </ProtectedRouter>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRouter>
              <MainLayout>
                <Contact />
              </MainLayout>
            </ProtectedRouter>
          }
        />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
