import React, {useState, useEffect} from "react";
import { Container } from 'react-bootstrap';

import { Nav } from './components/Nav/Nav'
import { SubmitScore } from './components/SubmitScore/SubmitScore'
import { MainScreen } from './components/MainScreen/MainScreen'
import Algebra from './components/Algebra/Algebra'
import NumberMemory from './components/NumberMemory/NumberMemory'

import './styles/App.scss';


const App = () => {
  const [userScore, setUserScore] = useState([])
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [screen, setScreen] = useState('MainScreen')

  useEffect(() => {
    setUserScore(Array.from({ length: 6 }, () => Math.floor((Math.random() * 40) + 60)));
  }, []); 
  
  const handleSetScreen = (screen) => {
    setScreen(screen)
  }
  const handleSetUserScore = (score) => {
    const newScore = userScore.slice(0)
    newScore.push(score)
    setUserScore(newScore)
  }
  return (
    <Container fluid className="p-0">
      <Nav setScreen={handleSetScreen} setUserScore={handleSetUserScore}/>
      {screen === 'SubmitScore' && 
        <SubmitScore userScores={userScore} setScreen ={handleSetScreen} skipSubmit={showAnalytics}/>
      }
      {screen === 'MainScreen' && 
        <MainScreen setUserScore={handleSetUserScore} setScreen ={handleSetScreen} setShowAnalytics={setShowAnalytics}></MainScreen>
      }
      {screen === 'Algebra' &&
        <Algebra setUserScore={handleSetUserScore} setScreen ={handleSetScreen}></Algebra>
      }
      {screen === 'NumberMemory' &&
        <NumberMemory/>
      }
    </Container>
    
  );
}

export default App;
