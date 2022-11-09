import { Outlet } from "react-router-dom";

const Welcome = () => {
  console.log("am i getting routed?");
  return (
    <>
      <div>Welcome</div>
      <Outlet />
    </>
  );
};

export default Welcome;
