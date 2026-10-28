import { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';

export default function Navigation() {
  const authContext = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-600/30 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105">
            <img className="h-5 w-5" src="/treasure.png" alt="" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-lg font-bold tracking-tight text-white">MediaVault</span>
            <span className="hidden text-[11px] font-medium uppercase tracking-wider text-slate-500 sm:block">Your collection</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/add"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="hidden sm:inline">Add media</span>
          </Link>

          <button
            type="button"
            onClick={() => authContext?.logout()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-3.5 py-2 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
