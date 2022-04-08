import { useState } from "react";
import SelectedCourses from "./SelectedCourses/SelectedCourses";
import SearchOptions from "./SearchOptions/SearchOptions";
import { Course } from "../Course";


function CourseListing(
    props: {
            setRenderWin: (state: string) => void, 
            setCourseList:(courseList: Course[]) => void, 
            courseList: Course[]}
            ){

    //const [courseList, setCourseList] = useState<Course[]>([])

    const DeleteCourse = (courseID: string) => {
        let index = -1
        
        //find course in list
        for (let i = 0; i < props.courseList.length; i++) {
            if (props.courseList[i].code == courseID) {
                index = i
            }
        }

        if (index !== -1) {
            //make copy of list
            let templist = props.courseList.slice()
            templist.splice(index, 1)
            props.setCourseList(templist)
            console.log("DELETED")
            console.log(props.courseList.length + " courses in List")
        }
        else {
            console.log("Course not found to delete")
        }
    }

    const AddCourse = (course: Course) => {
        const courseID: string = course.code
        if (!props.courseList.includes(course)) {
            //make copy of list
            let tempList = props.courseList.slice()
            tempList.push(course)
            props.setCourseList(tempList)
            console.log("ADDED: " + courseID)
            console.log(props.courseList.length + " courses in List")
        }
        else {
            console.log("ALREADY IN")
        }
    }

    return (
        <div className="CourseListing">
            <header className="Schedule-header">

                <div className="ToggleSchedule">
                    <button onClick={() => props.setRenderWin("SampleSchedule")}>
                        See Sample Schedules
                    </button>
                </div>

                <SelectedCourses
                    courseList={props.courseList}
                    DeleteCourse={DeleteCourse}
                />

                <SearchOptions AddCourse={AddCourse}/>

                <div className="courses">
                </div>

            </header>
        </div>
    );
}

export default CourseListing