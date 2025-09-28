import { useNavigate } from "react-router";
import type { Media } from "../context/MediaContext";
import Score from "./Score";

function CardComponent(props: Media) {
  const date = new Date(props.completedDate);
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
        onClick={()=> navigate(`/${props._id}/update`)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
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
          props.score && <Score id={props._id} score={props.score}/>
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
