import './card.css';
import { MdSupervisedUserCircle } from 'react-icons/md';

const card = () => {
  return (
    <div className='dashCard'>
      <MdSupervisedUserCircle size={24}></MdSupervisedUserCircle>
      <div className='texts'>
        <span className='title'>My Drones</span>
        <span className='number'>100</span>
        <span className='detail'>
          <span className='positive'>12%</span> more than previous week
        </span>
      </div>
    </div>
  )
}

export default card