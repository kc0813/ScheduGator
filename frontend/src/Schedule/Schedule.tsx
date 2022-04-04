import SelectedCourses from "../CourseListing/SelectedCourses";

function Schedule(setRenderWin : Function)
{
	return(
    <div className="Schedule">
        <header className="Schedule-header">

            <div className="ToggleCourses">
                <button onClick = {() => setRenderWin("Courses")}>See Courses</button> 
            </div>

            <div className="listCourses">
                List of Courses
                {/* <SelectedCourses/> */}
            </div>

            <div className="searchOptions">
                Course Info
            </div>

            <div className="courses">
            </div>

        </header>
    </div>
	);
}

export default Schedule