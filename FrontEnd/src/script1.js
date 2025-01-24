import React from "react";
import { createRoot } from "react-dom/client";
import MainContent from "./mainPage.js";
import { openDB } from "idb";

window.addEventListener('pageshow',async ()=>{
    const createDb=await openDB('formsDB',1,{
        upgrade(db){
            if(!db.objectStoreNames.contains('imageData')){
                db.createObjectStore('imageData',{keyPath:'id'})
            }
            if(!db.objectStoreNames.contains('painPoints')){
                db.createObjectStore('painPoints',{keyPath:'id'})
            }
            if(!db.objectStoreNames.contains('Features')){
                db.createObjectStore('Features',{keyPath:'id'})
            }
        }
    })
})

const main=document.querySelector('main')
const root=createRoot(main)
root.render(
    <MainContent/>
)
