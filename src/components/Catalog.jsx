import React from 'react'
import CardComponent from './CardComponent'
import CardComponentScheleton from './CardComponentScheleton'

function Catalog() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 gl:gap-4 xl:grid-cols-4 xl:gap-6'> 
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