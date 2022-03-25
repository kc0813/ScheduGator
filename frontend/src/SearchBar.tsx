const getInputValue = (event: any)=>{
    // do cool stuff here
    if (event.key === 'Enter') {
        const userValue = event.target.value;
        console.log(userValue);
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
  