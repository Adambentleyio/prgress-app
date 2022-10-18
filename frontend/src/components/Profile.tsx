import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user, isAuthenticated } = useAuth0();

  return <>{isAuthenticated && <article>{JSON.stringify(user)}</article>}</>;
}

export default Profile;
