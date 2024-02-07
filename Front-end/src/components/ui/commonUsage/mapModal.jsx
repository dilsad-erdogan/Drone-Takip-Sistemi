import { Button, Modal, Row } from 'react-bootstrap';

const mapModal = ({ show, onClose, data }) => {
    const handleExit = () => {
        onClose();
    }

    return(
        <div>
            <Modal show={show}>
                <Modal.Header style={{ backgroundColor: '#182237', color: '#B7BAC1' }}>
                    <Modal.Title>Drone Information</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ backgroundColor: '#182237', color: '#B7BAC1' }}>
                    <Row>Drone serial number: {data.serial_number}</Row>
                    <Row>Drone id: {data.drone_id}</Row>
                    <Row>Drone latitude: {data.latitude}</Row>
                    <Row>Drone longitude: {data.longitude}</Row>
                    <Row>Drone owner: {data.owner_id}</Row>
                </Modal.Body>

                <Modal.Footer style={{ backgroundColor: '#182237', color: '#B7BAC1' }}>
                    <Button onClick={handleExit} style={{ backgroundColor: '#468f43' }}>Exit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default mapModal