import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Header from './Header';
import Grid from './Grid';
import StartRound from './StartRound';
import './index.scss'


function ReactionTime({setUserScore, setScreen, nextScreen}) {
  //STATES---------------------------------------------------------------

  //State for drawing the grid and colouring
  const [squares, setSquares] = useState([
    {
      id: 1,
      selected: false,
    },
    {
      id: 2,
      selected: false,
    },
    {
      id: 3,
      selected: false,
    },
    {
      id: 4,
      selected: false,
    },
    {
      id: 5,
      selected: false,
    },
    {
      id: 6,
      selected: false,
    },
    {
      id: 7,
      selected: false,
    },
    {
      id: 8,
      selected: false,
    },
    {
      id: 9,
      selected: false,
    }
    ])

    //State for when to draw
    const [startTime, setTime] = useState({})

    //State for keeping the score
    const [score, setScore] = useState(0)

    //State for the current round of the game
    const [round, setRound] = useState(1)

    //state for the reaction time for each round
    const [reactionTime, setReactionTime] = useState(null)

    //state for showing the instructions
    const [show, setShow] = useState(true)

    //state for showing modal

    const [showModal, setShowModal] = useState(false)

    //---------------------------------------------------------------

    //Functions for updating the game states------------------------

    //Updates for drawing and picking the colour for the grid
    //Changes the colour of the squares to default
    const resetColour = (selected) =>{
      setSquares(selected === true ? 
        (squares.map((square) => (
        {...square, selected: false}))) : squares)
    }

    //Changes the colour of the squares to default
    const randomSqaure = () =>{
      let id_selected = Math.round(1 + (Math.random() * (9-1)));
      setSquares(squares.map((square) => (
        square.id === id_selected ? {...square, selected: true}: square
      )))
    }

    //Determine when to highlight the selected square
    //Setting the start time of the round
    const setStartTime = () => {
      let time = new Date()
      setTime(time)
    }

    //Wrapper functions for calling multiple methods onClick
    const startRound = (timePressed) => {
      randomSqaure();
      setStartTime();
    }

    //To determine the score
    const updateScore = ()=>{
      let timeWhenClicked = new Date()
      
      //Getting the time from when the start round button is pressed
      //to when the coloured square is pressed on the grid
      let timeOfRound = timeWhenClicked-startTime
      setReactionTime(timeOfRound)

      //Calculating the score out of 100
      let roundScore = Math.round(400/timeOfRound*10)
      
      roundScore = roundScore > 10 ? 10 : roundScore
      setScore(score+roundScore)
      return score+roundScore
    }

    //Wrapper function for when the correct sqaure is pressed
    const sqaurePressed = (selected) => {
      if(selected){
        const updatedScore = updateScore();
        resetColour(selected);
        updateRound(updatedScore);
      }

    }

    const handleGameDone = () => {
      setUserScore(score)
      setScreen(nextScreen)
  }

    //To update the current round of the game
    const updateRound = (score) => {
      setRound(round+1)
      if(round >= 9){
        setShowModal(true)
      }
    }

    //To stop showing the instructions modal
    const handleShowSeq = () => {
      setShow(!show)
    }

    
   //MAIN SECTION-------------------------------------------------
  return (
    <div className="reactionTime">
      <Modal show={show}>
        <Modal.Header closeButton>
            <Modal.Title>Reaction Time Rules:</Modal.Title>
        </Modal.Header>
        <Modal.Body> {'Press the start round button and try to click the coloured sqaured in the grid as fast as possible!'} </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleShowSeq}>
                Start
            </Button>
        </Modal.Footer>
      </Modal>
      <Header round={round} currentScore={score} time={reactionTime}/>
      <Grid grid={squares} time={startTime} gridClicked={sqaurePressed}/>
      <StartRound grid={squares} setStart={startRound}/>
      {/*round >= 10 ? (<ShowModal score={score} setUserScore={setUserScore} 
      setScreen ={setScreen} nextScreen={nextScreen} /> ) : null} */}
      <Modal show={showModal}>
        <Modal.Header closeButton>
            <Modal.Title>Reaction Score:</Modal.Title>
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

export default ReactionTime;
