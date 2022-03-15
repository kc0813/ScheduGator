import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/* 
function component
props is custom object
  onClick: void function
  value: string
returns HTML
*/
function Square(props: { onClick: () => void, value: string}) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}


/*
functional component
Handles all gamestate logic


*/
function Board() {
  //useState hooks to set and change values
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState<boolean|null>(true);

  //function to update game onClick
  const handleClick = (i: number) => {
    const tempSquares = squares.slice()

    if (calculateWinner(tempSquares) || tempSquares[i]) {
      return;
    }

    tempSquares[i] = xIsNext ? 'X' : 'O'

    setSquares(tempSquares)
    setXIsNext(!xIsNext)
  }

  //returns HTML to render each square
  const renderSquare = (i: number) => {
    return <Square
      value={squares[i]}
      onClick ={() => handleClick(i)}
    />;
  }

  //display Game Status
  const winner: string|null = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}   


/**
 * 
 * @param squares: array of board squares
 * @returns Winner's character | null if no winner
 */
function calculateWinner(squares: string[]): string|null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board
  