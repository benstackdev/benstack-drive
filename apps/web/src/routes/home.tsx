import { Link } from "react-router";
import { authClient } from "../lib/auth-client";
import SignoutButton from "../components/sign-out-button";

function Home() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) return <>Loading...</>;
  if (error) return (<>Error: {error.message}</>);

  return (
    <div className="">
      {
        session ?
          (<>
            <h1>Welcome {session.user.name} to BenStack Drive!</h1>
            <SignoutButton />
          </>)
          :
          (<>
            <div className="">No session found</div>
            <Link to="/sign-in">Sign In</Link>
          </>)
      }
    </div>
  );
}

export default Home;