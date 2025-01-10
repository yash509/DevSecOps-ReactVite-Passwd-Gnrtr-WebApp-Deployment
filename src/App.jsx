import { useState, useCallback, useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length , setLength] = useState(8);
  const [numAllowed , setNumAllowed] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed){
      str += "0123456789";
    }
    if(specialChar){
      str += "!@#$%^&*()_+{}<>?/";
    }

    for(let i=1;i<=length;i++){
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass); 

  }, [length, numAllowed, specialChar,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    alert("Password Copied")
  }, [password])

  useEffect(()=>{
    passwordGenerator();
  }, [length, numAllowed, specialChar, passwordGenerator ])

  return (
    <>
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-4 my-8 text-orange-500 bg-gray-700'>
    <h1 className='text-4xl text-center text-white my-4'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3 my-10 ml-4 rounded-xl' placeholder='Password' readOnly ref={passwordRef} />
        <button className='outline-none bg-blue-700 px-3 shrink-0 my-10 mr-4 rounded-lg ml-2' onClick={copyPasswordToClipboard }>Copy</button>
      </div>
      <div className='flex test-sm gap-x-2'> 
        <input type="range" min={6} max ={100}  value={length} className='cursor-pointer' onChange={(e)=>{
          setLength(e.target.value)
        }}/>
        <label  >Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
          defaultChecked={numAllowed}
          id="numInp"
          onChange={()=>{
            setNumAllowed((prev) => !prev)
          }}
        />
        <label >Numbers</label>
        <input type="checkbox" 
          defaultChecked={specialChar}
          id="chara"
          onChange={()=>{
            setSpecialChar((prev) => !prev)
          }}
        />
        <label>Special Char</label>
      </div>
    </div>
    </>
  )
}

export default App
