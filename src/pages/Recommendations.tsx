import { useContext } from "react";
import { Link } from "react-router";
import Navigation from "../components/Navigation";
import RecommendationCard from "../components/RecommendationCard";
import { RecommendationsContext } from "../context/RecommendationsContext";
import errorImage from "../assets/error.jpg";

function Recommendations() {
  document.title = "Media Vault - Recommendations";

  const recommendationsContext = useContext(RecommendationsContext);
  const recommendations = recommendationsContext?.recommendations ?? [];
  const isLoading = recommendationsContext?.isLoading ?? false;
  const error = recommendationsContext?.error ?? null;
  const noHistory = recommendationsContext?.noHistory ?? false;
  const refresh = recommendationsContext?.refresh;

  const handleRefresh = () => refresh?.();

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navigation />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Powered by AI
            </p>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Recommendations
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Personalized picks based on your catalog.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-3.5 py-2 text-sm font-semibold text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`size-4 ${isLoading ? "animate-spin" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Refresh
          </button>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
              >
                <div className="skeleton aspect-[3/4] w-full" />
                <div className="flex flex-col gap-3 p-4">
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-3 w-full" />
                  <div className="skeleton h-3 w-2/3" />
                </div>
              </div>
            ))}

          {!isLoading &&
            !error &&
            !noHistory &&
            recommendations.map((recommendation) => (
              <RecommendationCard
                key={`${recommendation.mediaType}-${recommendation.name}`}
                recommendation={recommendation}
              />
            ))}
        </div>

        {!isLoading && noHistory && (
          <div className="flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
                />
              </svg>
            </span>
            <div className="flex max-w-md flex-col items-center gap-2">
              <p className="text-2xl font-semibold text-slate-100">
                No media history yet
              </p>
              <p className="text-center text-slate-400">
                Add at least one title to your catalog so we can generate
                personalized recommendations for you.
              </p>
            </div>
            <Link
              to="/add"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 active:scale-[0.98]"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add media
            </Link>
          </div>
        )}

        {!isLoading &&
          !error &&
          !noHistory &&
          recommendations.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
              <p className="text-2xl font-semibold text-slate-100">
                No recommendations available
              </p>
              <p className="max-w-md text-slate-400">
                We could not find recommendations with a verified cover this
                time. Try refreshing to generate a new set.
              </p>
              <button
                type="button"
                onClick={handleRefresh}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 active:scale-[0.98]"
              >
                Try again
              </button>
            </div>
          )}

        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
            <img className="w-96 rounded-2xl" src={errorImage} alt="Error" />
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-3xl font-bold text-red-500">
                Could not load recommendations
              </p>
              <p className="max-w-md text-slate-300">{error}</p>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white active:scale-[0.98]"
            >
              Try again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Recommendations;
