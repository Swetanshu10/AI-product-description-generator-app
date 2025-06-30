
import { useRef} from "react"
import Page1 from "./FirstPage.js"
import Page2 from "./SecondPage.js"
import Page3 from "./ThirdPage.js"
import PageNumber from "./Navigation.js"
import ContextHolder from "../context/contextState.js"

export default function MainContent() {
  const wrapper=useRef()
  const messageBox=useRef()
  const progressRef=useRef()

  return (
    <section id="Parent">

      <article id="databaseMessage" className="notVisible" ref={messageBox}>
        <p>Details saved successfully</p>
      </article>

      <div id="progressContainer" className="notVisible" ref={progressRef}>
        <ProgressTimeline/>
        <p>Generating product descriptions</p>
      </div>

      <section id="interactionSection">

        <section id="wrapper" ref={wrapper}>
          <ContextHolder>
            <Page1
            mBox={messageBox}/>
            <Page2
            mBox={messageBox}/>
            <Page3
            progressRef={progressRef}/>
          </ContextHolder>
        </section>

        <PageNumber 
        container={wrapper}/>

        <p id="disclaimer">Fields marked with * are required</p>

      </section>
    </section>
  )
}

function ProgressTimeline(){
  return(
    <section>
      <article className="animationBall"></article>
      <article className="animationBall"></article>
      <article className="animationBall"></article>
    </section>
  )
}