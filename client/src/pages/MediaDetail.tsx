import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaById, getComments, addComment, Media, Comment } from '../api/mediaApi';
import { AuthContext } from '../context/AuthContext';
import '../styles/mediadetail.css';

const MediaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [media, setMedia] = useState<Media | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const context = useContext(AuthContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { user } = context;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const mediaResponse = await getMediaById(id);
        setMedia(mediaResponse.data);

        const commentsResponse = await getComments(id);
        setComments(commentsResponse.data);
      } catch (err) {
        setError('Failed to load media details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !id) return;

    try {
      const response = await addComment({
        mediaId: id,
        userId: user._id,
        commentText: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!media) {
    return <div className="error-message">Media not found</div>;
  }

  return (
    <div className="media-detail-container">
      <div className="media-detail-header">
        <div className="media-poster">
          {media.posterUrl ? (
            <img src={media.posterUrl} alt={media.title} />
          ) : (
            <div className="placeholder-poster">No Image</div>
          )}
        </div>
        <div className="media-details">
          <h1>{media.title}</h1>
          <p className="media-type">{media.type}</p>
          <p className="media-year">{media.releaseYear}</p>
          <p className="media-genres">{media.genres?.join(', ')}</p>
          <p className="media-description">{media.description}</p>
        </div>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        {user && (
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              required
            />
            <button type="submit" className="submit-btn">
              Add Comment
            </button>
          </form>
        )}
        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p className="comment-author">{comment.userId}</p>
                <p className="comment-text">{comment.commentText}</p>
                {comment.rating && <p className="comment-rating">Rating: {comment.rating}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaDetail;
