import React from 'react'

function Login() {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md h-[22rem] border p-4 m-4 ">
        <legend className="fieldset-legend text-2xl">Login</legend>

        <label className="label select-none text-lg" htmlFor='user'>Email | Username</label>
        <input type="text" id='user' className="input w-full text-lg focus:outline-0" placeholder="Email | username" />
        
        <br/>

        <label className="label select-none text-lg">Password</label>
        <input type="password" className="input w-full text-lg focus:outline-0" placeholder="Password" />

        <br/>

        <button className="btn btn-neutral mt-4 text-lg">Login</button>

        <p>Don't have an account yet? <a className="link link-accent">Register</a> here.</p>
      </fieldset>
    </div>
  )
}

export default Login