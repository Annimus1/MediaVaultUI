import { useNavigate } from "react-router";
import type { Media } from "../context/MediaContext";
import Score from "./Score";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

function CardComponent(props: Media) {
  const date = new Date(props.completedDate);
  const authContext = useContext(AuthContext);
  
  const navigate = useNavigate()
  const selectBadgeColor = (mtype: string): string => {
    switch (mtype) {
      case "book":
        return "badge-error";
      case "movie":
        return "badge-secondary";
      case "serie":
        return "badge-accent";
      case "anime":
        return "badge-info";
      case "videogame":
        return "badge-warning";
      case "spanish":
        return "badge-secondary";
      case "english":
        return "badge-accent";
      case "sub-spanish":
        return "badge-warning";
      default:
        return "badge-primary";
    }
  }

  return (
    <div className="card bg-base-100 w-96 shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      <figure>
        <img
          src={props.poster}
          className="w-xs h-72 md:h-80 lg:h-96 md:w-md lg:w-lg xl:w-xl max-h-72 aspect-auto object-contain"
          alt="Poster" />
      </figure>

      <div className="card-body">
        <span className="absolute top-0 right-5 cursor-pointer hover:text-accent"
          onClick={() => navigate(`/${props._id}/update`)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </span>

        <span className="absolute top-0 left-5 cursor-pointer hover:text-red-500"
          onClick={() => {
            if (confirm(`Are you sure you want to delete "${props.name}"?\nYou will lost the data permanently.`)) {
              axios.delete(import.meta.env.VITE_URL + `/${props._id}`, {
                headers: {
                  'Authorization': `Bearer ${authContext?.token}`,
                  'Content-Type': "application/json"
                }
              })
                .then(response => {
                  console.log(response.status);
                  if (response.status === 200) {
                    window.location.reload();
                  }
                })
            }
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
          </svg>
        </span>
        <h2 className="card-title">
          {props.name}

          { // Displaying the media type badge based on the mediaType prop 
            <div className={`badge ${selectBadgeColor(props.mediaType)} badge-outline`}>
              {props.mediaType.toUpperCase()}
            </div>
          }
        </h2>

        {          // Display rating if it exists
          props.score && <Score id={props._id} score={props.score} />
        }
        <div className="mt-10 card-actions justify-between">
          {
            <div className={`badge badge-outline ${selectBadgeColor(props.language)} badge-outline`}>
              {props.language.toUpperCase()}
            </div>
          }
          <div className="badge badge-outline">{date.toDateString()}</div>
        </div>
      </div>
    </div>
  )
}

export default CardComponent;
