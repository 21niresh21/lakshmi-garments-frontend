import React, { useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import { Route, Routes, Navigate, useNavigate } from "react-router";
import SideBar from "./components/SideBar";
import StockControl from "./pages/StockControl";
import Stock from "./pages/Stock";
import Invoice from "./pages/Invoice";
import InvoiceDetail from "./pages/InvoiceDetail";
import Production from "./pages/Production";
import StreamlitEmbed from "./components/StreamlitEnbed";
import Login from "./pages/Login";
import Batch from "./pages/Batch";
import Users from "./pages/Users";
import MasterData from "./pages/MasterDataPage";
import ZoomableLineChart from "./features/analytics/ZoomableLineChart";
import Analytics from "./pages/Analytics";

// Function to check authentication from localStorage
const getAuthStatus = () => !!localStorage.getItem("user");

const ProtectedRoute = ({ children }) => {
  return getAuthStatus() ? children : <Navigate to="/login" />;
};

const MainLayout = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: 10,
});

const ContentLayout = styled(Box)({
  flexGrow: 1,
  backgroundColor: "#F6F6F6",
  borderRadius: 5,
  borderWidth: 2,
  borderColor: "black",
  padding: 10,
  paddingLeft: 30,
  paddingRight: 30,
});

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthStatus());

  // Recheck auth when localStorage changes (login/logout)
  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(getAuthStatus());
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Box display="flex" height="100vh">
      {isAuthenticated && <SideBar />} {/* Show Sidebar when logged in */}
      <MainLayout>
        <ContentLayout>
          <Routes>
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/stock-control"
              element={
                <ProtectedRoute>
                  <StockControl />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock"
              element={
                <ProtectedRoute>
                  <Stock />
                </ProtectedRoute>
              }
            />
            <Route
              path="/invoice"
              element={
                <ProtectedRoute>
                  <Invoice />
                </ProtectedRoute>
              }
            />
            <Route
              path="/invoice/:id"
              element={
                <ProtectedRoute>
                  <InvoiceDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/production"
              element={
                <ProtectedRoute>
                  <Production />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/batches"
              element={
                <ProtectedRoute>
                  <Batch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/data-management"
              element={
                <ProtectedRoute>
                  <MasterData />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/stock" : "/login"} />}
            />
          </Routes>
        </ContentLayout>
      </MainLayout>
    </Box>
  );
}

export default App;
