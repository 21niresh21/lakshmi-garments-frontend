import React, { useState, useEffect, useContext } from "react";
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
import Jobwork from "./pages/Jobwork";
import BatchDetail from "./pages/BatchDetail";
import NoConnection from "./components/NoConnection";
import ConnectionChecker from "./components/ConnectionChecker";
import { ConnectionProvider } from "./context/connectionContext";
import { NetworkProvider, NetworkContext } from "./context/networkActivityContext";
import GlobalBackdrop from "./components/GlobalBackdrop";
import PayDay from "./pages/PayDay";

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
  const networkContext = useContext(NetworkContext);
  // Recheck auth when localStorage changes (login/logout)
  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(getAuthStatus());
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    console.log(networkContext);
  }, [networkContext]);

  return (
    <NetworkProvider>
      <GlobalBackdrop networkContext={networkContext} />
      <ConnectionProvider>
        <ConnectionChecker>
          <Box display="flex" height="100vh">
            {isAuthenticated && <SideBar />}{" "}
            {/* Show Sidebar when logged in and no network error */}
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
                        <Analytics />
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
                    path="/batch/:id"
                    element={
                      <ProtectedRoute>
                        <BatchDetail />
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
                    path="/jobwork"
                    element={
                      <ProtectedRoute>
                        <Jobwork />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pay-day"
                    element={
                      <ProtectedRoute>
                        <PayDay />
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
                  <Route path="/connection-error" element={<NoConnection />} />
                  <Route
                    path="*"
                    element={
                      <Navigate to={isAuthenticated ? "/stock" : "/login"} />
                    }
                  />
                </Routes>
              </ContentLayout>
            </MainLayout>
          </Box>
        </ConnectionChecker>
      </ConnectionProvider>
    </NetworkProvider>
  );
}

export default App;
