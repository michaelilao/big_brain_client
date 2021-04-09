import React, { useState, useEffect} from "react";
import './Algebra.scss';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import TimerBar from './TimerBar'
import Option from './Option'
import RulesDialog from '../RulesDialog/RulesDialog'
import {Data} from './Data'

const instruction = "Click the corresponding answer for the given prompt"

function Algebra({setUserScore, setScreen, nextScreen}) {
    const [completed, setCompleted] = useState(100);
    const [optionClicked, setOption] = useState(0);
    const [newCombination, setNew] = useState(0);

    const [options, setOptions] = useState([0, 0, 0, 0]);
    const [Prompt, setPrompt] = useState("");
    const [score, setScore] = useState(0);

    var ind = 0;//the current round index

    var times = 0;
    useEffect(() => {
        var interval = setInterval(() => {
            if(times==5){
                clearInterval(interval);
                setUserScore(score);
                setScreen(nextScreen);
                return;
            }
            times++;
            setCompleted(completed => completed - 1)
        }, 1000);

    }, []);
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



  return (
 
        
    <div className="algebra">
        <Container>
            <Row className="Game-info">
                <Col className="Timer" >
                    <RulesDialog instructions = {instruction}/>
                </Col>
                <Col className="Timer" >
                    <TimerBar key={0}  completed={completed}/>
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
        {/* <ScrollDialog/> */}

      </div>
      
  );
}

export default Algebra;
