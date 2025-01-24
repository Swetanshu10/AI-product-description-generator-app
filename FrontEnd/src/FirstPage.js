import { useRef } from "react"
import {openDB} from 'idb'

const formSubmission= async (e,mBox)=>{
  e.preventDefault()
  const images=document.querySelectorAll('.imgInput')

  const createDB=await openDB('formsDB',1)
  const writeTransaction=createDB.transaction('imageData','readwrite')

  await Promise.all([
    writeTransaction.store.put(
      {
        id:1,
        image1:images[0].files[0],
        image2:images[1].value!==""?images[1].files[0]:"",
        image3:images[2].value!==""?images[2].files[0]:"",
        image4:images[3].value!==""?images[3].files[0]:""
      }
    ),
    writeTransaction.done 
  ])
  
  mBox.current.classList.replace('notVisible','visible')
  setTimeout(() => {
    mBox.current.classList.replace('visible','notVisible')
  }, 2000)

}

export default function Page1({mBox}) {
    return(
      <form id="f1Container" className="inputBoxes"
      onSubmit={(element)=>{formSubmission(element,mBox)}}>
        <h2>Upload images of your product</h2>
        <p>Only png, jpeg/jpg and webp formats are supported</p>
        <label htmlFor="img1">Upload 1st image*</label>
        <input type="file" className="imgInput" name="img1" id="img1" required accept="image/*" />
  
        <label htmlFor="img2">Upload 2nd image</label>
        <input type="file" className="imgInput" name="img2" id="img2" accept="image/*" />
  
        <label htmlFor="img3">Upload 3rd image</label>
        <input type="file" className="imgInput" name="img3" id="img3" accept="image/*" />
  
        <label htmlFor="img4">Upload 4th image</label>
        <input type="file" className="imgInput" name="img4" id="img4" accept="image/*" />

        <button>Save</button>
      </form>
    )
}