import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { RecommendationsContext } from "../context/RecommendationsContext";
import RecommendationCard from "./RecommendationCard";

const CARD_WIDTH_CLASSES = "w-60 shrink-0 snap-start";

function RecommendationCarousel() {
  const recommendationsContext = useContext(RecommendationsContext);
  const recommendations = (recommendationsContext?.recommendations ?? []).slice(
    0,
    10
  );
  const isLoading = recommendationsContext?.isLoading ?? false;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setCanScrollLeft(scroller.scrollLeft > 0);
    setCanScrollRight(
      scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 1
    );
  }, []);

  useEffect(() => {
    updateScrollState();

    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      scroller.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, recommendations.length, isLoading]);

  const scrollByPage = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({
      left: direction * Math.max(scroller.clientWidth * 0.8, 280),
      behavior: "smooth",
    });
  };

  const showSuggestions = !isLoading && recommendations.length > 0;

  if (!isLoading && !showSuggestions) return null;

  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="glass-card rounded-2xl shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
                />
              </svg>
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold text-slate-100">
                Recommended for you
              </p>
              <p className="truncate text-[11px] text-slate-500">
                Personalized picks from your catalog
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/recommendations"
              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-indigo-300 transition-colors hover:bg-indigo-500/10 hover:text-indigo-200"
            >
              See all
            </Link>

            <div className="hidden items-center gap-1 sm:flex">
              <button
                type="button"
                onClick={() => scrollByPage(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll recommendations left"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/60 text-slate-300 transition-colors hover:border-slate-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollByPage(1)}
                disabled={!canScrollRight}
                aria-label="Scroll recommendations right"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/60 text-slate-300 transition-colors hover:border-slate-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex gap-4 overflow-hidden p-4 sm:p-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={CARD_WIDTH_CLASSES}>
                <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                  <div className="skeleton aspect-[3/4] w-full" />
                  <div className="flex flex-col gap-3 p-4">
                    <div className="skeleton h-4 w-3/4" />
                    <div className="skeleton h-3 w-full" />
                    <div className="skeleton h-3 w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto p-4 [scrollbar-width:none] sm:p-5 [&::-webkit-scrollbar]:hidden"
          >
            {recommendations.map((recommendation) => (
              <div
                key={`${recommendation.mediaType}-${recommendation.name}`}
                className={CARD_WIDTH_CLASSES}
              >
                <RecommendationCard recommendation={recommendation} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default RecommendationCarousel;
