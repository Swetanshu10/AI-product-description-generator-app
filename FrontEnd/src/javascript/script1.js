
import { createRoot } from "react-dom/client";
import MainContent from "./mainPage.js";
import { openDB } from "idb";

window.addEventListener('pageshow',async ()=>{
    const createDb=await openDB('formsDB',2,{
        upgrade(db){
            if(!db.objectStoreNames.contains('videoData')){
                db.createObjectStore('videoData',{keyPath:'id'})
            }
        }
    })
})

const main=document.querySelector('main')
const root=createRoot(main)
root.render(
    <MainContent/>
)
