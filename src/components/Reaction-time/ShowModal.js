import { Button, Modal } from 'react-bootstrap';

const ShowModal = ({score, setUserScore, setScreen, nextScreen}) => {
    const handleGameDone = (score) => {
        //console.log('here')
        setUserScore(score)
        setScreen(nextScreen)
    }


    return (
        <div>
            <Modal show={true}>
                <Modal.Header closeButton>
                <Modal.Title>Reaction Time Score:</Modal.Title>
                </Modal.Header>
                <Modal.Body> {score} </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleGameDone(score)}>
                    Next Game
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ShowModal
