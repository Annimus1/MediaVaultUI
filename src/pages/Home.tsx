import Catalog from '../components/Catalog';
import Navigation from '../components/Navigation';
import type { ReactNode } from 'react';
import Pagination from '../components/Pagination';
import { MediaProvider } from '../context/MediaContext';

function Home(): ReactNode {
  return (
    <MediaProvider>
      <div className='max-w-dvw flex flex-col items-center justify-center gap-4 overflow-x-hidden'>
        <Navigation />
        <div className='min-h-[48rem]'>
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