import React, { useState, useEffect } from "react";
import "./index.css";
import App from "./App";
import FadeLoader from "react-spinners/FadeLoader";
import { createRoot } from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
function RootComponent() {
  const [loading, setLoading] = useState(false);
  const color = "#14ac5f";
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <FadeLoader
            color={color}
            loading={loading}
            height={15}
            width={5}
            radius={2}
          />
        </div>
      ) : (
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")).render(<RootComponent />);
