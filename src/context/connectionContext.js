import React, { createContext, useState, useEffect } from "react";

export const ConnectionContext = createContext({
  status: "ok", // 'ok' | 'offline' | 'down'
  setStatus: () => {},
});

export const ConnectionProvider = ({ children }) => {
  const [status, setStatus] = useState("ok");

  useEffect(() => {
    const handleNetworkError = () => setStatus("down");
    const handleOnline = () => setStatus("ok");
    const handleOffline = () => setStatus("offline");

    window.addEventListener("network-error", handleNetworkError);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("network-error", handleNetworkError);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <ConnectionContext.Provider value={{ status, setStatus }}>
      {children}
    </ConnectionContext.Provider>
  );
};
