import SelectedCourses from "../CourseListing/SelectedCourses/SelectedCourses";
import Calendar from "./Calendar";
import { Course, Schedule } from "../Course";


let sample = new Map<string, string[]>();
sample.set("M", ["", "", "", "CIS4301", "", "", "", "", "", "", "", "", "", ""]);
sample.set("T", ["", "", "", "", "", "", "", "COP4600", "COP4600", "", "", "", "", ""]);
sample.set("W", ["", "", "", "CIS4301", "", "", "", "", "", "", "", "COP4600", "", ""]);
sample.set("R", ["", "", "", "", "", "", "", "", "COP4600", "", "", "", "", ""]);
sample.set("F", ["", "", "", "CIS4301", "", "", "", "", "", "", "", "", "", ""]);
sample.set("S", ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
sample.set("ONLINE", ["EEL3872", "CAP3027"])

let sampleSchedule = {template: sample};

function ScheduleListing(
    props: {
        setRenderWin: (state: string) => void, 
        courseList:Course[], 
        colorMap: Map<string, string>, 
        setColorMap: (colorMap: Map<string, string>) => void 
    }
) {
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
                deletable={false}
                DeleteCourse={()=>{}}
                colorMap={props.colorMap}
                setColorMap={props.setColorMap}
            />

            <div className="searchOptions">
                Course Info
            </div>

            <div className="courses">
                <Calendar schedule={sampleSchedule} colorMap={props.colorMap}/>
                <button>Prev Schedule</button>
                <button>Next Schedule</button>
            </div>

        </header>
    </div>
	);
}

export default ScheduleListing