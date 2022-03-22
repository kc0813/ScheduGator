import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './Search';


function App() {
  const [renderWin, setRenderWin] = useState("Courses");

  if(renderWin == "Courses"){
    return buildCoursesPage(setRenderWin);
  }
  else{
    return buildSchedulesPage(setRenderWin);
  }
}

function buildCoursesPage(setRenderWin : Function)
{
  return (
    <div className="App">
      <header className="App-header">

        <div className="ToggleSchdl">
          <button onClick = {() => setRenderWin("SampSchdl")}>See Sample Schedules</button> 
        </div>
        
        <div className="listCourses">
          List of Courses
          <SearchBar/>
        </div>

        <div className="searchOptions">
          Search Options
        </div>

        <div className="courses">
        </div>

      </header>
    </div>
  );
}

function buildSchedulesPage(setRenderWin : Function)
{
  return(
    <div className="App">
      <div className="ToggleCourses">
            <button onClick = {() => setRenderWin("Courses")}>See Courses</button> 
      </div>
    </div>
  );
}

export default App