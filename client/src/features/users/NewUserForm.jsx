import React, {useState, useEffect} from 'react';
import { useAddNewUserMutation } from './usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../config/roles';
import { delay } from '../../config/delay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';


//TODOS
//SELECTING MULTIPLE ROLES IN SELECT OPTION

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


const NewUserForm = () => {

  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(['Client'])

  useEffect(() => {

    const validateUser = setTimeout(() => {
      setValidUsername(
        USER_REGEX.test(username)
        );
    }, delay)

    return () => clearTimeout(validateUser)
}, [username])

useEffect(() => {

  const validatePassword = setTimeout(() => {
    setValidPassword(
      PWD_REGEX.test(password)
      );
  }, delay)

  return () => clearTimeout(validatePassword)
}, [password])

useEffect(() => {
    if (isSuccess) {
        setUsername('')
        setPassword('')
        setRoles([])
        navigate('/dash/users')
    }
}, [isSuccess, navigate])

const onUsernameChanged = e => setUsername(e.target.value)
const onPasswordChanged = e => setPassword(e.target.value)
const onRolesChanged = e => {
  const values = Array.from(
    e.target.selectedOptions,
    (option) => option.value
  )
  setRoles(values)
}

// check that we can save the data to a newUser before attempting POST request
const canSave = [roles.length, validPassword, validUsername].every(Boolean) && !isLoading

// then we can POST the data from the form

const onSaveUserClicked = async (e) => {
  e.preventDefault()
  if(canSave){
    await addNewUser({username, password, roles})
  }
}

const options = Object.values(ROLES).map(role => {
  return <option
  key={role}
  value={role}>{role}</option>
})

const errClass = isError ? "errmsg" : "offscreen"
const validUserClass = !validUsername ? 'form__input--incomplete' : ''
const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

const content = (
  <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveUserClicked}>
          <div className="form__title-row">
              <h2>New User</h2>
              <div className="form__action-buttons">
                  <button
                      className="icon-button"
                      title="Save"
                      disabled={!canSave}
                  >
                      <FontAwesomeIcon icon={faSave} />
                  </button>
              </div>
          </div>
          <label className="form__label" htmlFor="username">
              Username: <span className="nowrap">[3-20 letters]</span></label>
          <input
              className={`form__input ${validUserClass} text-gray-800`}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}
          />

          <label className="form__label" htmlFor="password">
              Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
          <input
              className={`form__input ${validPwdClass} text-gray-800` }
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
          />

          <label className="form__label" htmlFor="roles">
              ASSIGNED ROLES:</label>
          <select
              id="roles"
              name="roles"
              className={`form__select ${validRolesClass} text-gray-800`}
              multiple={true}
              size="3"
              value={roles}
              onChange={onRolesChanged}
          >
              {options}
          </select>

      </form>
  </>
)

return content
}

export default NewUserForm