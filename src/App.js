import React, {useState, useEffect} from "react";
import { Container } from 'react-bootstrap';

import { Nav } from './components/Nav/Nav'
import { SubmitScore } from './components/SubmitScore/SubmitScore'
import { MainScreen } from './components/MainScreen/MainScreen'

import './styles/App.scss';


const App = () => {
  const [userScore, setUserScore] = useState([])
  const [showAnalytics, setShowAnalytics] = useState(false)

  useEffect(() => {
    setUserScore(Array.from({ length: 6 }, () => Math.floor((Math.random() * 40) + 60)));
  }, []); 
  
  const handleSetScreen = (screen) => {
    setScreen(screen)
  }
  const handleSetUserScore = (score) => {
    setUserScore(score)
  }
  const [screen, setScreen] = useState('MainScreen')
  return (
    <Container fluid className="p-0">
      <Nav setScreen={handleSetScreen} setUserScore={handleSetUserScore}/>
      {screen === 'SubmitScore' && 
        <SubmitScore userScores={userScore} setScreen ={handleSetScreen} skipSubmit={showAnalytics}/>
      }
      {screen === 'MainScreen' && 
        <MainScreen setUserScore={handleSetUserScore} setScreen ={handleSetScreen} setShowAnalytics={setShowAnalytics}></MainScreen>
      }
    </Container>
  );
}

export default App;
