
import {openDB} from 'idb'
import Page5 from "./FifthPage.js"
import { useState } from 'react'


const generateResponse=async (formData)=>{
  let jsonData,data

  try{
    await fetch('http://127.0.0.1:5000',{
      method:'POST',
      body:formData
    })
    .then((response)=>{
      jsonData=response
    })
  
    await jsonData.json()
    .then((response2)=>{
      data=response2
    })
  
    return data.message
  }
  catch{
    return "Something went wrong"
  }
}


const prepareOutput=async (e,progressRef)=>{
  e.preventDefault()
  progressRef.current.classList.replace('notVisible','visible')
  const formData=new FormData()
  const createDb=await openDB('formsDB',1)

  const readTransaction1=createDb.transaction('imageData','readonly')
  let cursor1=await readTransaction1.store.openCursor(),dataAvailable1=false

  while(cursor1){
    const data=cursor1.value
    dataAvailable1=true
    formData.append('Images',data['image1'])
    formData.append('Images',data['image2'])
    formData.append('Images',data['image3'])
    formData.append('Images',data['image4'])
    cursor1=await cursor1.continue()
  }

  if(!dataAvailable1){
    alert("Please upload atleast one image of your product")
    progressRef.current.classList.replace('visible','notVisible')
    return ''
  }
  await readTransaction1.done

  const readTransaction2=createDb.transaction('painPoints','readonly')
  let cursor2=await readTransaction2.store.openCursor(),dataAvailable2=false

  while(cursor2){
    const data=cursor2.value
    dataAvailable2=true
    formData.append('PainPoints',data['painPoint1'])
    formData.append('PainPoints',data['painPoint2'])
    formData.append('PainPoints',data['painPoint3'])
    formData.append('PainPoints',data['painPoint4'])
    cursor2=await cursor2.continue()
  }

  if(!dataAvailable2){
    alert("Please specify atleast one pain point")
    progressRef.current.classList.replace('visible','notVisible')
    return ''
  }
  await readTransaction2.done

  const readTransaction3=createDb.transaction('Features','readonly')
  let cursor3=await readTransaction3.store.openCursor(),dataAvailable3=false

  while(cursor3){
    const data=cursor3.value
    dataAvailable3=true
    formData.append('Features',data['feature1'])
    formData.append('Features',data['feature2'])
    formData.append('Features',data['feature3'])
    formData.append('Features',data['feature4'])
    cursor3=await cursor3.continue()
  }

  if(!dataAvailable3){
    alert("Please specify atleast one feature")
    progressRef.current.classList.replace('visible','notVisible')
    return ''
  }
  await  readTransaction3.done

  const languageOptions=document.querySelectorAll('select')

  if(languageOptions[0].value!==languageOptions[1].value
    && languageOptions[0].value!==languageOptions[2].value
    && languageOptions[0].value!==languageOptions[3].value
    && languageOptions[1].value!==languageOptions[2].value
    && languageOptions[1].value!==languageOptions[3].value
    && languageOptions[2].value!==languageOptions[3].value
  ){
    for(let i=0;i<languageOptions.length;i++){
      formData.append('Languages',languageOptions[i].value)
    }
  }
  else{
    alert("Please select different languages for the product description")
    progressRef.current.classList.replace('visible','notVisible')
    return ''
  }
  
  let generatedAnswer=await generateResponse(formData)

  progressRef.current.classList.replace('visible','notVisible')
  alert("Response is generated, navigate to next section to view it")
  return generatedAnswer
}

export default function Page4({progressRef}) {
    const [serverData,setResponse]=useState('')

    return(
      <>
        <form className="inputBoxes" onSubmit={async (element)=>{
          let reply=await prepareOutput(element,progressRef)
          setResponse(reply)
        }}>
          <h2>Select languages you want the product description in</h2>
          <Languages/>
          <Languages/>
          <Languages/>
          <Languages/>
          <button id="Submit">Submit</button>
        </form>

        <FinalComponent isReady={serverData}/>
      </>
    )
}
  
function Languages(){
  return(
    <select title='language Options' name='language Options'>
      <option value="English">English</option>
      <option value="Arabic">Arabic</option>
      <option value="Afrikaans">Afrikaans</option>
      <option value="Assamese">Assamese</option>
      <option value="Bengali">Bengali</option>
      <option value="Croatian">Croatian</option>
      <option value="Danish">Danish</option>
      <option value="Dutch">Dutch</option>
      <option value="French">French</option>
      <option value="German">German</option>
      <option value="Greek">Greek</option>
      <option value="Gujarati">Gujarati</option>
      <option value="Hindi">Hindi</option>
      <option value="Indonesian">Indonesian</option>
      <option value="Italian">Italian</option>
      <option value="Japanese">Japanese</option>
      <option value="Korean">Korean</option>
      <option value="Kannada">Kannada</option>
      <option value="Malayalam">Malayalam</option>
      <option value="Marathi">Marathi</option>
      <option value="Odia">Odia</option>
      <option value="Punjabi">Punjabi</option>
      <option value="Polish">Polish</option>
      <option value="Portuguese">Portuguese</option>
      <option value="Russian">Russian</option>
      <option value="Spanish">Spanish</option>
      <option value="Swedish">Swedish</option>
      <option value="Thai">Thai</option>
      <option value="Tamil">Tamil</option>
      <option value="Telugu">Telugu</option>
    </select>
  )
}

function FinalComponent({isReady}){
  if(isReady!==''){
    return(
      <Page5 finalOutput={isReady}/>
    )
  }
}