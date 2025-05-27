import React from 'react'

function Register() {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-4 m-4 ">
        <legend className="fieldset-legend text-2xl">Register</legend>

        <label className="label select-none text-lg" htmlFor='user'>Username</label>
        <input type="text" id='user' className="input w-full text-lg focus:outline-0" placeholder="username" />

        <br />

        <label className="label select-none text-lg" htmlFor='user'>Email</label>
        <input type="email" id='email' className="input w-full text-lg focus:outline-0" placeholder="Email" />

        <br />

        <label className="label select-none text-lg">Password</label>
        <input type="password" className="input w-full text-lg focus:outline-0" placeholder="Password" />

        <br />

        <label className="label select-none text-lg">Confirm Password</label>
        <input type="password" className="input w-full text-lg focus:outline-0" placeholder="Password" />

        <br />

        <button className="btn btn-neutral mt-4 text-lg">Sign  Up</button>

        <p>Do you already have an account? <a className="link link-accent">Sign In</a> here.</p>
      </fieldset>
    </div>
  )
}

export default Register;