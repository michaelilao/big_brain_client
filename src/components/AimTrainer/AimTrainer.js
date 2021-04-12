import React, { useState } from "react";
import {faBullseye, faCrown, faTrophy, faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './AimTrainer.css';
import randomNumber from "./RandomNumber";


const AimTrainer = () => {
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);
  const [missShot, setMissShot] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timer, setTimer] = useState(null);

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
  };

  const decreasePoints = () => {
    setScore(score - 10);
  };

  const countShot = () => {
    if (score + 10 > bestScore) setBestScore(score + 10);
    setScore(score + 10);
  };

  const missedShot = () => {
    setMissShot(true);
    decreasePoints();
    setTimeout(() => {
      setMissShot(false);
    }, 100)
  };

  return (
    <div className="aimTrainerMainContainer">
      <h1 style={{color: 'white'}}>Aim Trainer</h1>
      <div className="statsAimTrainerContainer">
        <h3 style={{color: 'white'}}><FontAwesomeIcon icon={faClock} style={{ color: 'lightcyan' }} /> Time : <span style={{ color: "yellow"}}>{timer}</span></h3>
        <h3 style={{color: 'white'}}><FontAwesomeIcon icon={faTrophy} style={{ color: 'yellow' }} /> Score : {score > 0 ? <span style={{ color: "yellow"}}>{score}</span> : null}</h3>
        <h3 style={{color: 'white'}}><FontAwesomeIcon icon={faCrown} style={{ color: 'orange' }} /> Best score : {bestScore > 0 ? <span style={{ color: "yellow"}}>{bestScore}</span> : null}</h3>
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
    </div>
  )
};

export default AimTrainer;