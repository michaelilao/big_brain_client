import React, { useState, useEffect} from "react";
import './Algebra.scss';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import TimerBar from './TimerBar'
import Option from './Option'
import RulesDialog from '../RulesDialog/RulesDialog'
import {Data} from './Data'

const instruction = "Click the corresponding answer for the given prompt"
const totalTime = 50

function Algebra({setUserScore, setScreen, nextScreen}) {
    const [completed, setCompleted] = useState(totalTime);
    const [optionClicked, setOption] = useState(0);
    const [newCombination, setNew] = useState(0);

    const [options, setOptions] = useState([0, 0, 0, 0]);
    const [Prompt, setPrompt] = useState("");
    const [score, setScore] = useState(0);

    var ind = 0;//the current round index

    var times = 0;
    useEffect(() => {
        var interval = setInterval(() => {
            if(times==50){
                clearInterval(interval);
                return;
            }
            times++;
            setCompleted(completed => completed - 1)
        }, 1000);

    }, []);
    useEffect(()=>{
        if(completed === totalTime || newCombination>=Data.length-1){
            // console.log(score)
            // setUserScore(score);
            // setScreen(nextScreen);
        }
    }, [completed]);
    useEffect(()=>{//handling click
        if(optionClicked>0){
            setOption(0);
            if(optionClicked==Data[newCombination].Answer){
                setScore(score => score+10)
            }
            if(newCombination<Data.length-1)
                setNew(newCombination => newCombination+1)
        }

    }, [optionClicked]);
    
    useEffect(()=>{ //setting new question
        setOptions(Data[newCombination].Options)
        setPrompt(Data[newCombination].Prompt)

    }, [newCombination])

    useEffect(()=>{
        console.log("Score: " + score)
    }, [score])

    const handleNextGame = () => {
        setUserScore(score)
        setScreen(nextScreen)
      }

  return (
 
        
    <div className="algebra">
        <Container>
            <Row className="Game-info">
                <Col className="Timer" >
                    <RulesDialog instructions = {instruction}/>
                </Col>
                <Col className="Timer" >
                    <TimerBar key={0}  max = {totalTime} completed={completed}/>
                </Col>
                <Col >
                    <p>
                        Score: {score}
                    </p>
                </Col>
            </Row>
        </Container>
        <table className="Options-table">
            <tbody>
                <tr>
                    <td>
                        <Option displayNum={options[0]} optNum={1} setOption={setOption}/>
                    </td>
                    <td>
                        <Option displayNum={options[1]} optNum={2} setOption={setOption}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Option displayNum={options[2]} optNum={3} setOption={setOption}/>
                    </td>
                    <td>
                        <Option displayNum={options[3]} optNum={4} setOption={setOption}/>
                    </td>
                </tr>
            </tbody>

        </table>
        <div className="Prompt">
            <p>
                {Prompt}
            </p>
        </div>
        {(completed <=  0 || newCombination>=Data.length-1) && 
            (<Modal show={true}>
                <Modal.Header>
                <Modal.Title>Algebra Score:</Modal.Title>
                </Modal.Header>
                <Modal.Body> {score} </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleNextGame}>
                    Next Game
                </Button>
                </Modal.Footer>
            </Modal>)
        }

      </div>
      
  );
}

export default Algebra;
