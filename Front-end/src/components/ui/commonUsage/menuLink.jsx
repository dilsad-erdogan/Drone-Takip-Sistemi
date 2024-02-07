import { useNavigate } from 'react-router-dom';
import '../panel.css'

const menuLink = ({ data }) => {
    const navigate = useNavigate();
    const pathname = window.location.pathname;
  
    const handleClick = () => {
      navigate(data.path);
    };
  
    return (
      <div onClick={handleClick} className={`${'menuLink'} ${pathname === data.path && 'active2'}`}>
        {data.icon}
        {data.title}
      </div>
    );
};

export default menuLink