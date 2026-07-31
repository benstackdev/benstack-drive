import { useEffect } from "react";
import { useAuth } from "../contexts/auth-provider";
import { useNavigate } from "react-router";

export default function AuthVerifier({ children }) {
  const navigate = useNavigate();
  const { sessionData, setSessionData } = useAuth();

  useEffect(() => {
    const fetchSessionData = async () => {
      const response = await fetch("http://localhost:8080/api/auth-user", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setSessionData(result.data);
    };

    fetchSessionData();
  }, [setSessionData]);

  useEffect(() => {
    if (sessionData !== null) navigate("/");
    else navigate("/sign-in");
  }, [sessionData, navigate]);

  return children;
}