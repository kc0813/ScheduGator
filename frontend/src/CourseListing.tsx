import SearchBar from "./Search";


function CourseListing(setRenderWin : Function)
{
    return (
        <div className="App">
        <header className="App-header">

            <div className="ToggleSchdl">
                <button
                    onClick = {() => setRenderWin("SampSchdl")}
                >
                    See Sample Schedules
                </button> 
            </div>
            
            <div className="listCourses">
                List of Courses
                <SearchBar/>
            </div>

            <div className="searchOptions">
                Search Options
            </div>

            <div className="courses">
            </div>

        </header>
        </div>
    );
}

export default CourseListing