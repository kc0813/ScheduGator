import { Course } from "../../Course";
import HoverBtn from "./HoverButton";

export function SelectedCourses(props: {courseList: Course[], deletable: boolean, DeleteCourse: (courseID: string) => void, colorMap:Map<string, string>, setColorMap: (colorMap:Map<string, string>) => void}) {

    let courseBtns: JSX.Element[] = []
    let temp: number = 5.5;
    let top: string = "5.5vh";
   
    props.courseList.forEach((course: Course) => {
        courseBtns.push(
            <HoverBtn 
                courseID={course.code} 
                top={top} 
                deletable={props.deletable} 
                delete={() => props.DeleteCourse(course.code)} 
                color={props.colorMap.get(course.code)!}/>
        )
        temp += 6.2;
        top = temp.toString() + "vh";

        
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