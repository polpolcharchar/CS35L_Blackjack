import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import './NavigationBar.css';

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('userName') || '';
      setIsLoggedIn(!!token);
      setUsername(user);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    const interval = setInterval(checkAuth, 500);

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, [location]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/auth/login');
  };

  const handleSearch = () => {
    navigate('/auth/search');
  };

  return (
    <header className="navbar-appbar">
        <div className="navbar-buttons">
          {isLoggedIn ? (
            <>
              <div className="navbar-user-area" title={username || 'Logged in'}>
                <span className="navbar-logged-in-tooltip">
                  {username ? `Logged in as ${username}` : 'Logged in'}
                </span>
              </div>
              <button
                type="button"
                className="uiButton"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth/login" className="uiButton">
              Login
            </Link>
          )}

              <button
                type="button"
                className="uiButton"
                onClick={handleSearch}
              >
                Search Players
              </button>
          
        </div>
    </header>
  );
};

export default NavigationBar;
