import SelectedCourses from "../CourseListing/SelectedCourses/SelectedCourses";
import Calendar from "./Calendar";
import { Course, Schedule, Template } from "../Course";
import { TimeSlot } from "../UF"
import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import loading from '../Images/loading.gif';

interface ScheduleResponse {
    schedules: Schedule[]
}

/*Example schedules used to visually verify output before frontend could make API calls to the backend 
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
sample2.set("ONLINE", ["MAS3114"])

let sampleSchedule1 = { template: sample1 };
let sampleSchedule2 = { template: sample2 };
let samples = [sampleSchedule1, sampleSchedule2];
*/

function ScheduleListing(
    props: {
        setRenderWin: (state: string) => void,
        courseList: Course[],
        colorMap: Map<string, string>,
        setColorMap: (colorMap: Map<string, string>) => void,
        filteredTimes: TimeSlot[]
    }
) {
    const [i, setI] = useState<number>(0);
    const [sampleSchedules, setSampleSchedules] = useState<Schedule[]>([])

    //Make API call to run the schedule builder algo. and return a list of sample schedules
    const getSampleSchedules = async () => {
        const options = {
            url: "http://localhost:8000/buildSchedule/",
            data: {
                courses: props.courseList,
                times: props.filteredTimes,
            },
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            } as AxiosRequestConfig['headers']
        }
        const response = await axios.post<any, AxiosResponse<ScheduleResponse>>(options.url, options.data, options.headers)
        let schedList: Schedule[] = []
        
        //check if sampleSchedules has already been populated, if so don't run this again.
        if(sampleSchedules.length == 0){
            for (const key in response.data.schedules) { 
                const temp: Template = {
                    M: response.data.schedules[key].template.M,
                    T: response.data.schedules[key].template.T,
                    W: response.data.schedules[key].template.W,
                    R: response.data.schedules[key].template.R,
                    F: response.data.schedules[key].template.F,
                    S: response.data.schedules[key].template.S,
                    ONLINE: response.data.schedules[key].template.ONLINE
                }
                const sched: Schedule = {
                    template: temp
                }
                schedList.push(sched)
            }
            //If an empty list (or no list) was returned, 
            if(schedList.length == 0){
                const sched: Schedule = {
                    template: {
                        M: [],
                        T: [],
                        W: [],
                        R: [], 
                        F: [],
                        S: [],
                        ONLINE: [],
                    }
                }
                //For if we don't want to immediately send them back to CourseListing
                //schedList.push(sched)
                alert("Sorry, there are no viable schedules based on the given parameters."+
                      "\n\nPlease change your courses or reserved times and try again")
                props.setRenderWin("Courses")
            }
            console.log(schedList)
            setSampleSchedules(schedList)
        }
    }

    
    /*Purpose: Called when a user clicks Prev or Next schedule button
               Changes the index used to call a schedule from sampleSchedule

      Parameters: 
        isNext - tracks if the user clicked to move to the next schedule or not
    */
    const onChangeSample = (isNext: boolean) => {
        if (isNext) {
            setI(i + 1)
        }
        else if (i - 1 < 0) {
            setI(sampleSchedules.length - 1)
        }
        else {
            setI(i - 1)
        }
    }

    //If we haven't recieved something from the API yet, show a loading screen
    //Else, display the ScheduleListing page
    if(sampleSchedules.length == 0){
        getSampleSchedules()
        return (
            <div className="Schedule-header"><img id="loading" src={loading} width="100vh" height="100vh"/></div>
        )
    }
    else{
        return (
            <div className="Schedule">
                <header className="Schedule-header">
    
                    <div className="ToggleCourses">
                        <button onClick={() => props.setRenderWin("Courses")}>
                            See Courses
                        </button>
                    </div>
    
                    <SelectedCourses
                        courseList={props.courseList}
                        deletable={false}
                        DeleteCourse={() => { }}
                        colorMap={props.colorMap}
                        setColorMap={props.setColorMap}
                    />
    
                    <div className="searchOptions">
                        Course Info
                    </div>
    
                    <div className="courses">
                        <Calendar
                            schedule={sampleSchedules[i % sampleSchedules.length]}
                            colorMap={props.colorMap}
                            scheduleNum={(i % sampleSchedules.length) + 1}/>
                        <div className="nextPrev">
                            <button onClick={e => { onChangeSample(false) }}>
                                Prev Schedule
                            </button>
                            <button onClick={e => { onChangeSample(true) }}>
                                Next Schedule
                            </button>
                        </div>
                    </div>
    
                </header>
            </div>
        );
    }
}

export default ScheduleListing