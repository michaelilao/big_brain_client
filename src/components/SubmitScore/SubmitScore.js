import React, { useState, useEffect } from "react";
import { Jumbotron, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Analytics } from '../Analytics/Analytics'
import { addScore, getAverageScore } from '../../requests/requests'
import './SubmitScore.scss'


export const SubmitScore = ({userScores, setScreen, skipSubmit}) => {
    const [userName, setUserName] = useState(" ")
    const [showForm, setShowForm] = useState(false)
    const [showAnalytics, setshowAnalytics] = useState(false)
    const [metrics, setMetrics] = useState([])

    useEffect(() => {
        if(skipSubmit) {
            async function getAverageScores() {
                const metric = await getAverageScore()
                setMetrics(metric.data)
                setshowAnalytics(true)
              }

            getAverageScores()
        }
      }, [skipSubmit]); 

    const finalScore = (userScores.reduce((a, b) => a + b, 0) / userScores.length).toFixed(2)
    const createUserScores = () => {
        return (
            <Row className="py-3">
                {userScores.map((score, index) =>
                    <Col key={index} xs={4}><span className='text-header'>Mini-Game {index + 1}:</span>{score}</Col>
                )}
            </Row>
        )
    }
    const handleSetUserName = (e) => {
        const username = e.target.value
        setUserName(username)
    }
    const handleShowForm = (e) => {
        e.preventDefault();
        setShowForm(!showForm);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const req = {
            username: userName,
            score: userScores
        }
        await addScore(req)
        const metric = await getAverageScore()
        setMetrics(metric.data)
        setshowAnalytics(true)
    }

    return (
        <div id="SubmitScore">
            <Jumbotron className="justify-content-center">
                <Container>
                    <Row>
                        <Col>
                            <h1 className='display-4'>Your Final Score is: <span className='text-header'>{finalScore}</span></h1>
                            <div className='lead'>
                                <p>
                                    Here is a break down for your individual scores:
                                </p>
                                {createUserScores()}
                            </div>
                        </Col>
                    </Row>
                    {showForm && !showAnalytics &&
                        <Form>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="formUsername" className='py-3' >
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" value={userName} onChange={handleSetUserName} />
                                        <Form.Text className="text-muted">
                                            Your score will be saved under this username
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    }
                    {!showAnalytics && (!showForm ?
                        (
                            <Row className="py-3">
                                <Col xs={4}>
                                    <Button size="lg" className="btn-score w-100" onClick={handleShowForm}>
                                        Click here to submit your score
                                    </Button>
                                </Col>
                            </Row>
                        ) :
                        (
                            <Row className="">
                                <Col xs={4}>
                                    <Button size="lg" className="btn-score w-100" onClick={handleSubmit}>
                                        Submit score
                                    </Button>
                                </Col>
                            </Row>
                        )
                    )}
                </Container>
            </Jumbotron>
            {showAnalytics &&
            (
                <Analytics userScores={userScores} metrics={metrics}/>
            )
            }
        </div>
    );
}
