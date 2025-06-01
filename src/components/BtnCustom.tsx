import { type ReactNode } from 'react'

type btnProps={
   label: String,
   icon: ReactNode,
   action?: Function
}


function BtnCustom({label, icon, action}:btnProps) {
  return (
    <button onClick={()=> action? action() : null} className="btn">
      {icon}
      {label}
    </button>
  )
}

export default BtnCustom;