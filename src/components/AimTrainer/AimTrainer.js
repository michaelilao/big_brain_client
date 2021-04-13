import React, { useState } from "react";
import {faBullseye, faCrown, faTrophy, faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Button, Modal } from 'react-bootstrap';

import './AimTrainer.css';
import randomNumber from "./RandomNumber";


const AimTrainer = ({setUserScore, setScreen, nextScreen}) => {
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);
  const [missShot, setMissShot] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timer, setTimer] = useState(null);
  const [gameStarted, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const getPosition = () => {
    let leftPosition = randomNumber(0, 90);
    let topPosition = randomNumber(0, 90);
    setLeft(leftPosition);
    setTop(topPosition);
  };

  const decreaseTimer = (i) => {
    setTimeout(() => {
      setTimer(30 - i);
      console.log(30 - i);
    }, 1000 * i);
  };

  const resetTimer = () => {
    setTimer(30);
  };

  const launchTimer = () => {
    for (let i = 30; i > 0; i--) {
      decreaseTimer(i);
    }
    console.log("end of the decrease")
    setGameOver(true)
  };

  const decreasePoints = () => {
    setScore(score - 2);
  };

  const countShot = () => {
    if (score + 2 > bestScore) setBestScore(score + 2);
    setScore(score + 2);
  };

  const missedShot = () => {
    setMissShot(true);
    decreasePoints();
    setTimeout(() => {
      setMissShot(false);
    }, 100)
  };

  const nextGame = () => {
    setUserScore(score)
    setScreen(nextScreen)
  }
  return (
    <div className="aimTrainerMainContainer">
      <h1 >Aim Trainer</h1>
      <div className="statsAimTrainerContainer">
        <h3><FontAwesomeIcon icon={faClock} style={{ color: 'lightcyan' }} /> Time : <span style={{ color: "yellow"}}>{timer}</span></h3>
        <h3><FontAwesomeIcon icon={faTrophy} style={{ color: 'yellow' }} /> Score : {score > 0 ? <span style={{ color: "yellow"}}>{score}</span> : null}</h3>
        <h3><FontAwesomeIcon icon={faCrown} style={{ color: 'orange' }} /> Best score : {bestScore > 0 ? <span style={{ color: "yellow"}}>{bestScore}</span> : null}</h3>
      </div>
      <div className={`gameContainer ${missShot ? 'missShot' : null}`}>
        {
          timer && timer > 0 ?
            <div className="target"
                 style={{
                   'position': 'relative',
                   'left': `${left}%`,
                   'top': `${top}%`
                 }}
                 onClick={(event) => {
                   getPosition();
                   countShot();
                 }}
            >
              <FontAwesomeIcon icon={faBullseye} color='lightcyan' className="fa-4x"/>
            </div>
            : <p className="launchGameButton" onClick={() => {
              setScore(0);
              resetTimer();
              launchTimer();
              getPosition();
            }}>GO</p>
        }
      </div>
      <Modal show={showInstructions}>
        <Modal.Header closeButton>
            <Modal.Title>Aim Trainer Rules:</Modal.Title>
        </Modal.Header>
        <Modal.Body> {'Click on the targets as fast as you can before the time runs out!'} </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={()=>setShowInstructions(false)}>
                Close
            </Button>
        </Modal.Footer>
      </Modal>
      {timer === 0 && gameStarted && 
        (<Modal show={true}>
          <Modal.Header>
            <Modal.Title>Aim Trainer Score:</Modal.Title>
          </Modal.Header>
          <Modal.Body> {score} </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={nextGame}>
              Next Game
            </Button>
          </Modal.Footer>
        </Modal>)
      }
    </div>
  )
};

export default AimTrainer;