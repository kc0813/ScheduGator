import SelectedCourses from "./SelectedCourses";
import SearchOptions from "./SearchOptions/SearchOptions";


function CourseListing(setRenderWin: Function) {
    return (
        <div className="CourseListing">
            <header className="Schedule-header">

                <div className="ToggleSchedule">
                    <button
                        onClick={() => setRenderWin("SampleSchedule")}
                    >
                        See Sample Schedules
                    </button>
                </div>

                <SelectedCourses />

                <SearchOptions />

            </header>
        </div>
    );
}

export default CourseListing