
import { useState, useCallback, useEffect,useRef } from 'react'

function App() {

  const [length,setlength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [Password,setPassword]=useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     
    

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+{}:[]"

    for(let i=1;i<=length;i++)
      {
        let char = Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(char)
      }

      setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPassowrdToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionReange(0,3)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(() =>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600">
    <h1 className="text-white text-center">Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
        type="text"
        value={Password}
        className="outline-none w-full py-1 px-3"
        placeholder="password"
        ref={passwordRef}
      />
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      onClick={copyPassowrdToClipboard}
      >Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type='range'
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setlength(e.target.value)}}
        />
        <label>length: {length}</label>
      
      </div>
    <div className='flex items-center gap-x-1'>
      <input type='checkbox'
      defaultChecked={numberAllowed}
      id="numberInput"
      onChange={()=>{
        setNumberAllowed((prev)=>!prev)
      }} />
      <label >Number </label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input type='checkbox'
      defaultChecked={charAllowed}
      id="characterInput"
      onChange={()=>{
        setCharAllowed((prev)=>!prev)
      }} />
      <label >character </label>
    </div>
    </div>
  </div>
</div>
 </>
  )
}

export default App
