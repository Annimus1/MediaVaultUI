import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import type { Media } from "../context/MediaContext";
import { AuthContext } from "../context/AuthContext";
import Score from "./Score";

function CardComponent(props: Media) {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const date = new Date(props.completedDate);
  const formattedDate = Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

  const handleDelete = () => {
    setMenuOpen(false);
    if (
      confirm(
        `Are you sure you want to delete "${props.name}"?\nYou will lose the data permanently.`
      )
    ) {
      axios
        .delete(import.meta.env.VITE_URL + `/${props._id}`, {
          headers: {
            Authorization: `Bearer ${authContext?.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            window.location.reload();
          }
        });
    }
  };

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-black/30">
      <div className="relative">
        <img
          src={props.poster}
          alt={`${props.name} poster`}
          className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />

        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
          {props.mediaType}
        </span>

        <div
          className={`absolute right-3 top-3 z-20 transition-opacity duration-200 ${
            menuOpen
              ? "opacity-100"
              : "opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100"
          }`}
        >
          <button
            type="button"
            aria-label="Media actions"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-36 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/95 p-1 shadow-xl shadow-black/40 backdrop-blur-md"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  navigate(`/${props._id}/update`);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-200 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
                Edit
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={handleDelete}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="line-clamp-2 text-base font-semibold leading-snug text-slate-100 md:text-lg">
          {props.name}
        </h2>

        <div className="mt-2 flex items-center gap-2">
          {props.score > 0 ? (
            <>
              <Score id={props._id} score={props.score} />
              <span className="text-xs text-slate-400">
                {(props.score / 2).toFixed(1)}
              </span>
            </>
          ) : (
            <span className="text-xs text-slate-500">Not rated</span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-800/60 pt-3">
          <span className="rounded-full bg-slate-600/80 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-300">
            {props.language}
          </span>
          <span className="text-xs text-slate-400">{formattedDate}</span>
        </div>
      </div>
    </article>
  );
}

export default CardComponent;
