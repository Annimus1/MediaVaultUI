import React from 'react'
import Navigation from '../components/Navigation';
import Catalog from '../components/Catalog';
import Pagination from '../components/Pagination';

function Home() {
  return (
    <div className='w-full'>
      <Navigation />
      <Catalog />
      <footer className='w-full flex justify-center mb-5'>
        <Pagination />
      </footer>
    </div>
  )
}

export default Home;