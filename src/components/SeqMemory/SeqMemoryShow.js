import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import './SeqMemory.scss'


export const SeqMemoryShow = ({setStartGame}) => {
  const [sequence, setSequence] = useState([13, 4, 8, 9, 12, 11, 10, 2, 3, 15]); 
  
  const blinkEffect = (i) => {
    if (sequence[0] === i) return 'square clickSquare'
    if (sequence[1] === i) return 'square clickSquare1'
    if (sequence[2] === i) return 'square clickSquare2'
    if (sequence[3] === i) return 'square clickSquare3'
    if (sequence[4] === i) return 'square clickSquare4'
    if (sequence[5] === i) return 'square clickSquare5'
    if (sequence[6] === i) return 'square clickSquare6'
    if (sequence[7] === i) return 'square clickSquare7'
    if (sequence[8] === i) return 'square clickSquare8'
    if (sequence[9] === i) return 'square clickSquare9'
    return 'square'
  }

  const renderSquare = (i) => {
    return (
      <button className = {blinkEffect(i)}>​
      </button>
    );
  }

  return (
    <div>
    <Container>
      <div className="game">
        <div className="game-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
          </div>
          <div className="board-row">
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
            {renderSquare(7)}
          </div>
          <div className="board-row">
            {renderSquare(8)}
            {renderSquare(9)}
            {renderSquare(10)}
            {renderSquare(11)}
          </div>
          <div className="board-row">
            {renderSquare(12)}
            {renderSquare(13)}
            {renderSquare(14)}
            {renderSquare(15)}
          </div>
        </div>
      </div>
    </Container>
        <div>
            <button className="start-button" onClick={setStartGame}>
                Enter Sequence
            </button>
        </div>
    </div>
  );
}
