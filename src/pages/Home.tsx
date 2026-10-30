import Catalog from '../components/Catalog';
import Navigation from '../components/Navigation';
import RecommendationCarousel from '../components/RecommendationCarousel';
import type { ReactNode } from 'react';
import Pagination from '../components/Pagination';
import { MediaProvider } from '../context/MediaContext';
import Filters from '../components/Filters';

function Home(): ReactNode {
  return (
    <MediaProvider>
      <div className='flex min-h-screen flex-col items-center gap-4 overflow-x-clip bg-slate-950'>
        <Navigation />
        <RecommendationCarousel />
        <Filters />
        <div className='min-h-[48rem] w-full'>
          <Catalog />
        </div>
        <footer className='w-full flex justify-center mb-5'>
          <Pagination />
        </footer>
      </div>
    </MediaProvider>
  )
}

export default Home;