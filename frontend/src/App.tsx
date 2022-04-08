import { useState } from 'react';
import './App.css';
import Schedule from './Schedule/Schedule';
import CourseListing from './CourseListing/CourseListing';
import { Course } from "./Course";

function App() {
	const [renderWin, setRenderWin] = useState("Courses");
	const [courseList, setCourseList] = useState<Course[]>([])

	if(renderWin == "Courses"){
		return <CourseListing setRenderWin={setRenderWin} setCourseList={setCourseList} courseList={courseList}/>;
	}
	else{
		return <Schedule setRenderWin={setRenderWin} courseList={courseList}/>;
	}

}

export default App