import SelectedCourses from "../CourseListing/SelectedCourses/SelectedCourses";

function Schedule(props: {setRenderWin: (state: string) => void})
{
	return(
    <div className="Schedule">
        <header className="Schedule-header">

            <div className="ToggleCourses">
                <button onClick = {() => props.setRenderWin("Courses")}>
                    See Courses
                </button> 
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