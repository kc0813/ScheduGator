import SearchBar from "./SearchBar";
import {SelectedCourses} from "./SelectedCourses";


function CourseListing(setRenderWin : Function)
{
    return (
        <div className="CourseListing">
            <header className="Schedule-header">

                <div className="ToggleSchedule">
                    <button
                        onClick = {() => setRenderWin("SampleSchedule")}
                    >
                        See Sample Schedules
                    </button> 
                </div>
                
                <div className="listCourses">
                    List of Courses
                    <SearchBar/>
                    <SelectedCourses/>
                </div>

                <div className="searchOptions">
                    Search Options
                </div>

                <div className="courses">
                </div>

            </header>
        </div>
    );
}

export default CourseListing