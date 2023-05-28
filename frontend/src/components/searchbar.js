import "../styles/searchbar.css";
import { useNavigate } from "react-router-dom";


function SearchBar() {
  const navigate = useNavigate();

  const handleClick = () =>{
    let searchBarValue = document.getElementById("search-bar").value;
    // console.log(searchBarValue)
    navigate(`/search/${searchBarValue}`);
  }
  const handleKeyDown = (e)=>{
    if (e.key === 'Enter'){
      let searchBarValue = document.getElementById("search-bar").value;
      // console.log(searchBarValue)
      navigate(`/search/${searchBarValue}`);
    }
  }

  return (
    <div className="SearchBar">
      <input type="text" className="searchBar" id="search-bar" placeholder="Search for items..." onKeyDown={handleKeyDown}></input>
      <button type="submit" className="searchIcon" onClick={handleClick}>
        <img className="searchIconImage" src="https://img.icons8.com/ios/25/000000/search.png" />
      </button>
    </div>
  );
}

export default SearchBar;
