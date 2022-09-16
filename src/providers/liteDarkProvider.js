import React , {createContext , useContext, useState} from 'react'

export const MainContext = createContext()

export default function LiteDarkProvider(props) {

    const [dark , setDark] = useState(false)

  return (
    <MainContext.Provider value={{dark,setDark}}>
        {props.children}
    </MainContext.Provider>
  )
}
