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

/*
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
var awaitingAPI = true
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
    //let samplesList: Schedule[] = samples
    //let samplesList: Schedule[] = []

    //See frontend/CourseListing/SearchOptions/SearchBar for previous call as a template
    const getSampleSchedules = async () => {
        //props.courseList is the list of courses. (from Course.ts)
        //props.filteredTimes is the list of timeslots (from UF.ts)
        //store in a variable of type ScheduleResponse
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
        if(sampleSchedules.length == 0){
        //console.log("Response: ", response.data.schedules);
            for (const key in response.data.schedules) { 
                const temp: Template = {//
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
            //console.log("SETTING")
            console.log(schedList)
            setSampleSchedules(schedList)
        }
        //console.log("inside getter: ", sampleSchedules) 
        //return response.data.schedules
    }

    
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

    /*https://www.w3schools.com/js/js_promise.asp
    let myPromise = new Promise(function(myResolve, myReject) {
        // "Producing Code" (May take some time)

        myResolve(); // when successful
        myReject();  // when error
    });

    // "Consuming Code" (Must wait for a fulfilled Promise)
    myPromise.then(
        function(value) { /* code if successful  },
        function(error) { /* code if some error }
    );
    */
    if(sampleSchedules.length == 0){
        if(awaitingAPI){
            getSampleSchedules()
            awaitingAPI = false
            console.log("AT RETURN: " + awaitingAPI)
            return (
                <div className="Schedule-header"><img id="loading" src={loading} width="100vh" height="100vh"/></div>
            )
        }
        else{
            return <div>fuck</div>
        }
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
                            colorMap={props.colorMap} />
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