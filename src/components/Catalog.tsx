import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";
import CardComponentScheleton from "./CardComponentScheleton";
import { MediaContext, type Media } from "../context/MediaContext";
import AddMediaBtn from "./AddMediaBtn";
import { AuthContext } from "../context/AuthContext";
import errorImage from '../assets/error.jpg';

interface fetchTypes {
  data: Media[];
  page: Page;
}
interface Page {
  currentPage: number;
  totalPages: number;
  nextPage: boolean;
  prevPage: boolean;
}

function Catalog() {
  const mediaContext = useContext(MediaContext);
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { media } = mediaContext || { media: [] };

  useEffect(() => {
    document.title = 'Media Vault - Home';
    setIsLoading(true);

    axios.get<fetchTypes>(import.meta.env.VITE_URL + '/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authContext?.token}`
      }
    })
      .then(response => {
        mediaContext?.updateMedia(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        try {

          if (error.response.status === 401) {
            setError('Unauthorized access. Please log in.');
            setIsLoading(false);
            // Redirect user to login page
            authContext?.logout();
          }
          if (error.response.status === 500) {
            setError('Internal server error. Please try again later.');
            setIsLoading(false);
          }

          else {
            setError('An error occurred while fetching data. Please try again later.');
            setIsLoading(false);
          }
        }
        catch (e) {
          setError('An unexpected error occurred. Please try again later.');
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <div className='max-w-full md:p-2 lg:p-4 xl:p-8 grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-6'>
      { // display loading skeletons
        isLoading && !error &&
        Array.from({ length: 10 }).map((_, index) => (
          <CardComponentScheleton key={index} />
        ))
      }

      { // dysplay media items
        media && !isLoading && !error &&
        media.map((item: Media) => (
          <CardComponent
            key={item.id}
            id={item.id}
            owner={item.owner}
            name={item.name}
            completedDate={item.completedDate}
            score={item.score}
            poster={item.poster}
            mediaType={item.mediaType}
            language={item.language}
            comment={item.comment}
          />
        ))
      }

      { // dysplay no media available message
        media.length === 0 && !isLoading && !error &&
        <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col items-center justify-center gap-4 p-4">
          <img src="https://cdn5.ludwig.guru/uploads/Group_46fb15b4ff.svg" alt="image" />
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-4xl text-accent">No media available.</p>
            <p className="text-center text-xl text-gray-300">Please add some media to your catalog.</p>
            <p className="text-center text-md text-gray-300">You can add media by clicking the "Add Media" button.</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <AddMediaBtn />
          </div>
        </div>
      }

      { // add media button
        media && !error && !isLoading &&
        <div className="w-96 flex flex-col items-center justify-center gap-4 p-4">
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <AddMediaBtn />
            <p className="text-2xl text-accent">Add new Media</p>
          </div>
        </div>
      }

      { // display error message
        error && !isLoading &&
        <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col items-center justify-center gap-4 p-4">
          <img  className="w-96 rounded-2xl" src={ errorImage } alt="Error Image" />
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-4xl text-red-500">Error fetching data.</p>
            <p className="text-center text-xl text-gray-300">{error}</p>
          </div>
        </div>
      }

    </div>
  )
}

export default Catalog;