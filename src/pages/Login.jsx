import React, { useEffect, useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";

function Login({ setIsAuthenticated }) {
  // Receive setIsAuthenticated from props
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data)); // Store token
      setIsAuthenticated(true); // Update authentication state
      navigate("/stock-control"); // Redirect after login
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          width: "30%",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        elevation={3}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;
