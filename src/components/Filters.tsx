import React from 'react';
import { DayPicker } from 'react-day-picker';
import { MediaContext } from '../context/MediaContext';


export default function Filters() {
  const mediaContext = React.useContext(MediaContext);

  const [showFromDate, setFromShowDate] = React.useState<boolean>(false);
  const [showToDate, setToShowDate] = React.useState<boolean>(false);

  const [score, setScore] = React.useState<number | null>(null);
  const [fromDate, setFromDate] = React.useState<string | undefined>('');
  const [toDate, setToDate] = React.useState<string | undefined>('');
  const [mediaType, setMediaType] = React.useState<string>('');
  const [language, setLanguage] = React.useState<string>('');

  const clearFilters = () => {
    setFromDate('');
    setToDate('');
    setScore(null);
    setMediaType('');
    setLanguage('');
    setFromShowDate(false);
    setToShowDate(false);
    mediaContext?.setQueryString('');
  }

  const handleSearch = () => {
    let text: string = ''
    score && (text += `&score=${score * 2}`);
    fromDate && (text += `&fromDate=${fromDate}`);
    toDate && (text += `&toDate=${toDate}`);
    mediaType && (text += `&mediaType=${mediaType}`);
    language && (text += `&language=${language}`);
    mediaContext?.setQueryString(text);
    mediaContext?.setCurrentAmount(1);
  }

  return (
    <div className='w-full h-16 flex items-center justify-center mb-5 z-10'>
      {/* filter menu */}
      <div className="hidden md:join">
        {/* Media Type */}
        <select
          id="mediaType"
          required
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className="select select-md outline-0 focus:outline-0 ">
          <option value={''}>Media Type</option>
          <option value={'movie'}>Movie</option>
          <option value={'serie'}>Serie</option>
          <option value={'anime'}>Anime</option>
          <option value={'videogame'}>Video Game</option>
          <option value={'book'}>Book</option>
        </select>

        {/* Language */}
        <select
          id="language"
          value={language}
          required
          className="select select-md outline-0 focus:outline-0"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value={''}>Language</option>
          <option value={'spanish'}>Spanish</option>
          <option value={'english'}>English</option>
          <option value={'sub-spanish'}>Sub-spanish</option>
        </select>

        {/* Score */}
        <input
          onChange={(e) => setScore(Number(e.target.value))}
          value={score ?? ''}
          className='input input-md w-52 focus:outline-0 '
          type='number'
          min={0}
          max={10}
          step={0.5}
          placeholder='Score (0-5)'
        />

        {/* Date */}
        <div className='join'>
          {/* From Date */}
          <div>
            <button popoverTarget="rdp-popover"
              onClick={() => setFromShowDate(true)}
              className="input input-border focus:outline-0 cursor-pointer" style={{ anchorName: "--rdp" } as React.CSSProperties}>
              {fromDate ? fromDate : 'From Date'}
            </button>
            <div popover="auto" id="rdp-popover" className={` ${showFromDate ? "dropdown" : "hidden"}`} style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
              <DayPicker
                className="react-day-picker"
                mode="single"
                selected={new Date()}
                onSelect={e => {
                  setFromDate(e?.toISOString().split('T')[0])
                  setFromShowDate(false);
                }}
              />
            </div>
          </div>

          {/* To Date */}
          <div>
            <button popoverTarget="rdp-popover2"
              onClick={() => setToShowDate(true)}
              className="input input-border focus:outline-0 cursor-pointer" style={{ anchorName: "--rdp" } as React.CSSProperties}>
              {toDate ? toDate : 'To Date'}
            </button>
            <div popover="auto" id="rdp-popover2" className={` ${showToDate ? "dropdown" : "hidden"}`} style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
              <DayPicker
                className="react-day-picker"
                mode="single"
                selected={new Date()}
                onSelect={e => {
                  setToDate(e?.toISOString().split('T')[0])
                  setToShowDate(false);
                }}
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="indicator">
          <button
            onClick={handleSearch}
            className="btn join-item btn-dash btn-info"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            Search</button>
        </div>
        {/* Clear Filters Button */}
        {
          (mediaContext?.queryString !== '') &&
          <button
            onClick={clearFilters}
            className="btn join-item btn-dash btn-error">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

            Clean Filters</button>
        }
      </div>

      {/* Filter Dropdown */}
      <div className="drawer md:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content w-full flex items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn btn-dash btn-info w-64">Filters</label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p- gap-y-4">
            {/* Sidebar content here */}
            <li>
              <select
                id="mediaType"
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
                className="select select-md outline-0 focus:outline-0 ">
                <option className={`bg-gray-900`} value={''}>Media Type</option>
                <option className={`bg-gray-900`} value={'movie'}>Movie</option>
                <option className={`bg-gray-900`} value={'serie'}>Serie</option>
                <option className={`bg-gray-900`} value={'anime'}>Anime</option>
                <option className={`bg-gray-900`} value={'videogame'}>Video Game</option>
                <option className={`bg-gray-900`} value={'book'}>Book</option>
              </select>
            </li>
            <li>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="select select-md outline-0 focus:outline-0"
              >
                <option className={`bg-gray-900`} value={''}>Language</option>
                <option className={`bg-gray-900`} value={'spanish'}>Spanish</option>
                <option className={`bg-gray-900`} value={'english'}>English</option>
                <option className={`bg-gray-900`} value={'sub-spanish'}>Sub-spanish</option>
              </select>
            </li>

            <li><input type='number' onChange={e => setScore(Number(e.target.value))} className='input' min={0} max={10} step={0.5} placeholder='Score (0-5)' /></li>

            <li>
              <button popoverTarget="rdp-popover-dropdown"
                onClick={() => setFromShowDate(true)}
                className="input input-border focus:outline-0 cursor-pointer"
                style={{ anchorName: "--rdp" } as React.CSSProperties}>
                {fromDate ? fromDate : 'From Date'}
              </button>
              <div popover="auto" id="rdp-popover-dropdown" className={` ${showFromDate ? "dropdown" : "hidden"}`} style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
                <DayPicker
                  className="react-day-picker"
                  mode="single"
                  selected={new Date()}
                  onSelect={e => {
                    setFromDate(e?.toISOString().split('T')[0])
                    setFromShowDate(false);
                  }}
                />
              </div>
            </li>

            <li>
              <button popoverTarget="rdp-popover2-dropdown"
                onClick={() => setToShowDate(true)}
                className="input input-border focus:outline-0 cursor-pointer" style={{ anchorName: "--rdp" } as React.CSSProperties}>
                {toDate ? toDate : 'To Date'}
              </button>
              <div popover="auto" id="rdp-popover2-dropdown" className={` ${showToDate ? "dropdown" : "hidden"}`} style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
                <DayPicker
                  className="react-day-picker"
                  mode="single"
                  selected={new Date()}
                  onSelect={e => {
                    setToDate(e?.toISOString().split('T')[0])
                    setToShowDate(false);
                  }}
                />
              </div>
            </li>

            <li>
              <button
                onClick={handleSearch}
                className="btn join-item btn-dash btn-info"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                Search</button>
            </li>
            {
              (mediaContext?.queryString !== '') &&
              <li>

                <button
                  onClick={clearFilters}
                  className="btn join-item btn-dash btn-error">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>

                  Clean Filters</button>
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
