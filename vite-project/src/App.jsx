import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Card from './components/card.jsx'

function App() {
  const [counter, setCounter] = useState(10)
   
  let myObj  = {
    name : "chinmay",
    age : 22
  }
  
  return (
    <>
     <Card username = "cashinvoice"></Card>
     <Card username = 'chinmay'></Card>
    </>
  )
}

export default App
