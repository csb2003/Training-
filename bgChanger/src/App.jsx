import { useState,useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState("8")
  const [numsallowed, setNumsallowed] = useState(false)
  const [charsallowed, setCharsallowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)
  const copyButtonRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numsallowed) str += "0123456789"
    if (charsallowed) str += "!@#$%^&*()_+}{~|?><"

    for (let i = 0; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
  

    setPassword(pass)
    // if (copyButtonRef.current) {
    //   copyButtonRef.current.textContent = "Copy";
    // }
  }, [length,numsallowed,charsallowed,setPassword])

  const copyToClipboard = useCallback(()=>{

    passwordRef.current.select()
    console.log(copyButtonRef.current.textContent)
    copyButtonRef.current.textContent = "Copied!"
    window.navigator.clipboard.writeText(password)

  },[password])

  useEffect(()=>{ passwordGenerator() }, [length,numsallowed,charsallowed,setPassword])

  // Reset button text whenever password changes
  useEffect(() => {
    if (copyButtonRef.current) {
      copyButtonRef.current.textContent = "Copy";
    }
  }, [password]); // This runs whenever password state changes

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-pretty text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 "
            placeholder="Password"          
            readOnly
            ref = {passwordRef}
        />
        <button onClick={copyToClipboard} ref = {copyButtonRef} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type = "range"
              min = {6}
              max ={20}
              value = {length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type = "checkbox"
              defaultChecked = {numsallowed}
              id = "numberIput"
              onChange={()=>{setNumsallowed((prev)=> !prev)}}
            />
            <label htmlFor='numberIput'>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type = "checkbox"
              defaultChecked = {charsallowed}
              id = "charsIput"
              onChange={()=>{setCharsallowed((prev)=> !prev)}}
            />
            <label htmlFor='charsIput'>Characters</label>
          </div>

        </div>

        

      </div>
    </>
  )
}

export default App
