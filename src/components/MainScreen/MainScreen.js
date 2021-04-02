import React, { useState } from "react";
import { Jumbotron, Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { getScore } from '../../requests/requests'
import './MainScreen.scss'


export const MainScreen = ({setScreen, setShowAnalytics, setUserScore}) => {
    const [searchUserName, setsearchUserName] = useState(' ')
    const [showSearch, setShowSearch] = useState(false)
    const [alertDetails, setAlertDetails] = useState(' ')
    const handleSetShowSearch = () => {
        setShowSearch(true)
    }
    const handleSearch = async () => {
        if(searchUserName !== ' '){
            try{
                const res = await getScore({username: searchUserName})
                const score = res.data.score.score
                setUserScore(score)
                setShowAnalytics(true)
                setScreen('SubmitScore')
            } catch(err) {
                setAlertDetails('Username does not exist')
            }
        }
        else{
            setAlertDetails("Enter a valid username")
        }
    }
    const handleSetSearchUserName = (e) => {
        const username = e.target.value
        setsearchUserName(username)
    }
    return (
        <div id="MainScreen">
            <Jumbotron className="justify-content-center">
                <Container>
                    <h1 className="display-4">Welcome to Big Brain</h1>
                    <h4 className='lead'>Where your brain gets bigger</h4>
                </Container>
            </Jumbotron>
            <Container>
                <Row>
                    <Col className="text-center">
                    <p>
                        Welcome to Big Brain, our application will test your cognitive abilites in 
                        <span className="font-weight-bold pl-1">Visual Memory</span>, 
                        <span className="font-weight-bold pl-1">Reaction Time</span>, and 
                        <span className="font-weight-bold pl-1">Number Memory</span>
                    </p>
                    <p>
                        Below you can <span className="font-weight-bold">Start</span> your assesmment or 
                        <span className="font-weight-bold">Search</span> for a previous assessment
                    </p>
                    </Col>
                </Row>
                <Row className="justify-content-center py-4">
                    <Col xs={4}>
                        <Button size="lg" className="btn-start w-100">
                            Start Assessment
                        </Button>
                    </Col>
                </Row>
                <Form className="py-3">
                    <Row className="justify-content-center">
                        {!showSearch ? 
                            (
                                <Col xs={4} className="align-self-center">
                                    <Button size="lg" className="btn-search btn-dark w-100" onClick={handleSetShowSearch}>
                                        Search Previous Assessment
                                    </Button>
                                </Col>
                            )
                            :
                            (
                                <Col xs={4}>
                                    <Button size="lg" className="btn-search btn-dark w-100" onClick={handleSearch}>
                                        Search
                                    </Button>
                                </Col>
                            )
                        }
                        {showSearch && 
                            <Col xs={4} className="align-self-center">
                                <Form.Group  controlId="formUsername">
                                    <Form.Control type="text" placeholder="Search username" value={searchUserName} onChange={handleSetSearchUserName} />
                                    <Form.Text className="text-muted">
                                        Search for previous scores under a saved username
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        }
                    </Row>
                </Form>
                {alertDetails !== ' ' && 
                <Row>
                    <Col>
                        <Alert variant="danger" onClose={() => setAlertDetails(' ')} dismissible>
                            <Alert.Heading>{alertDetails}</Alert.Heading>
                        </Alert>
                    </Col>
                </Row>
                }
            </Container>
        </div>
    );
}
