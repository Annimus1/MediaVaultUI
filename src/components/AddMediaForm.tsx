import React from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { DayPicker } from "react-day-picker";

export default function AddMediaForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState({ error: false, message: "" });
  const [name, setName] = React.useState<string>("");
  const [completedDate, setCompletedDate] = React.useState<Date | undefined>(undefined);
  const [ showDatePicker, setShowDatePicker ] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);
  const [poster, setPoster] = React.useState<string>("");
  const [mediaType, setMediaType] = React.useState<string>("movie");
  const [language, setLanguage] = React.useState<string>("Spanish");
  const [comment, setComment] = React.useState<string | null>("");

  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();

  const postData = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!name || !completedDate || !score || !poster || !mediaType || !language) {
      setError({ error: true, message: "Please fill in all required fields." });
      setTimeout(() => {
        setError({ error: false, message: "" });
      }, 3000);
      return;
    }

    setIsLoading(true);
    if (!comment) {
      setComment(null);
    }

    const data = {
      name: name,
      completedDate: `${completedDate?.getFullYear()}-${(completedDate?.getMonth() ?? 0) + 1}-${completedDate?.getDate()}`,
      score: score,
      poster: poster,
      mediaType: mediaType,
      language: language,
      comment: comment
    }

    axios.post(import.meta.env.VITE_URL + '/addMedia', data, {
      headers: {
        'Authorization': `Bearer ${authContext?.token}`,
        'Content-Type': "application/json"
      }
    })
      .then(response => {
        console.log(response.status);
        if (response.status === 201) {
          setIsLoading(false);
          navigate("/");
        }
      })
      .catch(_error => {
        setIsLoading(false);
        setError({ error: true, message: "An error occurred while adding media." });
        setTimeout(() => {
          setError({ error: false, message: "" });
        }, 3000);
      });
  }

  const evaluatePoster = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urlPattern = new RegExp('https?://.+');
    if (urlPattern.test(e.target.value)) {
      setPoster(e.target.value);
      setError({ error: false, message: "" });
    } else {
      setError({ error: true, message: "Please enter a valid URL starting with http:// or https://" });
      setTimeout(() => {
        setError({ error: false, message: "" });
      }, 3000);
    }
  }

  const evaluateScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0 || value > 10) {
      setError({ error: true, message: "Score must be between 0 and 10." });
      setTimeout(() => {
        setError({ error: false, message: "" });
      }, 3000);
      return;
    }
    setScore(value);
  }

  return (
    <div className={`${error.error ? "tooltip tooltip-open tooltip-error" : null}`} data-tip={error.message}>

      <form className="w-xs fieldset bg-base-200 border-base-300 rounded-box border p-4 md:w-lg lg:w-xl xl:w-[38rem]">
        <legend className="fieldset-legend text-3xl">Add new Media</legend>

        <label htmlFor='name' className="label text-xl ">Name</label>
        <input id="name" required type="text" onChange={e => (setName(e.target.value))} className="input text-md outline-0 focus:outline-0 md:w-md lg:w-lg xl:w-xl" placeholder="Title of the media" />

        <label htmlFor="completedDate" className="label text-xl">Completed Date</label>
        <p className="label">This is the date you completed the media</p>
        <input
          id="completedDate"
          type="text"
          onFocus={() => setShowDatePicker(true)}
          readOnly
          value={completedDate ? completedDate.toLocaleDateString() : ""}
          className="input text-md outline-0 focus:outline-0 md:w-md lg:w-lg xl:w-xl cursor-pointer"
          placeholder="Select date"
          
        />
        <div className={`relative ${showDatePicker ? "mb-4" : "hidden"}`}>
          <DayPicker required className="react-day-picker" mode="single" selected={completedDate} onSelect={(e) => {
            setCompletedDate(e)
            setShowDatePicker(false);
            } } />
        </div>

        <label htmlFor="score" className="label text-xl">Score</label>
        <input
          id="score"
          required
          type="number"
          min={0}
          max={10}
          step={0.1}
          onChange={e => (evaluateScore(e))}
          className="input text-md outline-0 focus:outline-0 md:w-md lg:w-lg xl:w-xl"
          placeholder="Score (0-10)"
        />

        <label htmlFor='poster' className="label text-xl">Poster</label>
        <input
          id="poster"
          required
          type="text"
          pattern="https?://.+"
          title="Please enter a valid URL starting with http:// or https://"
          onChange={(e) => evaluatePoster(e)}
          className="input text-md outline-0 focus:outline-0 md:w-md lg:w-lg xl:w-xl"
          placeholder="Link to poster"
        />

        <label htmlFor={'mediaType'} className="label text-xl ">Media Type</label>
        <select
          id="mediaType"
          defaultValue="Movie"
          required
          onChange={e => (setMediaType(e.target.value))}
          className="select select-md outline-0 focus:outline-0 md:w-md lg:w-lg xl:w-xl">
          <option value={'movie'}>Movie</option>
          <option value={'serie'}>Serie</option>
          <option value={'anime'}>Anime</option>
          <option value={'videogame'}>Video Game</option>
          <option value={'book'}>Book</option>
        </select>

        <label htmlFor="language" className="label text-xl">Language</label>
        <select
          id="language"
          defaultValue="Spanish"
          required
          onChange={e => (setLanguage(e.target.value))}
          className="select select-md outline-0 focus:outline-0 md:w-md lg:w-lg xl:w-xl"
        >
          <option value={'spanish'}>Spanish</option>
          <option value={'english'}>English</option>
          <option value={'sub-spanish'}>Sub-spanish</option>
        </select>

        <fieldset className="fieldset">
          <label htmlFor="comment" className="label text-xl">Comment</label>
          <textarea id="comment" onChange={e => (setComment(e.target.value))} className="textarea h-24 md:w-md lg:w-lg xl:w-xl outline-0 focus:outline-0" placeholder="comment"></textarea>
          <div className="label">Optional</div>
        </fieldset>


        <button onClick={(event) => postData(event)} className="btn btn-primary mt-4 text-xl">
          Submit {isLoading ? <span className="loading loading-bars loading-xl"></span> : ""}
        </button>
        <div className="w-full flex justify-between">
          <Link to="/" className="btn btn-secondary mt-4 text-xl">Cancel</Link>
          <button
            onClick={() => {
              setName("");
              setCompletedDate(undefined);
              setScore(0);
              setPoster("");
              setMediaType("");
              setLanguage("");
              setComment("");
              document.querySelectorAll("input").forEach(input => {
                (input as HTMLInputElement).value = "";
              });
              document.querySelectorAll("textarea").forEach(textarea => {
                (textarea as HTMLTextAreaElement).value = "";
              });
            }}
            className="btn btn-ghost mt-4 text-xl">
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
