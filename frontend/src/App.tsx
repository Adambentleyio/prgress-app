import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LogoutButton from "./components/LogoutButton";
import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <LoginButton />
      <LogoutButton />
      <Profile />
    </div>
  );
}

export default App;
