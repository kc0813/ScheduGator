import { useState } from "react";
import SelectedCourses from "./SelectedCourses/SelectedCourses";
import SearchOptions from "./SearchOptions/SearchOptions";
import {isCourseEqual} from "../Course";
import { Course } from "../Course";
import logo from '../Images/ScheduGator.png';
import {PeriodSlot, TimeSlot} from "../UF";

let colors = ["Blue", "Chocolate", "Crimson", "DarkGreen", "SteelBlue", "MediumVioletRed", "DarkSlateBlue", "HotPink"]

//Displays the CourseListing page 
function CourseListing(
    props: {
            setRenderWin: (state: string) => void, 
            setCourseList:(courseList: Course[]) => void, 
            courseList: Course[],
            colorMap: Map<string, string>,
            setColorMap: (colorMap: Map<string, string>) => void,
            filteredTimes: TimeSlot[],
            setFilteredTimes: (filteredTimes: TimeSlot[]) => void
        }
    ){

    const DeleteCourse = (courseID: string) => {
        let index = -1
        colors.push(props.colorMap.get(courseID)!)
        props.colorMap.delete(courseID)
        props.setColorMap(props.colorMap)


        //find course in list
        for (let i = 0; i < props.courseList.length; i++) {
            if (props.courseList[i].code == courseID) {
                index = i
            }
        }

        if (index !== -1) {
            //make copy of list
            let tempList = props.courseList.slice()
            tempList.splice(index, 1)
            props.setCourseList(tempList)
            console.log("DELETED")
            console.log(tempList.length + " courses in List")
        }
        else {
            console.log("Course not found to delete")
        }
    }

    const AddCourse = (course: Course) => {
        const courseID: string = course.code

        const hasRepeats = (rhs: Course)=>{
            let repeated = false
            props.courseList.forEach((lhs:Course) => {
                if(isCourseEqual(lhs, rhs)){
                    repeated = true;
                }
            })
            return repeated;
        };

        props.colorMap.set(courseID, colors[0])
        colors.splice(0, 1)
        props.setColorMap(props.colorMap)

        if (!hasRepeats(course)) {
            //make copy of list
            let tempList = props.courseList.slice()
            tempList.push(course)
            props.setCourseList(tempList)
            console.log("ADDED: " + courseID)
            console.log(tempList.length + " courses in List")
        }
        else {
            console.log(courseID + " ALREADY IN")
            alert("'" + courseID + "' has already been added!");
        }

    }

    const handleClick = () => {
         if (props.courseList.length != 0) {
            props.setRenderWin("SampleSchedule");
         }
         else{
            alert("Please add some courses")
         }
    }

    return (
        <div className="CourseListing">
            <header className="Schedule-header">

                <div className="ToggleSchedule">
                    <button onClick={handleClick}>
                        See Sample Schedules
                    </button>
                </div>

                <SelectedCourses
                    courseList={props.courseList}
                    deletable={true}
                    DeleteCourse={DeleteCourse}
                    colorMap={props.colorMap}
                    setColorMap={props.setColorMap}
                />

                <SearchOptions AddCourse={AddCourse} filteredTimes={props.filteredTimes} setFilteredTimes={props.setFilteredTimes}/>

                <div className="center">
                    <img id="logo" src={logo}/>
                </div>

            </header>
        </div>
    );
}

export default CourseListing