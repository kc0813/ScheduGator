import WordCount from "./WordCount"
import SearchBar from "./SearchBar"
import FilterCalendar from "./FilterCalendar"
import { Course } from "../../Course"

function SearchOptions(props: {AddCourse: (course: Course) => void}) {
    return <div id='searchOptions' className="searchOptions">
        Search Options
        <SearchBar AddCourse={props.AddCourse} />
        <WordCount/>
        <FilterCalendar/>
    </div>

}

export default SearchOptions