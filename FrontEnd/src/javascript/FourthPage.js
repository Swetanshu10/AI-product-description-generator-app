
const textFormatting=(text)=>{
    const textArray=text.split('\n')
    return textArray.map((line,index)=>{
        if(line!==""){
            return <p key={index}>{line}</p> 
        }
    })
}
const copyFunction=(Text)=>{
    if('clipboard' in navigator){
        navigator.clipboard.writeText(Text)
        .then(()=>{
            alert("Text copied to clipboard")
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

async function createTXT(text){
    
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'generated-document.txt'
    a.click()

    // Clean up
    URL.revokeObjectURL(url)
   
}

export default function Page4({finalOutput}){

    let formattedText=textFormatting(finalOutput)
    return( 
        <section id="outputSection">
            <article id="responseBox">
                {formattedText}
            </article>  
            <section id="outputControl">
                <button
                onClick={()=>{copyFunction(finalOutput)}} title="Copy to clipboard">
                    <svg className="outputSVG" id="copyIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>
                    Copy to clipboard
                </button>
                <button
                onClick={()=>{createTXT(finalOutput)}} title="Download as PDF">
                    <svg className="outputSVG" id="downloadIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                    Download as text file
                </button>
            </section>
        </section>
    )
}