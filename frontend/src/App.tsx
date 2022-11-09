import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Public from "./components/layout/Public";
import Login from "./components/auth/Login";
import Welcome from "./components/Welcome";
import DashboardLayout from "./components/layout/DashboardLayout";
import ErrorPage from "./components/errorPage";
import Exercises from "./components/exercises/Exercises";
import Notes from "./components/notes/NotesList";
import Users from "./components/users/UsersList"; // create route

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Welcome />} />

          <Route path="notes">
            <Route index element={<Notes />} />
          </Route>

          <Route path="exercises">
            <Route index element={<Exercises />} />
          </Route>
        </Route>
      </Route>{" "}
      {/* layout route */}
    </Routes>
  );
}

export default App;
