import { useState } from 'react';

let courseList :string[] = ["test", "1", "asdf"];

export function addCourse(courseID : string){
  if(!courseList.includes(courseID)){
    courseList.push(courseID);
  }
}

function removeCourse(courseID : string){

  const index = courseList.indexOf(courseID, 0);
  if (index > -1) {
    courseList.splice(index, 1);
  }
  console.log("DELETED")
  console.log(courseList.length)
}

function HoverBtn(props : any) {
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
            {props.courseID}a

          </div>
      </div>
  );
}

export function SelectedCourses()
{
  const [test, setTest] = useState(0);
  const deleteCourseBtn = (courseID : string) => {
    removeCourse(courseID);
    setTest(courseList.length);
  }

  let courseBtns : any = [] //any b/c I dunno what type to give it
  let top = 10;
  courseList.forEach(function(courseID : string){
      courseBtns.push(
        <HoverBtn courseID = {courseID} top = {top} delete = {() => deleteCourseBtn(courseID)}></HoverBtn>
      )
      top += 30;
  });

  return(
    <div className='SelCourses'>
    <>
     {courseBtns} 
    </>
    </div>
  );

  
}

export default SelectedCourses;