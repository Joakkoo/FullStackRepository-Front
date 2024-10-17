import React, { useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import AdminTasks from "./pages/AdminTasks";
import TaskCreate from "./pages/TaskCreate";
import EditTask from "./pages/EditTask";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const { isAuthenticated, isLoading } = useAuth0(); // Asegúrate de obtener isLoading

  if (isLoading) {
    return <div
      style={
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          backgroundColor: "#4d4b7b"
        }
      }>
      <div style={{ color: "white" }}>
        Cargando...
      </div>
    </div>;
  }

  return (
    <Router>
      <Routes>
        {/* Rutas públicas y privadas */}
        {!isAuthenticated ? (
          <Route path="/" element={<Login />} />
        ) : (
          <>
            <Route path="/admintasks" element={<AdminTasks />} />
            <Route path="/taskcreate" element={<TaskCreate />} />
            <Route path="/edittask/:id" element={<EditTask />} />
            {/* Ruta por defecto si el usuario está autenticado */}
            <Route path="*" element={<Navigate to="/admintasks" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
