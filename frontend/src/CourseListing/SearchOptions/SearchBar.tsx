import React from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Course } from '../../Course';

interface CourseResponse {
    COURSES: Course[]
    LASTCONTROLNUMBER: number
    RETRIEVEDROWS: number
    TOTALROWS: number
}

function SearchBar(
    props: {AddCourse: (course: Course) => void }
) {

    /*Purpose: When the user hits enter, perform input validation and make an API call for valid inputs
               For valid courses, call the AddCourse function that was passed in.

    */
    const getInputValue = (event: React.KeyboardEvent<HTMLInputElement> | undefined) => {

        //guard clauses
        if (!event) { return }
        if (event.key !== 'Enter') { return }

        const userValue = event.currentTarget.value.toUpperCase();

        if (!validateInput(userValue)) {
            //Notify on a bad entry
            alert("'" + userValue + "' is not a valid course!");
            event.preventDefault();  // Stop page from refreshing after pressing enter
            return
        }

        getClasses(userValue)
        
        event.currentTarget.value = "";  // Clear search bar
        event.preventDefault();  // Stop page from refreshing after pressing enter
    };

    //Purpose: make an API call to find the user-specified course in the schedule of courses 
    async function getClasses(courseCode: string): Promise<any> {
        let options = {
            body: { "courseCode": courseCode },
            url: 'http://localhost:8000/class/',  // change port if necessary
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            } as AxiosRequestConfig['headers'],
        }
        const response = await axios.put<any, AxiosResponse<CourseResponse[]>>(options.url, options.body, options.headers)

        const data: CourseResponse = response.data[0]
        if(data.RETRIEVEDROWS == 0) {
            alert(courseCode + ' is not in our database for this semester!')
        }
        else {
            const course: Course = data.COURSES[0]
            props.AddCourse(course)
        }

    }

    //Purpose: Check if the input was a valid courseID 
    const validateInput = (input: string): boolean => {
        //Reference for valid inputs:
        //https://archive.registrar.ufl.edu/catalog/catalogarchive/99-00-catalog/course-numbering.html

        //Check length of input
        if (input.length < 7 || input.length > 8) {
            return false;
        }
        //Check for a Lab Code at the end
        else if (input.length === 8 && (input.charAt(7) !== 'C' && input.charAt(7) !== 'L')) {
            return false;
        }

        //Check that prefix has only letters
        var prefix = input.substring(0, 3);
        if (!(/^[A-Z]+$/.test(prefix))) {
            return false;
        }
        //Check that the code has 4 digits after the prefix
        var digits = input.substring(3, 7);
        if (!(/^[0-9]+$/.test(digits))) {
            return false;
        }

        return true;
    }

    return (
        <form action="/" method="get">
            <input
                type="text"
                id="searchBar"
                placeholder="Enter Courses"
                name="s"
                onKeyPress={getInputValue}
            />
        </form>
    )
}

export default SearchBar;
