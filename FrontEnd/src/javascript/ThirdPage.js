
import {openDB} from 'idb'
import Page4 from "./FourthPage.js"
import { useState, useContext } from 'react'
import productdata from '../context/context.js'


const generateResponse=async (formData)=>{
  let jsonData,data

  try{
    await fetch('http://127.0.0.1:5000/generateDescription',{
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


const prepareOutput=async (e,retrievedData,progressRef)=>{
  e.preventDefault()
  progressRef.current.classList.replace('notVisible','Visible')
  const formData=new FormData()
  const createDb=await openDB('formsDB',2)

  const readTransaction1=createDb.transaction('videoData','readonly')
  let cursor1=await readTransaction1.store.openCursor(),dataAvailable1=false

  while(cursor1){
    const data=cursor1.value
    dataAvailable1=true
    formData.append('Video',data['video1'])
    cursor1=await cursor1.continue()
  }

  if(!dataAvailable1){
    alert("Please upload video demo of your product")
    progressRef.current.classList.replace('visible','notVisible')
    return ''
  }
  await readTransaction1.done

  if(retrievedData["benefits"]===""){
    alert("Please list out benefits of using your product")
    progressRef.current.classList.replace('Visible','notVisible')
    return ''
  }
  else{
    formData.append('Benefits',retrievedData["benefits"])
  }

  if(retrievedData["sampleText"]==="" && retrievedData["tone"]==="" && retrievedData["style"]===""){
    alert("Please select tone and style or paste a sample text to copy its tone and style")
    progressRef.current.classList.replace('Visible','notVisible')
    return ''
  }

  if(retrievedData["sampleText"]!==""){
    formData.append('SampleText',retrievedData["sampleText"])
    formData.append('Tone',"")
    formData.append('Style',"")
  }
  else if(retrievedData["sampleText"]===""){
    formData.append('SampleText',"")
    formData.append('Tone',retrievedData["tone"])
    formData.append('Style',retrievedData["style"])
  }


  const languageOptions=document.querySelectorAll('.languageOptions')

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
    progressRef.current.classList.replace('Visible','notVisible')
    return ''
  }
  
  let generatedAnswer=await generateResponse(formData)

  progressRef.current.classList.replace('Visible','notVisible')
  alert("Response is generated, navigate to next section to view it")
  return generatedAnswer
}

export default function Page3({progressRef}) {
    const [serverData,setResponse]=useState('')
    const retrievedState=useContext(productdata)


    return(
      <>
        <form className="inputBoxes" onSubmit={async (element)=>{
          let reply=await prepareOutput(element,retrievedState.currentData,progressRef)
          setResponse(reply)
        }}>
          <h2>Select languages you want the product description in</h2>
          <Languages/>
          <Languages/>
          <Languages/>
          <Languages/>
          <button id="Submit">Submit</button>
        </form>

        <FinalComponent description={serverData}/>
      </>
    )
}
  
function Languages(){
  return(
    <select title='language Options' name='language Options' className='languageOptions'>
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

function FinalComponent({description}){
  if(description!==''){
    return(
      <Page4 finalOutput={description}/>
    )
  }
}