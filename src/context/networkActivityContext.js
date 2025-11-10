// NetworkContext.js
import React, { createContext, useState } from "react";

export const NetworkContext = createContext({
  activeRequests: 0,
  startRequest: () => {},
  endRequest: () => {},
});

export const NetworkProvider = ({ children }) => {
  const [activeRequests, setActiveRequests] = useState(0);

  const startRequest = () => setActiveRequests((prev) => prev + 1);
  const endRequest = () => setActiveRequests((prev) => Math.max(prev - 1, 0));

  return (
    <NetworkContext.Provider value={{ activeRequests, startRequest, endRequest }}>
      {children}
    </NetworkContext.Provider>
  );
};
