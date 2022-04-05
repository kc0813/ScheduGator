import { useState } from "react";
import SelectedCourses from "./SelectedCourses/SelectedCourses";
import SearchOptions from "./SearchOptions/SearchOptions";


function CourseListing(props: {setRenderWin: (state: string) => void}) {

    const [courseList, setCourseList] = useState<string[]>([])

    const DeleteCourse = (courseID: string) => {
        const index = courseList.indexOf(courseID);
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

    const AddCourse = (courseID: string) => {
        if (!courseList.includes(courseID)) {
            //make copy of list
            let tempList = courseList.slice()
            tempList.push(courseID)
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