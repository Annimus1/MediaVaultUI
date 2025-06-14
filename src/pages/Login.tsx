import axios from 'axios'
import React from 'react'
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import.meta.env

function Login() {

  const [error, setError] = React.useState({ status: false, message: "error" });
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");

  const authContect = React.useContext(AuthContext);

  const login = () => {
    setLoading(!loading);

    axios.post<LoginResponse>(import.meta.env.VITE_URL + '/auth/login', { user, password })
      .then(response => {
        if (response.status == 200) {
          const token: string = response.data.token;
          setError({ status: false, message: "" });
          authContect?.login(token);
        }
      })
      .catch(error => {
        setError({ status: true, message: error.response.data.message || "Something went wrong!" })
      });
    
      setLoading(false);
  }

  return (
    <div className='w-full h-[100vh] flex items-center justify-center  bg-center 
    bg-[url("https://images.unsplash.com/photo-1629180774299-b0d0adc288e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
      <div className='w-full h-dvh bg-black/10 fixed'></div>
      <div className={error.status ? "tooltip tooltip-open tooltip-error" : ""} data-tip={error.message}>
        <fieldset className="w-xs fieldset bg-base-200 border-base-300 rounded-box border p-4 md:w-lg lg:w-xl xl:w-[38rem]">
          <legend className="fieldset-legend text-2xl">Login</legend>

          <label className="label select-none text-lg" htmlFor='user'>Email | Username</label>
          <input type="text" id='user' onChange={(text) => setUser(text.target.value)} value={user} className="input w-full text-lg focus:outline-0" placeholder="Email | username" />

          <br />

          <label className="label select-none text-lg">Password</label>
          <input type="password" onChange={(text) => setPassword(text.target.value)} value={password} className="input w-full text-lg focus:outline-0" placeholder="Password" />

          <br />

          <button disabled={!(user.length>0) || !(password.length>0)} className="btn btn-neutral mt-4 text-lg z-10" onClick={() => { login() }}>Login {loading ? <span className="loading loading-dots loading-md"></span> : ""}</button>

          <p>Don't have an account yet? <Link to="/register" className="link link-accent">Register</Link> here.</p>
        </fieldset>
      </div>
    </div>
  )
}

interface LoginResponse {
  token: string;
}

export default Login