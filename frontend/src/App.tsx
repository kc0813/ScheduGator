import { useState } from 'react';
import './App.css';
import ScheduleListing from './Schedule/Schedule';
import CourseListing from './CourseListing/CourseListing';
import { Course } from "./Course";

function App() {
	const [renderWin, setRenderWin] = useState("Courses");
	const [courseList, setCourseList] = useState<Course[]>([])
	const [colorMap, setColorMap] = useState<Map<string, string>>(new Map<string, string>())

	if(renderWin == "Courses"){
		return <CourseListing 
			setRenderWin={setRenderWin} 
			setCourseList={setCourseList} 
			courseList={courseList} 
			colorMap={colorMap}
			setColorMap={setColorMap}/>;
	}
	else{
		return <ScheduleListing setRenderWin={setRenderWin} courseList={courseList} colorMap={colorMap} setColorMap={setColorMap}/>;
	}

}

export default App