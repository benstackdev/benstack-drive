import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { LogIn, UserRoundPlus } from "lucide-react";

export function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col mt-8 justify-center items-center gap-8">
      <h1 className="text-2xl font-semibold">Welcome to BenStack Drive!</h1>
      <div className="flex flex-col gap-2 items-center justify-center">
        <span className="text-gray-300">New to BenStack Drive?</span>
        <Button variant="outline" onClick={() => navigate("/sign-up")} className="flex items-center w-fit">
          <UserRoundPlus /> Create an account
        </Button>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-gray-300">Already have an account?</span>
        <Button variant="outline" onClick={() => navigate("/sign-in")} className="flex items-center w-fit">
          <LogIn /> Sign In
        </Button>
      </div>
    </div>
  );
}