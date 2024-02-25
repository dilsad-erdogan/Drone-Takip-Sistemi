import { MdSupervisedUserCircle } from 'react-icons/md';
import './card.css';

const card = ({title, count}) => {
  return (
    <div className='dashCard'>
      <MdSupervisedUserCircle size={24}></MdSupervisedUserCircle>
      <div className='texts'>
        <span className='title'>{title}</span>
        <span className='number'>{count}</span>
        <span className='detail'>
          <span className='positive'>12%</span> more than previous week
        </span>
      </div>
    </div>
  )
}

export default card