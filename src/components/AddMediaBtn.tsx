import { Link } from "react-router";

export default function AddMediaBtn() {
  return (
    <Link
      to={"/404"}
      role="button"
      className="p-4 bg-accent rounded-full hover:scale-110 transition-all duration-300" title="Add Media"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 font-bold hover:scale-110 transition-all duration-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </Link>
  )
}
