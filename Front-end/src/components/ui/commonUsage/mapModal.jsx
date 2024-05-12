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
                        <Row><Col><strong>Drone uçuş numarası:</strong></Col><Col>{data.flight_number}</Col></Row>
                        <div className='line'></div>
                        <Row><Col><strong>Owner:</strong></Col><Col>{ownerNames}</Col></Row>
                        <Row><Col><strong>Pilot:</strong></Col><Col>{pilotNames}</Col></Row>
                        <Row><Col><strong>Drone Serial Number:</strong></Col><Col>{droneSerial}</Col></Row>
                        <Row><Col><strong>Drone tarih ve saat:</strong></Col><Col>{data.date_and_time}</Col></Row>
                    </>
                    ) : (
                        <Row>Veri bulunamadı</Row>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default MapModal;
