import { useContext, useEffect, useState, type JSX } from "react";
import { MediaContext } from "../context/MediaContext";

function Pagination() {
  const mediaContext = useContext(MediaContext);
  const [buttons, setButtons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const totalAmount = mediaContext?.totalAmount ?? 0;
    const currentAmount = mediaContext?.currentAmount ?? 1;
    const newButtons: JSX.Element[] = [];

    if (totalAmount <= 0) {
      setButtons(newButtons);
      return;
    }

    const goToPage = (page: number) => mediaContext?.setCurrentAmount(page);

    newButtons.push(
      <button
        key="prev"
        className="join-item btn"
        disabled={currentAmount <= 1}
        aria-label="Previous page"
        onClick={() => goToPage(currentAmount - 1)}
      >
        Prev
      </button>
    );

    const start = Math.min(Math.max(currentAmount - 1, 1), Math.max(totalAmount - 2, 1));
    const end = Math.min(start + 2, totalAmount);

    for (let i = start; i <= end; i++) {
      const isActive = currentAmount === i;
      const className = `join-item btn btn-square ${isActive ? 'btn-active' : ''}`;

      newButtons.push(
        <input
          key={i}
          className={className}
          type="radio"
          name="options"
          checked={isActive}
          aria-label={i.toString()}
          onClick={() => goToPage(i)}
          readOnly
        />
      );
    }

    newButtons.push(
      <button
        key="next"
        className="join-item btn"
        disabled={currentAmount >= totalAmount}
        aria-label="Next page"
        onClick={() => goToPage(currentAmount + 1)}
      >
        Next
      </button>
    );

    newButtons.push(
      <button
        key="last"
        className="join-item btn"
        disabled={currentAmount >= totalAmount}
        aria-label="Last page"
        onClick={() => goToPage(totalAmount)}
      >
        Last
      </button>
    );

    setButtons(newButtons);
  }, [mediaContext?.totalAmount, mediaContext?.currentAmount]);

  return (
    <div className="join">
      {buttons}
    </div>
  )
}

export default Pagination;
