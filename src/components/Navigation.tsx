import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import BtnCustom from './BtnCustom'
import { Link } from 'react-router';

export default function Navigation() {
  const authContext = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-md mb-4  w-[105vw] md:w-[99.5vw] md:overflow-hidden">
      <div className="navbar-start w-full">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-2">
            <li>
              <BtnCustom label={"Sign Out"} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>} action={() => authContext?.logout()} />
            </li>
          </ul>
        </div>
        <Link to={'/'} className="btn btn-ghost text-xl p-2"><span><img className="h-8" src="/public/treasure.png" alt="" /></span>MediaVault</Link>
      </div>

      <div className="w-full navbar-end hidden lg:flex lg:gap-4">
        <BtnCustom label={"Sign Out"} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>} action={() => authContext?.logout()} />
      </div>
    </div>
  )
}
