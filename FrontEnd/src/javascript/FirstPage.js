import { useContext } from "react"
import {openDB} from 'idb'
import productdata from "../context/context.js"

const formSubmission= async (e,retrievedState,mBox)=>{
  e.preventDefault()
  const videos=document.querySelector('#vid1')
  const videoLink=document.querySelector('#youtubeLink')

  if(videos.files[0]===undefined && videoLink.value===""){
    alert("Please provide a video file or youtube link")
    return
  }

  const createDB=await openDB('formsDB',2)
  const writeTransaction=createDB.transaction('videoData','readwrite')

  await Promise.all([
    writeTransaction.store.put(
      {
        id:1,
        video1:videos.files[0]!==undefined?videos.files[0]:videoLink.value,
      }
    ),
    writeTransaction.done 
  ])

  const benefitsDescription=document.querySelector("#benefits").value
  retrievedState.dataUpdate("benefits",benefitsDescription)
  
  mBox.current.classList.replace('notVisible','Visible')
  setTimeout(() => {
    mBox.current.classList.replace('Visible','notVisible')
  }, 2000)

}

export default function Page1({mBox}) {
    const retrievedState=useContext(productdata)

    return(
      <form id="f1Container" className="inputBoxes"
      onSubmit={(element)=>{formSubmission(element,retrievedState,mBox)}}>
        <h2>Details of your product</h2>
        <label htmlFor="vid1">Upload product demo video (MP4 Format, max 2 minutes duration)*</label>
        <input type="file" className="videoInput" id="vid1" accept="video/*" />
        <p>OR</p>
        <label htmlFor="youtubeLink">Provide a youtube link(public, max 2 minutes duration)*</label>
        <input id="youtubeLink" type="text"/>

        <label htmlFor="benefits">Explain benefits of the product*</label>
        <textarea id="benefits" required/>

        <button>Save</button>
      </form>
    )
}