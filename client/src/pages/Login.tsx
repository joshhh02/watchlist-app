// hsp - Login.tsx
// Matches the /login mockup: compact centered form with Username + Password fields
// and a dark "Submit" button. Mostly open/empty whitespace below.
// Login now sends username (not email) to match the updated backend.

import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/mediaApi';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) return <div>Loading...</div>;

  const { login } = context;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Backend now accepts username instead of email
      const response = await loginUser(username, password);
      const { user, token } = response.data;
      login(user, token);
      navigate('/');
    } catch (err: unknown) {
      const axiosError = err as any;
      setError(axiosError.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-wrap">
        <h1 className="auth-title">Log In</h1>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? 'Logging in...' : 'Submit'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


