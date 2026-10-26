import { useContext, useEffect, useState, type JSX } from "react";
import { MediaContext } from "../context/MediaContext";

function Pagination() {
  const mediaContext = useContext(MediaContext);
  const [buttons, setButtons]= useState<JSX.Element[]>([]);

  useEffect(()=> {
    const newButtons: JSX.Element[] = [];
    const totalAmount = mediaContext?.totalAmount ?? 0;
    for (let i = 0; i < totalAmount; i++) {
      const isActive = mediaContext?.currentAmount === i + 1;
      const ariaLabel = (i + 1).toString();
      const className = `join-item btn btn-square ${isActive ? 'btn-active' : ''}`;

      newButtons.push(
        <input
          key={i}
          className={className}
          type="radio"
          name="options"
          checked={isActive}
          aria-label={ariaLabel}
          onClick={() => mediaContext?.setCurrentAmount(i + 1)}
          readOnly
        />
      );
    }
    setButtons(newButtons);
  }, [mediaContext?.totalAmount, mediaContext?.currentAmount]);

  return (
    <div className="join">
      {buttons}
    </div>
  )
}

export default Pagination;