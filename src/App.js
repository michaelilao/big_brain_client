import React, {useState, useEffect} from "react";
import { Container } from 'react-bootstrap';

import { Nav } from './components/Nav/Nav'
import { SubmitScore } from './components/SubmitScore/SubmitScore'
import { MainScreen } from './components/MainScreen/MainScreen'
import AimTrainer from './components/AimTrainer/AimTrainer'
import Algebra from './components/Algebra/Algebra'
import { NumberMemory } from './components/NumberMemory/NumberMemory'
import { SeqController }from './components/SeqMemory/SeqController'
import ReactionTime from './components/Reaction-time/ReactionTime'
import './styles/App.scss';


const App = () => {
  const [userScore, setUserScore] = useState([])
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [screen, setScreen] = useState('MainScreen')

  useEffect(() => {
    setUserScore([])
    setShowAnalytics(false)
  }, [])
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
      <Nav setScreen={handleSetScreen} setUserScore={setUserScore} setShowAnalytics={setShowAnalytics}/>
      {screen === 'SubmitScore' && 
        <SubmitScore userScores={userScore} setScreen ={handleSetScreen} skipSubmit={showAnalytics}/>
      }
      {screen === 'MainScreen' && 
        <MainScreen setUserScore={setUserScore} setScreen ={handleSetScreen} setShowAnalytics={setShowAnalytics} nextScreen={'Algebra'}></MainScreen>
      }
      {screen === 'Algebra' &&
        <Algebra setUserScore={handleSetUserScore} setScreen ={handleSetScreen} nextScreen={'SeqController'}></Algebra>
      }
      {screen === 'SeqController' && 
        <SeqController setUserScore={handleSetUserScore} setScreen ={handleSetScreen} nextScreen={'Reaction-Time'}/>
      }
      {screen === 'Reaction-Time' &&
        <ReactionTime setUserScore={handleSetUserScore} setScreen ={handleSetScreen} nextScreen={'NumberMemory'}/>
      }
      {screen === 'NumberMemory' &&
        <NumberMemory setUserScore={handleSetUserScore} setScreen ={handleSetScreen} nextScreen={'AimTrainer'}/>
      }
      {screen === 'AimTrainer' && 
        <AimTrainer setUserScore={handleSetUserScore} setScreen ={handleSetScreen} nextScreen={'SubmitScore'}/>
      }
    </Container>
    
  );
}

export default App;
