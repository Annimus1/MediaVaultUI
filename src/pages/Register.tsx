import axios from 'axios';
import React from 'react'
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';

function Register() {

  const [passwordError, setPasswordError] = React.useState(false);
  const [error, setError] = React.useState({ status: false, message: "error" });
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const authContext = React.useContext(AuthContext);

  const register = () => {
    setLoading(!loading);

    axios.post<RegisterResponse>(import.meta.env.VITE_URL + '/auth/register', { user, password, email })
      .then(response => {
        if (response.status == 200) {
          const token = response.data.token;
          setError({ status: false, message: "" });
          authContext?.login(token);
        }
      })
      .catch(error => {
        setError({ status: true, message: error.response.data.message || "Something went wrong!" })
      });

    setLoading(false);
  }

  React.useEffect(() => {
    if (password !== password2) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password, password2]);

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-center 
    bg-[url("https://images.unsplash.com/photo-1629180774299-b0d0adc288e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
      
      <div className='w-full h-dvh bg-black/20 fixed'></div>
      
      <div className={error.status ? "tooltip tooltip-open tooltip-error" : ""} data-tip={error.message}>
        <fieldset className="w-xs fieldset bg-base-200 border-base-300 rounded-box border p-4 md:w-lg lg:w-xl xl:w-[38rem]">
          <legend className="fieldset-legend text-2xl">Register</legend>

          <label className="label select-none text-lg" htmlFor='user'>Username</label>
          <input type="text" id='user' onChange={e => setUser(e.target.value)} value={user} className="input w-full text-lg focus:outline-0" placeholder="username" />

          <br />

          <label className="label select-none text-lg" htmlFor='user'>Email</label>
          <input type="email" id='email' onChange={e => setEmail(e.target.value)} value={email} className="input w-full text-lg focus:outline-0" placeholder="Email" />

          <br />

          <label className="label select-none text-lg">Password</label>
          <div className={passwordError ? "tooltip tooltip-open tooltip-error" : ""} data-tip={"Password doesn't match"}>
            <input type="password" onChange={e => setPassword(e.target.value)} value={password} className="input w-full text-lg focus:outline-0" placeholder="Password" />
          </div>

          <br />

          <label className="label select-none text-lg">Confirm Password</label>
          <div className={passwordError ? "tooltip tooltip-open tooltip-error tooltip-bottom" : ""} data-tip={"Password doesn't match"}>
            <input type="password" onChange={e => setPassword2(e.target.value)} value={password2} className="input w-full text-lg focus:outline-0" placeholder="Password" />
          </div>

          <br />

          <button onClick={() => register()} className="btn btn-neutral mt-4 text-lg z-10" disabled={passwordError || password.length <= 0 || password2.length <= 0} >Sign  Up {loading ? <span className="loading loading-dots loading-md"></span> : ""}</button>

          <p>Do you already have an account? <Link to="/login" className="link link-accent">Sign In</Link> here.</p>
        </fieldset>
      </div>
    </div>
  )
}

interface RegisterResponse {
  token: string;
}

export default Register;