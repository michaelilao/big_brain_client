import { useState } from 'react';
import Header from './Header';
import Grid from './Grid';
import StartRound from './StartRound';
import Rules from './RulesDialog';
import RulesDialog from './RulesDialog';
import './index.css'


function ReactionTime({ setUserScore, setScreens}) {
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
      //console.log(id_selected);
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
      let roundScore = Math.round(300/timeOfRound*10)
      
      roundScore = roundScore > 10 ? 10 : roundScore
      setScore(score+roundScore)
    }

    //Wrapper function for when the correct sqaure is pressed
    const sqaurePressed = (selected) => {
      if(selected){
        updateScore();
        resetColour(selected);
        updateRound();
      }

    }

    //To update the current round of the game
    const updateRound = () => {
      setRound(round+1)
    }


  //MAIN SECTION-------------------------------------------------
  return (
    <div>
       <Header round={round} currentScore={score} time={reactionTime}/>
      <Grid grid={squares} time={startTime} gridClicked={sqaurePressed}/>
      <StartRound grid={squares} setStart={startRound}/>
      {round => 10 ? (setUserScore(score)) : null}
    </div>
  );
}

export default ReactionTime;
