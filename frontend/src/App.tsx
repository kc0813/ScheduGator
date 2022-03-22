import { useState } from 'react';
import './App.css';
import SearchBar from './Search';


function TickerBtn(props: { onClick: () => void, value: number}) {
  return (
    <button
      className="ticker"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );

}

function App() {

  const [value, setValue] = useState<number>(0)

  const btnClick = () => {
    setValue(value+1)
  }

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