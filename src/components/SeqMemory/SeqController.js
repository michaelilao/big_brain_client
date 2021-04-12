import React, { useState,  useEffect } from "react";
import { Container, Button, Modal } from 'react-bootstrap';
import { SeqMemory } from './SeqMemory'
import { SeqMemoryShow } from './SeqMemoryShow'
import './SeqMemory.scss'

export const SeqController = ({setUserScore, setScreen, nextScreen}) => { 
    const [startGame, setStartGame] = useState(false)
    const [show, setShow] = useState(true)
    
    const handleStartGame = () => {
        setStartGame(!startGame)
        console.log('here')
    }

    const handleShowSeq = () => {
        setShow(!show)
    }

    return (
        <Container className="seqController">
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Sequence Memory Rules:</Modal.Title>
                </Modal.Header>
                <Modal.Body> {'Memorize the order that the block change colour! To earn points click blocks in the same order they appeared!'} </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleShowSeq}>
                        Start Sequence
                    </Button>
                </Modal.Footer>
            </Modal>
        {!startGame && !show &&
            <SeqMemoryShow setStartGame ={handleStartGame}/>
        }
        {startGame && 
            <SeqMemory setUserScore = {setUserScore} setScreen = {setScreen} nextScreen={nextScreen}/>
        }
        </Container>
    );
}