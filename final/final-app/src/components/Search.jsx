import searchIcon from '../pics/search.png'
import '../CSS/Search.css'

function Search({handleSearch}){
    return(
        <div className="search">
            <img src={searchIcon} className="searchIcon"/>
            <input type="text" placeholder='Type to search...' onChange={(e)=>handleSearch(e.target.value)}/>
        </div>
    );
}

export default Search;