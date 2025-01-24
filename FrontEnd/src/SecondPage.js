
import {openDB} from 'idb'

const formSubmission=async (e,mBox)=>{
  e.preventDefault()

  const createDB=await openDB('formsDB',1)
  const writeTransaction=createDB.transaction('painPoints','readwrite')

  await Promise.all([
    writeTransaction.store.put({
      id:1,
      painPoint1:document.getElementById('pp1').value,
      painPoint2:document.getElementById('pp2').value,
      painPoint3:document.getElementById('pp3').value,
      painPoint4:document.getElementById('pp4').value,
    }),
    writeTransaction.done
  ])

  mBox.current.classList.replace('notVisible','visible')
  setTimeout(() => {
    mBox.current.classList.replace('visible','notVisible')
  }, 2000)
}

export default function Page2({mBox}) {
  return(
    <form className="inputBoxes" id="painPoints"
    onSubmit={(element)=>{formSubmission(element,mBox)}}>

      <h2>Explain the benefits of using your product</h2>
      <label htmlFor="pp1">Benefit 1*</label>
      <input type="text" id="pp1" required/>

      <label htmlFor="pp2">Benefit 2</label>
      <input type="text" id="pp2"/>

      <label htmlFor="pp3">Benefit 3</label>
      <input type="text" id="pp3"/>

      <label htmlFor="pp4">Benefit 4</label>
      <input type="text" id="pp4"/>

      <button>Save</button>
    </form>
  )
}