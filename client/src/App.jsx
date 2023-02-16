import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import LandingPage from './routes/LandingPage'
import LoginPage from './features/auth/LoginPage'
import DashboardLayout from './layout/DashboardLayout'
import Welcome from './components/Welcome'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import SignUpForm from './features/users/SignUpForm'
import NotesList from './features/notes/NotesList'
import NewNote from './features/notes/NewNote'
import EditNote from './features/notes/EditNote'
import EditExercise from './features/exercises/EditExercise'
import UsersList from './features/users/UserList'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/persistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import ExerciseList from './features/exercises/ExerciseList'
import NewExercise from './features/exercises/NewExercise'
import ExercisesDash from './features/exercises/ExercisesDash'
import ExercisesListFiltered from './features/exercises/ExerciseListFiltered'


function App() {

  return (
    <>

     <Routes>
      <Route path="/" element={<Layout />}>
      {/* Public routes   */}
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpForm />} />


      {/* Protected routes  */}

      <Route element={<PersistLogin />}>
      <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>

        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashboardLayout/>}>

            <Route index element={<Welcome />}/>
            {/* <Route index element={<ExercisesListFiltered />}/> */}

            <Route path="exercises">
              <Route index element={<ExerciseList />} />
              <Route path="filtered" element={<ExercisesListFiltered />} />
              <Route path="dash" element={<ExercisesDash />} />
              <Route path=":id" element={<EditExercise />} />
              <Route path="new-exercise" element={<NewExercise />} />
            </Route>

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
      {/* Catch all route */}
      <Route path="*" element={<LandingPage />} />
     </Routes>
    </>
  )
}

export default App
