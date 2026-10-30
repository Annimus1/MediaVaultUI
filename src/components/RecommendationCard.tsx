import type { Recommendation } from "../types/recommendation";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

function matchBadgeClasses(matchPercentage: number): string {
  if (matchPercentage >= 90) return "bg-emerald-500/90";
  if (matchPercentage >= 75) return "bg-indigo-500/90";
  return "bg-amber-500/90";
}

function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const { name, mediaType, reason, matchPercentage, poster, isbn } = recommendation;

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-black/30">
      <div className="relative">
        <img
          src={poster}
          alt={`${name} poster`}
          className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />

        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
          {mediaType}
        </span>

        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md ${matchBadgeClasses(matchPercentage)}`}
          title={`${matchPercentage}% match`}
        >
          {matchPercentage}% match
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="line-clamp-2 text-base font-semibold leading-snug text-slate-100 md:text-lg">
          {name}
        </h2>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
          {reason}
        </p>

        {isbn && (
          <p className="mt-3 border-t border-slate-800/60 pt-3 text-xs text-slate-500">
            ISBN {isbn}
          </p>
        )}
      </div>
    </article>
  );
}

export default RecommendationCard;
