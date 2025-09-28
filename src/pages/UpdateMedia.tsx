import { useContext, useEffect, useState } from "react";
import AddMediaForm from "../components/AddMediaForm";
import Navigation from "../components/Navigation";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function UpdateMedia() {
  const authContext = useContext(AuthContext);
  const {id} = useParams();
  const [display, SetDisplay] = useState<boolean>(false);
  const [Props, setProps] = useState<fetchTypes>({ name:"Desde el Padre", completedDate:"", score:0, poster:"", 
  mediaType:"movie", language:"Spanish", comment:"", _id:id})


  interface fetchTypes {
    comment:string,
    completedDate:string,
    language:string,
    mediaType:string
    name:string,
    poster: string,
    score: number,
    _id: string | undefined
  }

  async function handleFetch(){ 
    try{
      const response = await axios.get<fetchTypes>(import.meta.env.VITE_URL + `/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authContext?.token}`
        }
      });

      setProps({name : response.data.name,
      comment : response.data.comment || "",
      completedDate : response.data.completedDate.split('T')[0],
      language : response.data.language,
      mediaType: response.data.mediaType,
      poster: response.data.poster,
      score: response.data.score,
      _id: id
      });
      
      SetDisplay(true);
    }
    catch (error) {
      console.error(error);

    }
  }

  useEffect(()=>{
    handleFetch();
  },[])

  document.title = 'Media Vault - Update Media';
  return (
    <div className="flex flex-col min-h-screen max-w-screen overflow-x-hidden">
      <Navigation />
      <div className='flex flex-col items-center  min-h-screen bg-base-100 p-4'>
        { display && 

        <AddMediaForm name={Props.name} comment={Props.comment} poster={Props.poster} _id={id} 
        completedDate={new Date(Props.completedDate)} score={Props.score} mediaType={Props.mediaType} language={Props.language}/>
        }
      </div>
    </div>
  )
}
