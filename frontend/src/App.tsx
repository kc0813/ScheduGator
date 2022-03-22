import { useState } from 'react';
import './App.css';
import Schedule from './Schedule';
import CourseListing from './CourseListing';

function App() {
	const [renderWin, setRenderWin] = useState("Courses");

	if(renderWin == "Courses"){
		return CourseListing(setRenderWin);
	}
	else{
		return Schedule(setRenderWin);
	}

}

export default App