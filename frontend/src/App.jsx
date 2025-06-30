// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Logout from "./pages/Auth/Logout";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from './context/userContext';
import { Toaster } from 'react-hot-toast';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Entry point */}
          <Route path="/" element={<Root />} />

          {/* Public */}
          <Route path="/login"  element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          {/* Protected */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income"    element={<Income />} />
            <Route path="/expense"   element={<Expense />} />
            <Route path="/logout"    element={<Logout />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          style: { fontSize: '13px' },
        }}
      />
    </UserProvider>
  );
}

export default App;  // ← only one default export

// src/App.jsx (continued)
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/login"     replace />;
};
