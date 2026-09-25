import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
  const [user] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || 'home';
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
    setMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'journal', label: 'Journal', icon: '📖' },
    { id: 'play', label: 'Play', icon: '🎮' }
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMenuOpen(false);
  };

  return (
    <header className="app-header paper-texture border-b-2 border-opacity-20 relative" style={{ borderColor: 'var(--warm-brown)' }}>
      <div className="px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 flex items-center justify-center text-lg sm:text-xl">
            ✨
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-journal font-semibold truncate" style={{ color: 'var(--deep-brown)' }}>
            Mindstamps
          </h1>
        </div>

        {/* Desktop / tablet nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-full transition-all duration-300 ${
                currentPage === item.id
                  ? 'bg-gradient-to-r from-orange-200 to-yellow-200 shadow-md'
                  : 'hover:bg-gradient-to-r hover:from-orange-100 hover:to-yellow-100'
              }`}
              style={{ color: 'var(--deep-brown)' }}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}

          {user && (
            <div className="flex items-center space-x-3 lg:space-x-4 ml-3 lg:ml-6 pl-3 lg:pl-6 border-l border-opacity-30" style={{ borderColor: 'var(--warm-brown)' }}>
              <div className="hidden lg:flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center text-sm">
                  {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium max-w-[140px] truncate" style={{ color: 'var(--deep-brown)' }}>
                  {user.displayName || user.email?.split('@')[0] || 'User'}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, var(--dusty-rose) 0%, var(--warm-brown) 100%)',
                  color: 'white'
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </nav>

        {/* Mobile hamburger toggle */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
          style={{ color: 'var(--deep-brown)' }}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="text-2xl leading-none">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile dropdown nav */}
      {menuOpen && (
        <nav className="md:hidden paper-texture border-t border-opacity-20 px-4 py-3 flex flex-col space-y-1" style={{ borderColor: 'var(--warm-brown)' }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                currentPage === item.id
                  ? 'bg-gradient-to-r from-orange-200 to-yellow-200 shadow-md'
                  : 'hover:bg-gradient-to-r hover:from-orange-100 hover:to-yellow-100'
              }`}
              style={{ color: 'var(--deep-brown)' }}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}

          {user && (
            <div className="flex items-center justify-between pt-2 mt-1 border-t border-opacity-30" style={{ borderColor: 'var(--warm-brown)' }}>
              <div className="flex items-center space-x-2 min-w-0">
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center text-sm">
                  {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium truncate" style={{ color: 'var(--deep-brown)' }}>
                  {user.displayName || user.email?.split('@')[0] || 'User'}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, var(--dusty-rose) 0%, var(--warm-brown) 100%)',
                  color: 'white'
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;