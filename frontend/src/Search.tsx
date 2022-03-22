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
        />
    </form>
  );

  export default SearchBar;
  