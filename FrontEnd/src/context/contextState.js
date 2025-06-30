import productdata from "./context.js";
import { useState } from "react";

export default ContextHolder=(props)=>{
    const [currentData,modifyData]=useState({
        "benefits":"",
        "sampleText":"",
        "tone":"",
        "style":""
    })

    const dataUpdate=(property,value)=>{
        const currentState=currentData
        currentState[property]=value
        modifyData(currentState)
    }

    return(
        <productdata.Provider value={{currentData,dataUpdate}}>
            {props.children}
        </productdata.Provider>
    )
}