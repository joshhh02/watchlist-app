// hsp - MediaCard.tsx
// Search result card used in the Search page and navbar dropdown.
// Fixes applied:
//   - Poster fallback: shows a clean grey placeholder instead of broken img
//   - Cards stay aligned whether or not a poster is available
//   - "Add to Watchlist" button remains visible and styled cleanly

import { useState } from 'react';
import '../styles/mediacard.css';
import { OmdbSearchResult } from '../api/mediaApi';

interface MediaCardProps {
  media: OmdbSearchResult;
  onViewDetails: (imdbID: string) => void;
  onAddToWatchlist?: (
    imdbID: string,
    mediaMeta?: { title?: string; poster?: string }
  ) => Promise<string>;
}

const MediaCard = ({ media, onViewDetails, onAddToWatchlist }: MediaCardProps) => {
  const [feedback, setFeedback] = useState('');
  const [adding, setAdding] = useState(false);

  // Check whether the poster URL is actually usable
  const hasPoster =
    media.poster &&
    media.poster !== 'N/A' &&
    media.poster.startsWith('http');

  const handleAdd = async () => {
    if (!onAddToWatchlist) return;
    setAdding(true);
    const msg = await onAddToWatchlist(media.imdbID, {
      title: media.title,
      poster: media.poster,
    });
    setFeedback(msg);
    setAdding(false);
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <div className="media-card">
      {/* Poster area — clean fallback if missing */}
      <div className="media-card-poster">
        {hasPoster ? (
          <img
            src={media.poster}
            alt={media.title}
            className="media-card-poster-img"
          />
        ) : (
          <div className="media-card-poster-placeholder">No Image</div>
        )}
      </div>

      {/* Info */}
      <div className="media-info">
        <h3>{media.title}</h3>
        <p className="media-type">{media.type}</p>
        <p className="media-year">{media.year}</p>

        <div className="card-actions">
          <button
            onClick={() => onViewDetails(media.imdbID)}
            className="details-btn"
          >
            Details
          </button>

          {onAddToWatchlist && (
            <button
              onClick={handleAdd}
              disabled={adding}
              className="watchlist-btn"
            >
              {adding ? '...' : '+ Watchlist'}
            </button>
          )}
        </div>

        {feedback && <p className="card-feedback">{feedback}</p>}
      </div>
    </div>
  );
};

export default MediaCard;

