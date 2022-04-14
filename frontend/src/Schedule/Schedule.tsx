import SelectedCourses from "../CourseListing/SelectedCourses/SelectedCourses";
import Calendar from "./Calendar";
import { Course, Schedule } from "../Course";


let sample1 = new Map<string, string[]>();
sample1.set("M", ["", "", "", "CIS4301", "", "", "", "", "", "", "", "", "", ""]);
sample1.set("T", ["", "", "", "", "", "", "", "COP4600", "COP4600", "", "", "", "", ""]);
sample1.set("W", ["", "", "", "CIS4301", "", "", "", "", "", "", "", "COP4600", "", ""]);
sample1.set("R", ["", "", "", "", "", "", "", "", "COP4600", "", "", "", "", ""]);
sample1.set("F", ["", "", "", "CIS4301", "", "", "", "", "", "", "", "", "", ""]);
sample1.set("S", ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
sample1.set("ONLINE", ["EEL3872", "CAP3027"])

let sample2 = new Map<string, string[]>();
sample2.set("M", ["", "", "MAA4402", "", "", "COP4020", "", "CEN3031", "", "", "", "", "", ""]);
sample2.set("T", ["", "", "EGS4034", "CEN3031", "", "", "", "", "", "", "", "", "", ""]);
sample2.set("W", ["", "", "MAA4402", "", "", "COP4020", "", "CEN3031", "", "", "", "", "", ""]);
sample2.set("R", ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
sample2.set("F", ["", "", "MAA4402", "", "", "COP4020", "", "CEN3031", "", "", "", "", "", ""]);
sample2.set("S", ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
sample2.set("ONLINE", [])

let sampleSchedule = {template: sample1};
let samples = [sample1, sample2];

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