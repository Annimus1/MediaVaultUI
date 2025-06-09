import type { Media } from "../context/MediaContext";
import Score from "./Score";

function CardComponent(props: Media) {
  const date = new Date(props.completedDate);
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
    <div className="card bg-base-100 w-96 shadow-md hover:shadow-lg transition-shadow duration-300">
      <figure>
        <img
          src={props.poster}
          className="w-xs h-72 md:h-80 lg:h-96 md:w-md lg:w-lg xl:w-xl max-h-72 aspect-auto object-contain"
          alt="Poster" />
      </figure>

      <div className="card-body">
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
