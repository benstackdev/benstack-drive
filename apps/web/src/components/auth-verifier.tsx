import { useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";
import { createContext, useEffect } from "react";

type WebUserSessionType = {
  username: string,
  email: string;
};

export default function AuthVerifier({ children }) {
  const navigate = useNavigate();

  const [sessionState, setSessionState] = useState<WebUserSessionType | null>(null);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session) navigate("/sign-in");
    const ctx: WebUserSessionType = {
      username: session.user.name,
      email: session.user.email
    };

    setSessionState(ctx);
  }, [session, setSessionState, navigate]);

  ;

  return (
    <AuthContext value={ctx}>
      {children}
    </ AuthContext>
  );
}