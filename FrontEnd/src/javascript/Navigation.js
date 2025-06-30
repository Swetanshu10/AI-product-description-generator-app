
import { useState } from "react"

const changePage=(pageNo,setPageNo,wrapper,direction)=>{
    const totalChilds=wrapper.current.childElementCount
    if(direction==="left" && pageNo>1){
      wrapper.current.scrollBy({'left':(-1*wrapper.current.firstChild.offsetWidth),'behavior':'smooth'})
      setPageNo(pageNo-1)
    }
    else if(direction==="right" && pageNo<totalChilds){
      wrapper.current.scrollBy({'left':wrapper.current.firstChild.offsetWidth,'behavior':'smooth'})
      setPageNo(pageNo+1)
    }
}
  
export default function PageNumber({container}){
    const [pageNo,setPageNo]=useState(1)

    window.addEventListener("resize",()=>{
        const expectedScroll=(pageNo-1)*container.current.firstChild.offsetWidth
        container.current.scrollTo({'left':expectedScroll,'behavior':'smooth'})
    })

    return(
        <article id="navigation">

        <button className="moveButtons" title="Left button"
        onClick={()=>{
            changePage(pageNo,setPageNo,container,"left")
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </button>

        <section id="FormProgress">
            <article
            className={1===pageNo?"currentForm":"otherForm"}></article>
            <article
            className={2===pageNo?"currentForm":"otherForm"}></article>
            <article
            className={3===pageNo?"currentForm":"otherForm"}></article>
            <article
            className={4===pageNo?"currentForm":"otherForm"}></article>
        </section>

        <button className="moveButtons" title="Right button"
        onClick={()=>{
            changePage(pageNo,setPageNo,container,"right")
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
        </button>

        </article>
    )
}