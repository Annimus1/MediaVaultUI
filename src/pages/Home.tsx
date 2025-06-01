import Catalog from '../components/Catalog';
import Navigation from '../components/Navigation';
import type { ReactNode } from 'react';
import Pagination from '../components/Pagination';

function Home():ReactNode {
  return (
    <div className='w-full'>
      <Navigation />
      <Catalog/>
      <footer className='w-full flex justify-center mb-5'>
        <Pagination/>
      </footer>
    </div>
  )
}

export default Home;