import WordCount from "./WordCount"
import SearchBar from "../SearchBar"

function SearchOptions(props: {AddCourse: (courseID: string) => void}) {
    return <div id='searchOptions' className="searchOptions">
        Search Options
        <WordCount/>
        <SearchBar AddCourse={props.AddCourse} />
    </div>

}

export default SearchOptions