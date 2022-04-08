import { useState } from "react";
import SelectedCourses from "./SelectedCourses/SelectedCourses";
import SearchOptions from "./SearchOptions/SearchOptions";
import { Course } from "../Course";


function CourseListing(props: {setRenderWin: (state: string) => void}) {

    const [courseList, setCourseList] = useState<Course[]>([])

    const DeleteCourse = (courseID: string) => {
        let index = -1
        
        //find course in list
        for (let i = 0; i < courseList.length; i++) {
            if (courseList[i].code == courseID) {
                index = i
            }
        }

        if (index !== -1) {
            //make copy of list
            let templist = courseList.slice()
            templist.splice(index, 1)
            setCourseList(templist)
            console.log("DELETED")
            console.log(courseList.length + " courses in List")
        }
        else {
            console.log("Course not found to delete")
        }
    }

    const AddCourse = (course: Course) => {
        const courseID: string = course.code
        if (!courseList.includes(course)) {
            //make copy of list
            let tempList = courseList.slice()
            tempList.push(course)
            setCourseList(tempList)
            console.log("ADDED: " + courseID)
            console.log(courseList.length + " courses in List")
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
                    courseList={courseList}
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