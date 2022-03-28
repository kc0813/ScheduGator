const SearchOptions = () => {
    return <div id='SearchOptions' className="searchOptions">
        <h1>Search Options</h1>
        <p>
            Word Count<br/>
            <select>
                <option value=''>--</option>
                <option value='2000'>2000 words</option>
                <option value='4000'>4000 words</option>
                <option value='6000'>6000 words</option>
            </select>
        </p>
    </div>

}

export default SearchOptions