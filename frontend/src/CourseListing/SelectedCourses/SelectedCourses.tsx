import HoverBtn from "./HoverButton";

export function SelectedCourses(props: {courseList: string[], DeleteCourse: (courseID: string) => void}) {

    let courseBtns: JSX.Element[] = []
    let top = 10;
    props.courseList.forEach((courseID: string) => {
        courseBtns.push(
            <HoverBtn courseID={courseID} top={top} delete={() => props.DeleteCourse(courseID)} />
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