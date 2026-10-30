import {
  useContext,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { RecommendationsContext } from "../context/RecommendationsContext";
import type { Recommendation } from "../types/recommendation";

const LANGUAGES = [
  { value: "spanish", label: "Spanish" },
  { value: "english", label: "English" },
  { value: "sub-spanish", label: "Sub-spanish" },
];

const CONTROL_CLASSES =
  "w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-500 hover:border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50";

const LABEL_CLASSES =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400";

function todayValue(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

interface SeenRecommendationModalProps {
  recommendation: Recommendation;
  onClose: () => void;
}

function SeenRecommendationModal({
  recommendation,
  onClose,
}: SeenRecommendationModalProps) {
  const authContext = useContext(AuthContext);
  const recommendationsContext = useContext(RecommendationsContext);

  const [completedDate, setCompletedDate] = useState<string>(todayValue);
  const [score, setScore] = useState<string>("");
  const [language, setLanguage] = useState<string>("english");
  const [comment, setComment] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSaving) return;

    const numericScore = Number(score);

    if (!completedDate || score === "" || Number.isNaN(numericScore)) {
      setError("Please complete the date and score.");
      return;
    }

    if (!Number.isInteger(numericScore)) {
      setError("Score must be a whole number between 0 and 10.");
      return;
    }

    if (numericScore < 0 || numericScore > 10) {
      setError("Score must be a whole number between 0 and 10.");
      return;
    }

    setIsSaving(true);
    setError(null);

    const payload = {
      name: recommendation.name,
      completedDate,
      score: numericScore,
      poster: recommendation.poster,
      mediaType: recommendation.mediaType,
      language,
      comment: comment.trim(),
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_URL + "/addMedia",
        payload,
        {
          headers: {
            Authorization: `Bearer ${authContext?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        recommendationsContext?.removeRecommendation(recommendation);
        onClose();
      }
    } catch (requestError) {
      const errorResponse = (
        requestError as {
          response?: { status?: number; data?: { message?: unknown } };
        }
      ).response;
      const status = errorResponse?.status;

      if (status === 401) {
        authContext?.logout();
        return;
      }

      const backendMessage = errorResponse?.data?.message;
      setError(
        typeof backendMessage === "string"
          ? backendMessage
          : "Could not add this title. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="seen-recommendation-title"
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/50 sm:rounded-2xl"
      >
        <div className="flex items-start gap-3 border-b border-slate-800 p-4 sm:p-5">
          <img
            src={recommendation.poster}
            alt=""
            className="h-24 w-16 shrink-0 rounded-lg object-cover"
          />

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
              {recommendation.mediaType}
            </p>
            <h2
              id="seen-recommendation-title"
              className="line-clamp-2 text-lg font-bold leading-snug text-white"
            >
              {recommendation.name}
            </h2>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
              {recommendation.reason}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
            <p className="mb-4 text-sm text-slate-400">
              Complete the details to add this title to your collection.
            </p>

            {error && (
              <div
                role="alert"
                className="mb-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-sm text-rose-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mt-0.5 size-4 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="seen-completed-date" className={LABEL_CLASSES}>
                  Completed date
                </label>
                <input
                  id="seen-completed-date"
                  type="date"
                  required
                  value={completedDate}
                  onChange={(event) => setCompletedDate(event.target.value)}
                  className={CONTROL_CLASSES}
                />
              </div>

              <div>
                <label htmlFor="seen-score" className={LABEL_CLASSES}>
                  Score (0-10)
                </label>
                <input
                  id="seen-score"
                  type="number"
                  required
                  min={0}
                  max={10}
                  step={1}
                  value={score}
                  onChange={(event) => setScore(event.target.value)}
                  placeholder="e.g. 8"
                  className={CONTROL_CLASSES}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="seen-language" className={LABEL_CLASSES}>
                  Language
                </label>
                <div className="relative">
                  <select
                    id="seen-language"
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                    className={`${CONTROL_CLASSES} appearance-none pr-9`}
                  >
                    {LANGUAGES.map((option) => (
                      <option
                        key={option.value}
                        className="bg-slate-900"
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="seen-comment" className={LABEL_CLASSES}>
                  Comment{" "}
                  <span className="normal-case tracking-normal text-slate-500">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="seen-comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  className={`${CONTROL_CLASSES} min-h-24 resize-y`}
                  placeholder="Share your thoughts about this title"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-800 p-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white active:scale-[0.99]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
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
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              )}
              Add to collection
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default SeenRecommendationModal;
