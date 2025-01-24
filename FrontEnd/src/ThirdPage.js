
import {openDB} from 'idb'


const formSubmission=async (e,mBox)=>{
  e.preventDefault()
  const createDB=await openDB('formsDB',1)

  const writeTransation=createDB.transaction('Features','readwrite')

  await Promise.all([
    writeTransation.store.put({
      id:1,
      feature1:document.getElementById('f1').value,
      feature2:document.getElementById('f2').value,
      feature3:document.getElementById('f3').value,
      feature4:document.getElementById('f4').value,
    }),
    writeTransation.done
  ])

  mBox.current.classList.replace('notVisible','visible')
  setTimeout(() => {
    mBox.current.classList.replace('visible','notVisible')
  }, 2000)
}

export default function Page3({mBox}) {
  return(
    <form className="inputBoxes" id="featureBox"
    onSubmit={(element)=>{formSubmission(element,mBox)}}>
      <h2>Explain the features of your product</h2>

      <label htmlFor="f1">Feature 1*</label>
      <input type="text" id="f1" required/>

      <label htmlFor="f2">Feature 2</label>
      <input type="text" id="f2"/>

      <label htmlFor="f3">Feature 3</label>
      <input type="text" id="f3"/>

      <label htmlFor="f4">Feature 4</label>
      <input type="text" id="f4"/>

      <button>Save</button>
    </form>
  )
}