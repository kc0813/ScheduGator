import WordCount from "./WordCount"
import SearchBar from "./SearchBar"

function SearchOptions(props: {AddCourse: (courseID: string) => void}) {
    return <div id='searchOptions' className="searchOptions">
        Search Options
        <SearchBar AddCourse={props.AddCourse} />
        <WordCount/>
    </div>

}

export default SearchOptions