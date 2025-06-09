import type { JSX } from "react";

/**
 * Componente para mostrar una puntuación en formato de estrellas (0-5, con medios puntos).
 * 
 * @component
 * @param {Object} props
 * @param {string} props.id - Identificador único para el grupo de estrellas.
 * @param {number} props.score - Puntuación de 0 a 10.
 * @returns {JSX.Element}
 */
export default function Score({ id, score }: { id: string; score: number }): JSX.Element {
  // convert score from 0-10 to 0-5
  const fixedScore = score / 2;
  
  // Function to determine if a star should be checked based on the score
  const mightBeChecked = (starScore:number):boolean=>{
    if(starScore === fixedScore ) return true;
    return false;
  };


  return (
    <div className="rating rating-lg rating-half" title={`Score: ${fixedScore}`}>
      <input type="radio" name={`rating-${id}`} className="rating-hidden" />
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="0.5 star" checked={mightBeChecked(0.5)}/>
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="1 star"   checked={mightBeChecked(1)}/>
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="1.5 star" checked={mightBeChecked(1.5)}/>
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="2 star"   checked={mightBeChecked(2)}/>
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="2.5 star" checked={mightBeChecked(2.5)}/>
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="3 star"   checked={mightBeChecked(3)}/>
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="3.5 star" checked={mightBeChecked(3.5)}/>
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="4 star"   checked={mightBeChecked(4)}/>
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="4.5 star" checked={mightBeChecked(4.5)}/>
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="5 star"   checked={mightBeChecked(5)}/>
    </div>
  );
}
