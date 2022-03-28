import React from 'react';
import {AddCourse} from './SelectedCourses'

const getInputValue = (event: React.KeyboardEvent<HTMLInputElement> | undefined)=>{
    // do cool stuff here
    if (!event) {
        return
    }
    if (event.key === 'Enter') {
        const userValue = event.currentTarget.value;
        alert(userValue);
        AddCourse(userValue)
        event.preventDefault();  // Stop page from refreshing after pressing enter
      }
};

const SearchBar = () => (
    <form action="/" method="get" className = "SearchBar">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search Courses"
            name="s"
            onKeyPress={getInputValue}
        />
    </form>
  );

  export default SearchBar;
  