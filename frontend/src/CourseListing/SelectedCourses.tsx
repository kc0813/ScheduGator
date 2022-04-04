import { useState } from 'react';
import SearchBar from './SearchBar';
import HoverBtn from './HoverButton';



export function SelectedCourses() {

    const [courseList, setCourseList] = useState<string[]>([])

    const deleteCourseBtn = (courseID: string) => {
        removeCourse(courseID);
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

    const removeCourse = (courseID: string) => {
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


    let courseBtns: JSX.Element[] = []
    let top = 10;
    courseList.forEach(function (courseID: string) {
        courseBtns.push(
            <HoverBtn courseID={courseID} top={top} delete={() => deleteCourseBtn(courseID)} />
        )
        top += 30;
    });

    return (
        <div id='SelCourses' className='listCourses'>
            List of Courses
            <div className='inputBar'>
                <SearchBar AddCourse={AddCourse} />
            </div>
            <div id='CourseListButtons'>
                {courseBtns}
            </div>
        </div>
    );
}

export default SelectedCourses;