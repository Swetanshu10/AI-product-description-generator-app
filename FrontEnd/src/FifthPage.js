

const textFormatting=(text)=>{
    const textArray=text.split('\n')
    const textWithNoWhiteLine=[]

    for(const line of textArray){
        if(line!==""){
            textWithNoWhiteLine.push(line)
        }
    }

    return textWithNoWhiteLine.map((line,index)=>(
        <p key={index}>{line}</p>
    ))
}

export default function Page5({finalOutput}){

    formattedText=textFormatting(finalOutput)
    return( 
        <article id="responseBox">
            {formattedText}
        </article>  
    )
}