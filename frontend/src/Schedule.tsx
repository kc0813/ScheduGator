function Schedule(setRenderWin : Function)
{
	return(
    <div className="App">
        <div className="ToggleCourses">
            <button onClick = {() => setRenderWin("Courses")}>See Courses</button> 
        </div>
    </div>
	);
}

export default Schedule