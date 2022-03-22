import React from 'react'

let renderVar = {
    toRender: "App",
    nextRender: "CourseSearch",
  }
  
  function changeRenderState(start: boolean){
    if(start) {
      renderVar.toRender = "CourseSearch";
    }
    
    if(renderVar.toRender === "App")
    {
      //change page
      renderVar.toRender = "CourseSearch";
      
    }
    else if(renderVar.toRender === "CourseSearch")
    {
      //change page
      renderVar.toRender = "App";
    }
  }
  

export default changeRenderState