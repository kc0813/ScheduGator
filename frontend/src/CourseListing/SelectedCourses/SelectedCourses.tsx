import { Course } from "../../Course";
import HoverBtn from "./HoverButton";

export function SelectedCourses(props: {courseList: Course[], deletable: boolean, DeleteCourse: (courseID: string) => void}) {

    let courseBtns: JSX.Element[] = []
    let top = 10;
   
    props.courseList.forEach((course: Course) => {
            courseBtns.push(
            <HoverBtn courseID={course.code} top={top} deletable={props.deletable} delete={() => props.DeleteCourse(course.code)} />
        )
        top += 30;
    });

    return (
        <div id='SelCourses' className='listCourses'>
            List of Courses
            <div id='CourseListButtons'>
                {courseBtns}
            </div>
        </div>
    );
}

export default SelectedCourses;