import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMedia, Media } from '../api/mediaApi';
import MediaCard from '../components/MediaCard';
import SearchBar from '../components/SearchBar';
import '../styles/search.css';

const Search = () => {
  const [results, setResults] = useState<Media[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await getMedia();
      const filtered = response.data.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.genres?.some((g) => g.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
    } catch (err) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (mediaId: string) => {
    navigate(`/media/${mediaId}`);
  };

  return (
    <div className="search-container">
      <h1>Search Media</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <div className="loading">Searching...</div>}

      {searched && !loading && (
        <>
          {results.length === 0 ? (
            <div className="empty-state">
              <p>No results found</p>
            </div>
          ) : (
            <>
              <p className="results-count">Found {results.length} result(s)</p>
              <div className="media-grid">
                {results.map((m) => (
                  <MediaCard key={m._id} media={m} onViewDetails={handleViewDetails} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
