import { useState,useCallback,useEffect,useRef} from 'react'
import './index.css'

function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword]=useState("")

  //useref hook

  const passRef=useRef(null)

  const passGenerator=useCallback(()=>{
      let pass=" "
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numberAllowed){
        str=str+"123456789"
      }
      if(charAllowed){
        str=str+"!@#$%^&*()_-+=}{][><?"
      }
      for (let i = 1; i <length; i++) {
      let char =Math.floor((Math.random()*str.length)+1)
        pass+=str.charAt(char)
      }
      setPassword(pass);
  } ,
  [length,numberAllowed,charAllowed,setPassword])


  const copyPasswordToClipboard = useCallback(()=>{
    passRef.current?.select();
    // passRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password)
  },[password])

    useEffect(()=>{
      passGenerator()
    },[length,numberAllowed,charAllowed,passGenerator])

  return (
    <>
     <div className='menu'>
     <h1>Password Generator</h1>
     
     <div className='inputFields'>
      <input type="text" 
      value={password} id="inputpass" placeholder='Password' readOnly
      ref={passRef}/>
      <button 
      onClick={copyPasswordToClipboard}
      id='btn'>Copy</button>
     </div>
     <div id='texts'>
        <div id='text2'>
          <input type="range"
          min={6}
          max={99}
           id='range'
           onChange={(e)=>{setLength(e.target.value)}} />
           <label> Length:{length}</label>
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <input type="checkbox" id="numberInput" 
            defaultChecked={numberAllowed}
            onChange={()=>{
              setNumberAllowed((prev=>!prev));
            }}/>
            <label id="numberInput">Numbers</label>
          </div>
          <div style={{display:'flex'}}>
              <input
               type="checkbox" 
               id="numberInput"
              defaultChecked={charAllowed}
              onChange={()=>{
                setCharAllowed((prev)=>!prev);
              }} />
              <label id="numberInput">Characters</label>
          </div>
     </div>
     </div>
    </>
  )
}

export default App
