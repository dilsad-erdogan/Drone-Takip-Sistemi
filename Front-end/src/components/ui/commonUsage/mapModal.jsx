import { Button, Modal, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();
import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();

const MapModal = ({ show, onClose, data }) => {
    const [ownerNames, setOwnerNames] = useState('');
    const [pilotNames, setPilotNames] = useState('');
    const [droneSerial, setDroneSerial] = useState('');

    const handleExit = () => {
        onClose();
    }

    useEffect(() => {
        fetchData();
    }, [data]); // data değiştiğinde fetchData'yı çağır

    const fetchData = async () => {
        try{
            if( data != null ){
               setOwnerNames(await getUserById(data.owner_id));
               setPilotNames(await getUserById(data.pilot_id));  
               setDroneSerial(await getSerialNumberById(data.drone_id));           
            }

        } catch (error) {
            console.error('Hata:', error);
        }
    }

    async function getUserById(userId){
        if(!userId){
            return null;
        }

        try{
            const userName = await userModel.getUserByName(userId);
            return userName;
        } catch (error) {
            console.error('Hata:', error.message);
            return userId;
        }
    }

    async function getSerialNumberById(droneId){
        if(!droneId){
            return null;
        }

        try{
            const droneSerial = await droneModel.getSerialNumberById(droneId);
            return droneSerial;
        } catch(error){
            console.error('Hata:', error.message);
            return droneId;
        }
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
                        <Row><Col>Drone uçuş numarası:</Col><Col><strong>{data.flight_number}</strong></Col></Row>
                        <Row><Col>Owner:</Col><Col><strong>{ownerNames}</strong></Col></Row>
                        <Row><Col>Pilot:</Col><Col><strong>{pilotNames}</strong></Col></Row>
                        <Row><Col>Drone Serial Number:</Col><Col><strong>{droneSerial}</strong></Col></Row>
                        <Row><Col>Drone tarih ve saat:</Col><Col><strong>{data.date_and_time}</strong></Col></Row>
                    </>
                    ) : (
                        <Row>Veri bulunamadı</Row>
                    )}
                </Modal.Body>

                <Modal.Footer style={{ backgroundColor: '#182237', color: '#B7BAC1' }}>
                    <Button onClick={handleExit} style={{ backgroundColor: '#2e374a' }}>Çıkış</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MapModal;
