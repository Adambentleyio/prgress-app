import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Public from './routes/Public'
import Login from './features/auth/Login'
import DashboardLayout from './layout/DashboardLayout'
import Welcome from './components/Welcome'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import NotesList from './features/notes/NotesList'
import NewNote from './features/notes/NewNote'
import EditNote from './features/notes/EditNote'
import EditExercise from './features/exercises/EditExercise'
import UsersList from './features/users/UserList'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/persistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import ExercisesList from './features/exercises/ExerciseList'


function App() {

  return (
    <>

     <Routes>
      <Route path="/" element={<Layout />}>
      {/* Public routes   */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="exercises">
              <Route index element={<ExercisesList />} />
              <Route path=":id" element={<EditExercise />} />
              {/* <Route path="new-note" element={<NewNote />} /> */}
            </Route>


      {/* Protected routes  */}

      <Route element={<PersistLogin />}>
      <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>

        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashboardLayout/>}>

            <Route index element={<Welcome />}/>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />}>
              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="new-user" element={<NewUserForm />} />
              </Route>
            </Route>

            <Route path="notes">
              <Route index element={<NotesList />} />
              <Route path=":id" element={<EditNote />} />
              <Route path="new-note" element={<NewNote />} />
            </Route>




          </Route>
        </Route>
      </Route>
      </Route>
      </Route>
     </Routes>
    </>
  )
}

export default App
