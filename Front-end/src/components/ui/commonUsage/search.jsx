import '../panel.css'
import { MdSearch } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const search = ({ placeholder }) => {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchValue(params.get("q") || "");
  }, [location]);

  const handleSearch = (e) => {
    const params = new URLSearchParams(location.search);
    params.set("q", e.target.value);
    navigate(`${location.pathname}?${params}`);
  };
  
  return (
    <div className='search'>
        <MdSearch></MdSearch>
        <input type='text' placeholder={placeholder} className='searchInput' value={searchValue} onChange={handleSearch}></input>
    </div>
  )
}

export default search