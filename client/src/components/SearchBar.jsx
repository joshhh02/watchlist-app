import '../styles/searchbar.css';

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search media..."
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
