import { useState, useRef, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'

const Login = () => {

    const userRef = useRef() // set focus on a user input
    const errRef = useRef() // set focus if there is an err logging in
    const [username, setUsername] = useState('') // state for post req
    const [password, setPassword] = useState('') // state for pos req
    const [errmsg, setErrmsg] = useState('') // state for error message
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      userRef.current.focus()
    }, [])

    useEffect(() => {
      setErrmsg('')
    }, [username, password])

    const [login, {isLoading, isError, error}] = useLoginMutation()

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const { accessToken } = await login({ username, password}).unwrap()
        dispatch(setCredentials({ accessToken }))
        setUsername('')
        setPassword('')
        navigate('/dash')
      } catch (err) {
        if(!err.message) {
          setErrmsg('No Server response')
        } else if (err.status === 400) {
          setErrmsg('Missing username or password')
        } else if (err.status === 401) {
          setErrmsg('Unauthorized')
        } else {
          setErrmsg(err.data?.message)
        }
        errRef.current.focus()
      }
    }

    const handlePwdInput = (e) => {
      setPassword(e.target.value)
    }
    const handleUserInput = (e) => {
      setUsername(e.target.value)
    }

    const togglePersist = () => {
      setPersist(prev => !prev)
    }

    const errClass = errmsg ? "errMsg" : "offscreen" // a variable to inject CSS classes on input

    if (isLoading) return <p>... is loading</p>

    const content = (
      <section className="public-login">
        <header>
          <h1>PRGRESS</h1>
        </header>
        <main className="login">
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        {isError && <p className="successmsg">Uh-oh. Something went wrong</p>}
        <p className={errClass}>{error?.data?.message}</p>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-300">Sign in to your account</h2>
        </div>
        {/* Sign up Form */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <div className="mt-1">
                  <input
                  ref={userRef}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={handleUserInput}
                    className="text-gray-900 font-medium block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handlePwdInput}
                    required
                    className="text-gray-900 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    onChange={togglePersist}
                    checked={persist}
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-gray-300 text-xs hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
        </main>
        <footer className="footer">
          <Link to='/'>Home</Link>
        </footer>
      </section>
    )

  return content
}

export default Login