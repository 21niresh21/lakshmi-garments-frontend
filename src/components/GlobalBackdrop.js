// GlobalBackdrop.jsx
import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const GlobalBackdrop = () => {
  const [activeRequests, setActiveRequests] = useState(0);

  useEffect(() => {
    const handleRequestsChange = (e) => {
      setActiveRequests(e.detail);
    };

    window.addEventListener("active-requests-changed", handleRequestsChange);

    return () => {
      window.removeEventListener("active-requests-changed", handleRequestsChange);
    };
  }, []);

  return (
    <Backdrop
      open={activeRequests > 0}
      sx={{ zIndex: 2000, color: "#fff", flexDirection: "column" }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalBackdrop;
