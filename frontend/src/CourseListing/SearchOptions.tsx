const SearchOptions = () => {
    return <div id='SearchOptions' className="searchOptions">
        Search Options
        <select>
            <option value=''>--Word Count--</option>
            <option value='2000'>2000 words</option>
            <option value='4000'>4000 words</option>
            <option value='6000'>6000 words</option>
        </select>
    </div>

}

export default SearchOptions