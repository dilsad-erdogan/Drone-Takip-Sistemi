import { Button, Modal } from 'react-bootstrap';

const modal = ({ show, deleteData, onClose}) => {
    const handleExit = () => {
        onClose();
    }

    const handleDelete = () => {
        console.log("Delete işlemi");
        deleteData();
        onClose();
    }

  return (
    <div>
        <Modal show={show}>
            <Modal.Header style={{ backgroundColor: '#182237', color: '#B7BAC1' }}>
                <Modal.Title>Silme İşlemi</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: '#182237', color: '#B7BAC1' }}>
                Seçili bloğu silmek istediğinize emin misiniz?
            </Modal.Body>

            <Modal.Footer style={{ backgroundColor: '#182237' }}>
                <Button onClick={handleExit} style={{ backgroundColor: '#468f43' }}>Exit</Button>
                <Button onClick={handleDelete} style={{ backgroundColor: '#c84f2a' }}>Delete</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default modal