import WordCount from "./WordCount"
import SearchBar from "./SearchBar"
import FilterCalendar from "./FilterCalendar"

function SearchOptions(props: {AddCourse: (courseID: string) => void}) {
    return <div id='searchOptions' className="searchOptions">
        Search Options
        <SearchBar AddCourse={props.AddCourse} />
        <WordCount/>
        <small>Filter Time Slots</small>
        <FilterCalendar/>
    </div>

}

export default SearchOptions