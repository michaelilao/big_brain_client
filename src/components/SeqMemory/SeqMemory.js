import React, { useState } from "react";
import { Container, Button, Modal } from 'react-bootstrap';
import './SeqMemory.scss'


export const SeqMemory = ({setUserScore, setScreen, nextScreen}) => {
  const [ squares, setSquares ] = useState(Array(16).fill(0));
  const [userSequence, setUserSequence] = useState([]);
  const [sequence, setSequence] = useState([13, 4, 8, 9, 12, 11, 10, 2, 3, 15]);
  const [show, setShow] = useState(true)
  var score = 0;
  
  const handleNextGame = () => {
    setUserScore(score)
    setScreen(nextScreen)
  }

  const blinkEffect = (i) => {
    if (squares[i] === 0) return 'square'
    return 'square click'
  }

  const renderSquare = (i) => {
    return (
      <button 
        className = {blinkEffect(i)}
        onClick={() => {
          const nextSquares = squares.slice();
          nextSquares[i] = nextSquares[i]+1;
          setSquares(nextSquares);
          const currentSeq = userSequence.slice();
          currentSeq.push(i)
          setUserSequence(currentSeq)
        }}>
      </button>
    );
  }

  const computeScore = () => {
    if (userSequence.length === 10) {
      for (var i = 0; i < 10; i++){
        if (sequence[i]===userSequence[i]) {
          score = score + 10;
        }
      }
    return score
    }
  }

  return (
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
      {userSequence.length === 10 && 
      (<Modal show={show}>
        <Modal.Header>
          <Modal.Title>Sequence Memory Score:</Modal.Title>
        </Modal.Header>
        <Modal.Body> {computeScore()} </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleNextGame}>
            Next Game
          </Button>
        </Modal.Footer>
      </Modal>)
      }
    </Container>
    
  );
}
