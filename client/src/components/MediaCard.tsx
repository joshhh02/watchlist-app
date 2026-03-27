import '../styles/mediacard.css';
import { Media } from '../api/mediaApi';

interface MediaCardProps {
  media: Media;
  onViewDetails: (mediaId: string) => void;
}

const MediaCard = ({ media, onViewDetails }: MediaCardProps) => {
  return (
    <div className="media-card">
      <div className="media-poster">
        {media.posterUrl ? (
          <img src={media.posterUrl} alt={media.title} />
        ) : (
          <div className="placeholder-poster">No Image</div>
        )}
      </div>
      <div className="media-info">
        <h3>{media.title}</h3>
        <p className="media-type">{media.type}</p>
        <p className="media-year">{media.releaseYear}</p>
        <p className="media-genres">{media.genres?.join(', ')}</p>
        <button onClick={() => onViewDetails(media._id)} className="details-btn">
          View Details
        </button>
      </div>
    </div>
  );
};

export default MediaCard;
