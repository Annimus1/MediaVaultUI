import AddMediaForm from "../components/AddMediaForm";
import Navigation from "../components/Navigation";

export default function AddMedia() {
  document.title = 'Media Vault - Add Media';
  return (
    <div className="flex flex-col min-h-screen max-w-screen overflow-x-hidden">
      <Navigation />
      <div className='flex flex-col items-center  min-h-screen bg-base-100 p-4'>
        <AddMediaForm />
      </div>
    </div>
  )
}
