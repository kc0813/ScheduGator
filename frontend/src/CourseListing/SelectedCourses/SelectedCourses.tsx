import { Course } from "../../Course";
import HoverBtn from "./HoverButton";

export function SelectedCourses(props: {courseList: Course[], deletable: boolean, DeleteCourse: (courseID: string) => void}) {

    let courseBtns: JSX.Element[] = []
    let top = 38; //MAKE THIS RELATIVE
   
    props.courseList.forEach((course: Course) => {
            courseBtns.push(
            <HoverBtn courseID={course.code} top={top} deletable={props.deletable} delete={() => props.DeleteCourse(course.code)} />
        )
        top += 38;
    });

    return (
        <div className='listCourses'>
            List of Courses
            <div id='courseListButtons'>
                {courseBtns}
            </div>
        </div>
    );
}

export default SelectedCourses;