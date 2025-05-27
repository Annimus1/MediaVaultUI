import React from 'react'
import Navigation from '../components/Navigation';
import Catalog from '../components/Catalog';
import Pagination from '../components/Pagination';

function Home() {
  return (
    <>
      <Navigation />
      <Catalog />
      <footer className='w-full flex justify-center mb-5'>
        <Pagination />
      </footer>
    </>
  )
}

export default Home;