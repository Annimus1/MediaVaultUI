import AddMediaForm from "../components/AddMediaForm";
import Navigation from "../components/Navigation";

export default function AddMedia() {
  document.title = 'Media Vault - Add Media';
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navigation />
      <main className="flex flex-1 justify-center px-4 py-8 sm:px-6 lg:py-12">
        <AddMediaForm name="" score={0} poster="" language="spanish" mediaType="movie" comment=""
        completedDate={undefined} _id="" />
      </main>
    </div>
  )
}
