// hsp - UserPublicProfile.tsx  (route: /users/:userId)
// Shows a minimal public profile view for another user.
// If profileVisibility is "private", shows "This profile is private."
// If public, shows username + join date in a clean layout.

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPublicUser, PublicUser } from '../api/mediaApi';
import '../styles/profile.css';

const UserPublicProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      if (!userId) return;
      try {
        const res = await getPublicUser(userId);
        setUser(res.data);
      } catch {
        setError('User not found.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [userId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="profile-page"><p className="profile-search-hint">{error}</p></div>;
  if (!user) return null;

  return (
    <div className="profile-page">
      <h1 className="profile-heading">{user.username}</h1>

      {user.profileVisibility === 'private' ? (
        // Private profile — only show minimal info
        <div className="profile-card">
          <p className="profile-private-msg">This profile is private.</p>
        </div>
      ) : (
        // Public profile — show safe info
        <div className="profile-card">
          <div className="profile-info-row">
            <span className="profile-info-label">Username</span>
            <span className="profile-info-value">{user.username}</span>
          </div>
          {user.createdAt && (
            <div className="profile-info-row">
              <span className="profile-info-label">Joined</span>
              <span className="profile-info-value">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Back link */}
      <button className="profile-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
};

export default UserPublicProfile;
