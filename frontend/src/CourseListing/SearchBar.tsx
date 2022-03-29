import React from 'react';


function SearchBar(props: {AddCourse: (courseID: string) => void}) {

    const getInputValue = (event: React.KeyboardEvent<HTMLInputElement> | undefined)=>{
        // do cool stuff here
        if (!event) {
            return
        }
        if (event.key === 'Enter') {
            const userValue = event.currentTarget.value.toLowerCase();

            if(validateInput(userValue))
                props.AddCourse(userValue)
            else
            {
                //alert(userValue);
                //Notify bad entry?
            }
            event.preventDefault();  // Stop page from refreshing after pressing enter
            event.currentTarget.value = "";  // Clear search bar
          }
    };  

    function validateInput(input : string) : boolean {
        //Reference for valid inputs: h
        //https://archive.registrar.ufl.edu/catalog/catalogarchive/99-00-catalog/course-numbering.html

        //Check length of input
        if(input.length < 7 || input.length > 8){
            return false;
        }
        //Check for a Lab Code at the end
        else if(input.length == 8 && (input.charAt(7) != 'c' &&  input.charAt(7) != 'l'))
        {
            return false;
        }

        //Check that prefix has only letters
        var prefix = input.substring(0,3);
        if(!(/^[a-z]+$/.test(prefix))) 
        {
            return false;
        }
        //Check that the code has 4 digits after the prefix
        var digits = input.substring(3,7);
        if(!(/^[0-9]+$/.test(digits))){
            alert(digits)
            return false;
        }

        return true;
    }
    
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
  