import React from 'react'


//  label: String,
//  icon: SVGElement,
//  action?: Function


function BtnCustom({label, icon, action}) {
  return (
    <button className="btn">
      {icon}
      {label}
    </button>
  )
}

export default BtnCustom;