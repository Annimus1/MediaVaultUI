import React from 'react';
import { DayPicker } from 'react-day-picker';
import { MediaContext } from '../context/MediaContext';

const MEDIA_TYPES = [
  { value: 'movie', label: 'Movie' },
  { value: 'serie', label: 'Serie' },
  { value: 'anime', label: 'Anime' },
  { value: 'videogame', label: 'Video Game' },
  { value: 'book', label: 'Book' },
];

const LANGUAGES = [
  { value: 'spanish', label: 'Spanish' },
  { value: 'english', label: 'English' },
  { value: 'sub-spanish', label: 'Sub-spanish' },
];

const CONTROL_CLASSES =
  'w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-500 hover:border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50';

const LABEL_CLASSES = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400';

function toDateValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDate(value: string): string {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function SelectField({ id, label, value, placeholder, options, onChange }: SelectFieldProps) {
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
          <option className="bg-slate-900" value="">{placeholder}</option>
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

interface DateFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function DateField({ id, label, value, onChange }: DateFieldProps) {
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
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <span className={LABEL_CLASSES}>{label}</span>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`${CONTROL_CLASSES} flex items-center gap-2 text-left`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0 text-slate-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
        <span className={value ? 'text-slate-200' : 'text-slate-500'}>
          {value ? formatDate(value) : 'Any date'}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`ml-auto size-4 shrink-0 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-2xl shadow-black/50">
          <DayPicker
            className="date-picker"
            mode="single"
            selected={value ? new Date(`${value}T00:00:00`) : undefined}
            onSelect={(date) => {
              onChange(date ? toDateValue(date) : '');
              setOpen(false);
            }}
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange('');
                setOpen(false);
              }}
              className="mt-2 w-full rounded-lg border border-slate-800 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
            >
              Clear date
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function Filters() {
  const mediaContext = React.useContext(MediaContext);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [score, setScore] = React.useState<number | null>(null);
  const [fromDate, setFromDate] = React.useState<string>('');
  const [toDate, setToDate] = React.useState<string>('');
  const [mediaType, setMediaType] = React.useState<string>('');
  const [language, setLanguage] = React.useState<string>('');

  const activeCount = [
    mediaType !== '',
    language !== '',
    score !== null && score > 0,
    fromDate !== '',
    toDate !== '',
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFromDate('');
    setToDate('');
    setScore(null);
    setMediaType('');
    setLanguage('');
  };

  const handleSearch = () => {
    let text: string = '';
    if (score) text += `&score=${score * 2}`;
    if (fromDate) text += `&from=${fromDate}`;
    if (toDate) text += `&to=${toDate}`;
    if (mediaType) text += `&mediaType=${mediaType}`;
    if (language) text += `&language=${language}`;
    mediaContext?.setQueryString(text);
    mediaContext?.setCurrentAmount(1);
    setMobileOpen(false);
  };

  return (
    <section className="relative z-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="glass-card rounded-2xl shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-100">Filters</p>
              <p className="text-[11px] text-slate-500">
                {activeCount > 0 ? `${activeCount} active` : 'Refine your collection'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileOpen((isOpen) => !isOpen)}
              aria-expanded={mobileOpen}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/60 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-white md:hidden"
            >
              {mobileOpen ? 'Hide' : 'Show'}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-3.5 transition-transform ${mobileOpen ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`${mobileOpen ? 'grid' : 'hidden'} gap-3 p-4 sm:grid-cols-2 md:grid md:grid-cols-2 md:p-5 lg:grid-cols-3 xl:grid-cols-6`}>
          <SelectField
            id="mediaType"
            label="Media type"
            value={mediaType}
            placeholder="Any type"
            options={MEDIA_TYPES}
            onChange={setMediaType}
          />

          <SelectField
            id="language"
            label="Language"
            value={language}
            placeholder="Any language"
            options={LANGUAGES}
            onChange={setLanguage}
          />

          <div>
            <label htmlFor="score" className={LABEL_CLASSES}>Score</label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <input
                id="score"
                type="number"
                min={0}
                max={5}
                step={0.5}
                value={score ?? ''}
                onChange={(e) => setScore(e.target.value === '' ? null : Number(e.target.value))}
                placeholder="Any"
                className={`${CONTROL_CLASSES} pl-9`}
              />
            </div>
          </div>

          <DateField
            id="fromDate"
            label="From"
            value={fromDate}
            onChange={setFromDate}
          />

          <DateField
            id="toDate"
            label="To"
            value={toDate}
            onChange={setToDate}
          />

          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={handleSearch}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              Search
            </button>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                aria-label="Clear filters"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/60 p-2.5 text-slate-400 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
