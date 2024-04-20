import '../../ui/panel.css';
import Search from '../../ui/commonUsage/search.jsx';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../ui/commonUsage/modal.jsx';
import PilotModel from '../../../../../Back-end/connections/pilot.js';
const pilotModel = new PilotModel();
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();

const pilot = () => {
  const navigate = useNavigate();
  const [pilotsData, setPilotsData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedPilot, setDeletedPilot] = useState();
  const [userNames, setUserNames] = useState('');
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try{
        await pilotModel.fetchPilotData();
        const pilots = pilotModel.getPilot();
  
        if(Array.isArray(pilots)) {
          setPilotsData(pilots);

          const users = {};
          for(const pilot of pilots){
            users[pilot.user_id] = await getUserById(pilot.user_id);
          }
          setUserNames(users);
        } else{
          console.error('Hata: getPilot dizi döndürmedi.');
        }
      } catch(error){
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchValue(params.get("q") || "");
  }, [location.search]);

  async function getUserById(userId){
    try{
      const userName = await userModel.getUserByName(userId);
      return userName;
    } catch(error){
      console.error('Hata:', error.message);
      return userId;
    }
  }

  const addNewPilot = () => {
    navigate('/admin/pilotAdd');
  }

  const deleteButtonClick = async (pilotId) => {
    setDeletedPilot(pilotId);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

  const dataDeleteModal = async () => {
    try{
      await pilotModel.deletePilot(deletedPilot).then(() => {
        setPilotsData(pilotModel.getPilot());
      });
    } catch (error){
      console.error('Hata:', error.message);
    }
  }

  const updateButtonClick = async (pilotId) => {
    navigate(`/admin/pilotUpdate/${pilotId}`);
  }

  const filteredData = pilotsData.filter((type) =>
    type.pilot_certificate.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className='topPanel'>
      <div className="top">
        <Search placeholder="Search for a pilot certificate"></Search>
        <button className="btn btn-outline-light" onClick={() => {addNewPilot()}}>Add New Pilot</button>
      </div>

      <table className="dataTable">
        <thead>
          <tr>
            <td>User Name</td>
            <td>Pilot Certificate</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((pilot) => (
            <tr key={pilot.pilot_id}>
              <td>{userNames[pilot.user_id]}</td>
              <td>{pilot.pilot_certificate}</td>
              <td>
                <div className='form-check form-switch'>
                  <input className='form-check-input' type='checkbox' checked={pilot.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                <div className='buttons'>
                  <button className='button update' onClick={() => {updateButtonClick(pilot.pilot_id)}}>Update</button>

                  <button className='button delete' onClick={() => {deleteButtonClick(pilot.pilot_id)}}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination></Pagination>

      <DeleteModal show={deleteModal} deleteData={dataDeleteModal} onClose={closeDeleteModal}></DeleteModal>
    </div>
  )
}

export default pilot