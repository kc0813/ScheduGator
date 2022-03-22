import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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
    ReactDOM.render(
      <div>
        <button onClick = {() => changeRenderState(false)}> See Schedule </button>
        <App/> 
      </div>,
    document.getElementById('root')
    );
    renderVar.toRender = "CourseSearch";
    
  }
  else if(renderVar.toRender === "CourseSearch")
  {
    ReactDOM.render(
      <div>
        <button onClick = {() => changeRenderState(false)}> Back to Course Search </button>
      </div>,
    document.getElementById('root')
    );
    renderVar.toRender = "App";
  }
}

//Render multiple components by just adding them to the array.
ReactDOM.render(
  <div>
    <button onClick = {() => changeRenderState(true)}> See Schedule </button>
    <App/>
  </div>,
  document.getElementById('root')
);

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
