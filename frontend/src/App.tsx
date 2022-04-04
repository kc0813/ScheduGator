import { useState } from 'react';
import './App.css';
import Schedule from './Schedule/Schedule';
import CourseListing from './CourseListing/CourseListing';

function App() {
	const [renderWin, setRenderWin] = useState("Courses");

	if(renderWin == "Courses"){
		return <CourseListing setRenderWin={setRenderWin} />;
	}
	else{
		return <Schedule setRenderWin={setRenderWin}/>;
	}

}

export default App