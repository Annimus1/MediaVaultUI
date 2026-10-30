import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface AddMediaFormProps {
  comment: string;
  completedDate: Date | undefined;
  language: string;
  mediaType: string;
  name: string;
  poster: string;
  score: number;
  _id: string | undefined;
}

interface SelectOption {
  value: string;
  label: string;
}

const MEDIA_TYPES: SelectOption[] = [
  { value: "movie", label: "Movie" },
  { value: "serie", label: "Serie" },
  { value: "anime", label: "Anime" },
  { value: "videogame", label: "Video Game" },
  { value: "book", label: "Book" },
];

const LANGUAGES: SelectOption[] = [
  { value: "spanish", label: "Spanish" },
  { value: "english", label: "English" },
  { value: "sub-spanish", label: "Sub-spanish" },
];

const CONTROL_CLASSES =
  "w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-500 hover:border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50";

const LABEL_CLASSES = "mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400";

const CALENDAR_STYLE = {
  "--rdp-accent-color": "#818cf8",
  "--rdp-accent-background-color": "rgba(99, 102, 241, 0.18)",
  "--rdp-today-color": "#a5b4fc",
  "--rdp-day-height": "clamp(2rem, 8vw, 2.5rem)",
  "--rdp-day-width": "clamp(2rem, 8vw, 2.5rem)",
  "--rdp-day_button-height": "clamp(2rem, 8vw, 2.5rem)",
  "--rdp-day_button-width": "clamp(2rem, 8vw, 2.5rem)",
  "--rdp-day_button-border-radius": "0.5rem",
  "--rdp-selected-border": "1px solid var(--rdp-accent-color)",
  "--rdp-outside-opacity": 0.4,
} as React.CSSProperties;

function toDateValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isValidDate(date: Date | undefined): date is Date {
  return !!date && !Number.isNaN(date.getTime());
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

interface DateFieldProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

function DateField({ value, onChange }: DateFieldProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <span className={LABEL_CLASSES}>Completed date</span>
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`${CONTROL_CLASSES} flex items-center gap-2 text-left`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0 text-slate-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
        <span className={isValidDate(value) ? "text-slate-200" : "text-slate-500"}>
          {isValidDate(value) ? formatDate(value) : "Select a date"}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`ml-auto size-4 shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-40 mt-2 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-2xl shadow-black/50">
          <DayPicker
            mode="single"
            selected={isValidDate(value) ? value : undefined}
            defaultMonth={isValidDate(value) ? value : undefined}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            style={CALENDAR_STYLE}
          />
        </div>
      )}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

function SelectField({ id, label, value, options, onChange }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASSES}>{label}</label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${CONTROL_CLASSES} appearance-none pr-9`}
        >
          {options.map((option) => (
            <option key={option.value} className="bg-slate-900" value={option.value}>{option.label}</option>
          ))}
        </select>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  );
}

export default function AddMediaForm(props: AddMediaFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string>(props.name);
  const [completedDate, setCompletedDate] = React.useState<Date | undefined>(props.completedDate);
  const [score, setScore] = React.useState<number>(
    Number.isInteger(props.score) ? props.score : Math.round(props.score)
  );
  const [poster, setPoster] = React.useState<string>(props.poster);
  const [mediaType, setMediaType] = React.useState<string>(props.mediaType || "movie");
  const [language, setLanguage] = React.useState<string>(props.language || "spanish");
  const [comment, setComment] = React.useState<string>(props.comment ?? "");
  const errorTimeout = React.useRef<number | undefined>(undefined);

  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();
  const isEditing = Boolean(props._id);

  React.useEffect(() => {
    return () => window.clearTimeout(errorTimeout.current);
  }, []);

  const showError = (message: string) => {
    setError(message);
    window.clearTimeout(errorTimeout.current);
    errorTimeout.current = window.setTimeout(() => setError(null), 4000);
  };

  const resetForm = () => {
    setName("");
    setCompletedDate(undefined);
    setScore(0);
    setPoster("");
    setMediaType("movie");
    setLanguage("spanish");
    setComment("");
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    if (!name.trim() || !isValidDate(completedDate) || !score || !poster.trim() || !mediaType || !language) {
      showError("Please fill in all required fields.");
      return;
    }

    if (!/^https?:\/\/.+/.test(poster.trim())) {
      showError("Please enter a valid poster URL starting with http:// or https://.");
      return;
    }

    if (!Number.isInteger(score)) {
      showError("Score must be a whole number between 0 and 10.");
      return;
    }

    if (score < 0 || score > 10) {
      showError("Score must be a whole number between 0 and 10.");
      return;
    }

    const payload = {
      name: name.trim(),
      completedDate: toDateValue(completedDate),
      score,
      poster: poster.trim(),
      mediaType,
      language,
      comment: comment.trim() || null,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authContext?.token}`,
        "Content-Type": "application/json",
      },
    };

    setIsLoading(true);
    setError(null);

    try {
      if (isEditing) {
        const response = await axios.put(`${import.meta.env.VITE_URL}/${props._id}`, payload, config);
        if (response.status === 200) navigate("/");
      } else {
        const response = await axios.post(`${import.meta.env.VITE_URL}/addMedia`, payload, config);
        if (response.status === 201) navigate("/");
      }
    } catch {
      showError(isEditing ? "An error occurred while updating the media." : "An error occurred while adding media.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card w-full max-w-3xl rounded-2xl p-5 text-slate-100 shadow-2xl shadow-black/30 sm:p-8"
    >
      <div className="mb-6 flex items-start gap-3 sm:mb-8">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </span>
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {isEditing ? "Edit media" : "Add new media"}
          </h1>
          <p className="text-sm text-slate-400">
            {isEditing ? "Update the details of your media entry" : "Save something new to your collection"}
          </p>
        </div>
      </div>

      {error && (
        <div role="alert" className="mb-5 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-0.5 size-4 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={LABEL_CLASSES}>Name</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={CONTROL_CLASSES}
            placeholder="Title of the media"
          />
        </div>

        <DateField value={completedDate} onChange={setCompletedDate} />

        <div>
          <label htmlFor="score" className={LABEL_CLASSES}>Score (0-10)</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            <input
              id="score"
              type="number"
              required
              min={0}
              max={10}
              step={1}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className={`${CONTROL_CLASSES} pl-9`}
              placeholder="Score (0-10)"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="poster" className={LABEL_CLASSES}>Poster URL</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
            <input
              id="poster"
              type="url"
              required
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
              className={`${CONTROL_CLASSES} pl-9`}
              placeholder="https://example.com/poster.jpg"
            />
          </div>
        </div>

        <SelectField
          id="mediaType"
          label="Media type"
          value={mediaType}
          options={MEDIA_TYPES}
          onChange={setMediaType}
        />

        <SelectField
          id="language"
          label="Language"
          value={language}
          options={LANGUAGES}
          onChange={setLanguage}
        />

        <div className="sm:col-span-2">
          <label htmlFor="comment" className={LABEL_CLASSES}>Comment <span className="normal-case tracking-normal text-slate-500">(optional)</span></label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={`${CONTROL_CLASSES} min-h-28 resize-y`}
            placeholder="Share your thoughts about this media"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <Link
            to="/"
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white active:scale-[0.99] sm:flex-none"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex flex-1 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200 sm:flex-none"
          >
            Reset
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {isLoading ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          )}
          {isEditing ? "Save changes" : "Add media"}
        </button>
      </div>
    </form>
  );
}
