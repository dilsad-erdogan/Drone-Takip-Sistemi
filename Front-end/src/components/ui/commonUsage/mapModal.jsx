import { Button, Modal, Row } from 'react-bootstrap';

const MapModal = ({ show, onClose, data }) => {
    const handleExit = () => {
        onClose();
    }

    return (
        <div>
            <Modal show={show} onHide={handleExit}>
                <Modal.Header style={{ backgroundColor: '#182237', color: '#B7BAC1' }}>
                    <Modal.Title>Drone Bilgileri</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ backgroundColor: '#182237', color: '#B7BAC1' }}>
                    {data ? (
                        <>
                            <Row>Drone uçuş numarası: {data.flight_number}</Row>
                            <Row>Drone id: {data.drone_id}</Row>
                            <Row>Drone başlangıç noktası: {data.startPoint}</Row>
                            <Row>Drone bitiş noktası: {data.endPoint}</Row>
                            <Row>Drone oluşturulma tarihi: {data.createdAt}</Row>
                            <Row>Drone güncellenme tarihi: {data.updatedAt}</Row>
                            <Row>Drone tarih ve saat: {data.date_and_time}</Row>
                        </>
                    ) : (
                        <Row>Veri bulunamadı</Row>
                    )}
                </Modal.Body>

                <Modal.Footer style={{ backgroundColor: '#182237', color: '#B7BAC1' }}>
                    <Button onClick={handleExit} style={{ backgroundColor: '#468f43' }}>Çıkış</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MapModal;
