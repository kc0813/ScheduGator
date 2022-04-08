import SelectedCourses from "../CourseListing/SelectedCourses/SelectedCourses";
import Calendar from "./Calendar";
import { Course } from "../Course";

function Schedule(props: {setRenderWin: (state: string) => void, courseList:Course[]})
{
	return(
    <div className="Schedule">
        <header className="Schedule-header">

            <div className="ToggleCourses">
                <button onClick = {() => props.setRenderWin("Courses")}>
                    See Courses
                </button> 
            </div>

            <SelectedCourses
                courseList={props.courseList}
                DeleteCourse={()=>{}}
            />

            <div className="searchOptions">
                Course Info
            </div>

            <div className="courses">
                <Calendar/>
            </div>

        </header>
    </div>
	);
}

export default Schedule