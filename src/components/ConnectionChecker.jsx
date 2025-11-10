// ConnectionChecker.jsx
import React, { useContext } from "react";
import { ConnectionContext } from "../context/connectionContext";
import NoConnection from "./NoConnection";

const ConnectionChecker = ({ children }) => {
  const { status } = useContext(ConnectionContext);

  if (status !== "ok") {
    return <NoConnection />; // Full-screen error
  }

  return <>{children}</>; // Everything inside (sidebar + content)
};

export default ConnectionChecker;
