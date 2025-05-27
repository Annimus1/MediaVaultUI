import React from 'react'
import CardComponent from './CardComponent'
import CardComponentScheleton from './CardComponentScheleton'

function Catalog() {
  return (
    <div className='max-w-full md:p-2 lg:p-4 xl:p-8 grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-6'> 
     <CardComponentScheleton/>
     <CardComponentScheleton/>
     <CardComponentScheleton/>
     <CardComponentScheleton/>
     <CardComponent/>
     <CardComponent/>
     <CardComponent/>
     <CardComponent/>
     <CardComponent/>
    </div> 
  )
}

export default Catalog;