import React from 'react';


function SearchBar(props: {AddCourse: (courseID: string) => void}) {

    const getInputValue = (event: React.KeyboardEvent<HTMLInputElement> | undefined)=>{
        // do cool stuff here
        if (!event) {
            return
        }
        if (event.key === 'Enter') {
            const userValue = event.currentTarget.value;
            props.AddCourse(userValue)
            event.preventDefault();  // Stop page from refreshing after pressing enter
          }
    };  

    return (
        <form action="/" method="get" className = "SearchBar">
            <input
                type="text"
                id="header-search"
                placeholder="Enter Courses"
                name="s"
                onKeyPress={getInputValue}
                />
        </form>
    )
}

  export default SearchBar;
  