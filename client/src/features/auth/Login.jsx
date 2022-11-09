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

    const [login, {isLoading}] = useLoginMutation()

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

    const errClass = errmsg ? "errmsg" : "offscreen" // a variable to inject CSS classes on input

    if (isLoading) return <p>... is loading</p>

    const content = (
      <section className="public-login">
        <header>
          <h1>PRGRESS LOGIN</h1>
        </header>
        <main className="login">
        <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <label htmlFor="persist">Trust this device</label>
                    <input
                        className="form__persist"
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}

                    />
                    <button className="form__submit-button">Sign In</button>
                </form>
        </main>
        <footer className="footer">
          <Link to='/'>Home</Link>
        </footer>
      </section>
    )

  return content
}

export default Login