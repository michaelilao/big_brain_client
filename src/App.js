import React, {useState, useEffect} from "react";
import { Container } from 'react-bootstrap';

import { Nav } from './components/Nav/Nav'
import { SubmitScore } from './components/SubmitScore/SubmitScore'
import { NumberMemory } from './components/NumberMemory/NumberMemory'
import './styles/App.scss';


const App = () => {
  const [userScore, setUserScore] = useState([])
  useEffect(() => {
    setUserScore(Array.from({ length: 6 }, () => Math.floor((Math.random() * 40) + 60)));
  }, []); 

  const [screen, setScreen] = useState('SubmitScore')
  return (
    <Container fluid className="p-0">
      <Nav/>
      {screen === 'SubmitScore' && 
        <SubmitScore userScores={userScore} setScreen ={setScreen}/>
      }
    </Container>
  );
}

export default App;
