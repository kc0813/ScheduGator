import { useState } from 'react';
import './App.css';
import SearchBar from './Search';


function App() {
  return (
    <div className="App">
      <header className="App-header">

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

export default App