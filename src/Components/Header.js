import { NavLink } from 'react-router';  
import { useAuth } from './AuthContext';    
import { useTheme } from './ThemeContext'; 
import './Header.css';

const getActiveLinkStyle = ({ isActive }) => {
  if (isActive) return { color: '#26098d', borderBottom: '2px solid #26098d' };
  return { color: '#26098d' };
};

export default function Header() {
  const { isAuthenticated, logout } = useAuth(); 
  const { theme, toggleTheme } = useTheme(); 

  return (
    <header className="header">
      <nav className="nav">
        <div className="theme-toggle" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
          {theme === 'light' ? (
            <span role="img" aria-label="dark mode">🌙</span>  
          ) : (
            <span role="img" aria-label="light mode">☀️</span>  
          )}
        </div>

        <NavLink style={getActiveLinkStyle} to="/">
          Articles
        </NavLink>

        {isAuthenticated ? (
          <button onClick={logout}>Déconnexion</button>
        ) : (
          <>
            <NavLink style={getActiveLinkStyle} to="/connexion">
              Connexion
            </NavLink>
            <NavLink style={getActiveLinkStyle} to="/inscription">
              Inscription
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
