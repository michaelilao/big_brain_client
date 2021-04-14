import React, { useState, useEffect } from "react";
import { Jumbotron, Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import './NumberMemory.scss';
import ProgressBar from './TimberBar'

export const NumberMemory =({setScreen, setUserScore, nextScreen}) => {
  let firstNum = Math.floor(Math.random() * (10 - 1) + 1);
  const [num, setNum] = useState(firstNum)
  const [initial, setInitial] = useState(1)
  const [showing, setShowing] = useState(true)
  const [showing2, setShowing2] = useState(false)
  const [prevNum, setPrevNum] = useState(firstNum)
  const [input, setInput] = useState(" ")
  const [score, setScore] = useState(0)

  const [showSec, setShowSec] = useState(3000)
  const [completed, setCompleted] = useState(3000);

  const [show, setShow] = useState(true)

  const [showInstructions, setShowInstructions] = useState(true)
  const [showScore, setShowScore] = useState(false)
  const getInput = (event) =>{
    setInput(event.target.value)
  }

  const submit = () => {
    console.log(input)
    console.log(prevNum)
    if(parseInt(input) === parseInt(prevNum)){
      console.log("ok correct");
      var newScore = score+10
      setScore(newScore)
      setInput("")
      if(newScore >= 100){
        setUserScore(newScore)
        setScreen(nextScreen)
      }
    }
    else {
      setShowScore(true)
      
    }
  }

  const handleGameDone = () => {
    setUserScore(score)
    setScreen(nextScreen)
  }
  const changeScreen = () => {
    setShowing(!showing)
    setShowing2(!showing2)
  }

  var times = showSec;
  useEffect(() => {
      if(!show){        
            times = showSec;
            setShow(true);
            setCompleted(times);
          var interval = setInterval(() => {
            if(times<=0){
                clearInterval(interval);
                // setShowSec(showSec => showSec + 1250)
                return;
            }
            times-=250;
            //console.log("second has passed");
            setCompleted(completed => completed - 250)
          }, 250);
      }

  }, [show]);


  const makeTimer = () => {

    let max_val = initial*10;
    let min_val = initial
    let temp = Math.floor(Math.random() * (max_val - min_val) + min_val); // (max - min) + min
    setNum(temp)
    setInitial(max_val)
    setPrevNum(temp)
    // console.log(showSec)

    
    setShow(false);
    setTimeout(() => {
      setNum(" ")
      var current = new Date()
      //console.log("sec: ", current.getSeconds() - start_time);
      setShowSec(showSec => showSec + 1250)
    }, showSec)
  }

  const changeHeading =() => {
    //alert(.showing2)
    if(showing2 === false){
      document.getElementById('head').style.display = 'none';
    }
  }
  return (
    <div className="mainBack">
      <Modal show={showInstructions}>
        <Modal.Header closeButton>
            <Modal.Title>Number Memory Rules:</Modal.Title>
        </Modal.Header>
        <Modal.Body> {'Memorize the numbers and type them back within the given time!'} </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={()=>setShowInstructions(false)}>
                Close
            </Button>
        </Modal.Footer>
      </Modal>
      <div>
        { showing 
            ? 
            <div>
              <img className="imgheading" src="https://static.memrise.com/img/400sqf/from/uploads/course_photos/591251000130123213405.jpg"></img>
              <h1 className="nummebheading" id="head">Number Memory</h1>
              <button type="button" className="btn btn-danger startbut" onClick={(event) => {changeScreen(); makeTimer(); changeHeading();}} style={{ }}> Start </button>
            </div>
            : null
        }
      </div>
      <div>
        { showing2 
            ? 
            <div>
              <div style={{marginLeft: '1250px'}}>
                <label style={{float: "left", marginRight: '20px', color: 'black', fontSize: '25px'}}>Score:</label>
                <span><p style={{color: 'black', fontSize: '25px'}}>{score}</p></span> 
              </div>
              <h2 className="shownum">{num}</h2>
              <br/>
              <div  className="progress">
                <ProgressBar key={0}  max = {showSec} completed={completed}/>
              </div>

              <h4 className="ques">What was the Number?</h4>
              
              {num == " " ? 
              <input className="finput" 
              type="text" onChange={getInput} 
              placeholder="Enter Number"
              value={input}
              /> 
              : 
              <input className="finput" 
              type="text" onChange={getInput} 
              placeholder="Enter Number"
              value={input} disabled
              />}
              <button className="subbut" onClick={(event) => {makeTimer(); submit(); }}>Submit</button>
              
              </div>
            : null
        }
      </div>
      
      <Modal show={showScore}>
        <Modal.Header closeButton>
            <Modal.Title>Number Memory Score:</Modal.Title>
        </Modal.Header>
        <Modal.Body> {score} </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleGameDone}>
                Next Game
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
