import React from "react";
import { Container, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import './Nav.scss'

export const Nav = ({setScreen, setUserScore}) => {
    const handleClick = () =>
    {
        setScreen('MainScreen')
        setUserScore([])
    }
    return (
        <Container id="NavBar" fluid className="px-0">
            <Navbar expand="lg" className="justify-content-center">
                <Navbar.Brand href="#" onClick={handleClick} className="mr-0">
                    <h2 className="brand-name">
                        BigBrain <FontAwesomeIcon icon={faBrain} />
                    </h2>
                </Navbar.Brand>
            </Navbar>
        </Container>
    )
}

