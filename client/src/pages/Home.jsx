import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMedia } from '../api/mediaApi';
import MediaCard from '../components/MediaCard';
import SearchBar from '../components/SearchBar';
import '../styles/home.css';

const Home = () => {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await getMedia();
        setMedia(response.data);
        setFilteredMedia(response.data);
      } catch (err) {
        setError('Failed to load media');
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredMedia(media);
      return;
    }

    const filtered = media.filter(
      (m) =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.genres?.some((g) => g.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredMedia(filtered);
  };

  const handleViewDetails = (mediaId) => {
    navigate(`/media/${mediaId}`);
  };

  if (loading) {
    return <div className="loading">Loading media...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-container">
      <h1>Discover Media</h1>
      <SearchBar onSearch={handleSearch} />
      {filteredMedia.length === 0 ? (
        <div className="empty-state">
          <p>No media found</p>
        </div>
      ) : (
        <div className="media-grid">
          {filteredMedia.map((m) => (
            <MediaCard key={m._id} media={m} onViewDetails={handleViewDetails} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
