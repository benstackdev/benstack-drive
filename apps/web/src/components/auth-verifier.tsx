import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-provider";
import { useNavigate } from "react-router";

export default function AuthVerifier({ children }) {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const { setSessionData } = useAuth();

  useEffect(() => {
    const fetchSessionData = async () => {
      const response = await fetch("http://localhost:8080/api/auth-user", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setIsVerified(result.success);
      if (isVerified) setSessionData(result.data);
    };

    if (isVerified === null) fetchSessionData();
  }, [isVerified, setIsVerified, setSessionData]);

  useEffect(() => {
    if (isVerified) navigate("/");
    else navigate("/sign-in");
  }, [isVerified, navigate]);

  return children;
}