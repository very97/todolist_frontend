import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";
import { useEffect } from "react";
function App() {
  const [user, setUser] = useState(null);

  //유저 정보를 토큰을 통해 가져온다.
  const getUser = async (event) => {
    try {
      const storedToken = sessionStorage.getItem("token");

      if (storedToken) {
        const response = await api.get("/user/me");
        //console.log("rrrr", response);
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/login"
        element={<LoginPage user={user} setUser={setUser} />}
      />
    </Routes>
  );
}

export default App;
