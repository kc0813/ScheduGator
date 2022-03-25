import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';


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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <TickerBtn onClick={() => btnClick()} value={value}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App