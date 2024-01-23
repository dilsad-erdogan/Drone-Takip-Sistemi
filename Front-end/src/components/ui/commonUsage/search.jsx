import '../panel.css'
import { MdSearch } from 'react-icons/md';

const search = ({ placeholder }) => {
  return (
    <div className='search'>
        <MdSearch></MdSearch>
        <input type='text' placeholder={placeholder} className='searchInput'></input>
    </div>
  )
}

export default search