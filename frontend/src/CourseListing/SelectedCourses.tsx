import { useState } from 'react';
import SearchBar from './SearchBar';

function HoverBtn(props : {courseID: string, top: number, delete: () => void}) {
  const [style, setStyle] = useState({display: 'none'});

  return (
      <div className="hoverBtn">
          <div style={{border: '1px solid gray', width: 110, height: 20, padding: 2, margin: 1,
                       position:'absolute', left: 30, top: props.top}}
               onMouseEnter={e => {
                   setStyle({display: 'inline'});
               }}
               onMouseLeave={e => {
                   setStyle({display: 'none'})
               }}
          >
            <button className = 'inLine' style={style} onClick = {props.delete}>x</button> 
            {props.courseID}
          </div>
      </div>
  );
}

function SelectedCourses() {

  const [courseList, setCourseList] = useState<string[]>([''])

  const deleteCourseBtn = (courseID : string) => {
    removeCourse(courseID);
  }

  const AddCourse = (courseID : string) => {
    if(!courseList.includes(courseID)){
      //make copy of list
      let tempList = courseList.slice()
      tempList.push(courseID)
      setCourseList(tempList)
      console.log("ADDED: " + courseID)
      console.log(courseList.length + " courses in List")
    }
    else{
      console.log("ALREADY IN")
    }
  }

  const removeCourse = (courseID : string) => {
    const index = courseList.indexOf(courseID);
    if (index != -1) {
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


  let courseBtns : JSX.Element[] = []
  let top = 10;
  courseList.forEach(function(courseID : string){
      courseBtns.push(
        <HoverBtn courseID = {courseID} top = {top} delete = {() => deleteCourseBtn(courseID)}></HoverBtn>
      )
      top += 30;
  });

  return(
    <div className='SelCourses'>
      <SearchBar AddCourse={AddCourse}/>
      {courseBtns}
    </div>
  );

  
}

export default SelectedCourses;