import WordCount from "./WordCount"
import SearchBar from "./SearchBar"
import FilterCalendar from "./FilterCalendar"
import { Course } from "../../Course"
import {TimeSlot} from "../../UF"

function SearchOptions(
    props: {
        AddCourse: (course: Course) => void,
        filteredTimes: TimeSlot[],
        setFilteredTimes: (filteredTimes: TimeSlot[]) => void,
    }
) {
    return <div id='searchOptions' className="searchOptions">
        Search Options
        <SearchBar AddCourse={props.AddCourse} />
        <WordCount/>
        <FilterCalendar filteredTimes={props.filteredTimes} setFilteredTimes={props.setFilteredTimes}/>
    </div>

}

export default SearchOptions