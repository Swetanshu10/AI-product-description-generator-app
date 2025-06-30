
import { useContext } from "react"
import productdata from "../context/context.js"

const formSubmission=async (e,retrievedState,mBox)=>{
  e.preventDefault()

  const sampleTextDescription=document.querySelector("#sampleDescription").value
  if(sampleTextDescription!==""){
    retrievedState.dataUpdate("sampleText",sampleTextDescription)
    return
  }
  const toneSelection=document.querySelector("#toneSelector").value
  const styleSelection=document.querySelector("#styleSelector").value

  retrievedState.dataUpdate("tone",toneSelection)
  retrievedState.dataUpdate("style",styleSelection)

  mBox.current.classList.replace('notVisible','Visible')
  setTimeout(() => {
    mBox.current.classList.replace('Visible','notVisible')
  }, 2000)
  
}

export default function Page2({mBox}) {
  const retrievedState=useContext(productdata)

  return(
    <form className="inputBoxes" id="featureBox"
    onSubmit={(element)=>{formSubmission(element,retrievedState,mBox)}}>
      <h2>Personalization & Customization*</h2>

      <h3>Select tone of the description</h3>
      <select title='toneSelector' id='toneSelector'>
        <option value="Formal">Formal</option>
        <option value="Informal">Informal</option>
        <option value="Persuasive">Persuasive</option>
      </select>

      <h3>Select style of the description</h3>
      <select title='styleSelector' id='styleSelector'>
        <option value="Creative">Creative</option>
        <option value="Technical">Technical</option>
        <option value="Problem/Solution oriented">Problem/Solution oriented</option>
      </select>

      <h3>OR</h3>

      <label htmlFor='sampleDescription'>Provide a sample description to copy its tone and style</label>
      <textarea id='sampleDescription'/>
      

      <button>Save</button>
    </form>
  )
}