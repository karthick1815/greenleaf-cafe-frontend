import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastContext';

const ADMIN_PASSWORD = 'admin123';

const navItems = [
  { to: 'dashboard', label: 'Dashboard' },
  { to: 'menu', label: 'Menu' },
  { to: 'orders', label: 'Orders' },
  { to: 'reservations', label: 'Reservations' },
  { to: 'employees', label: 'Employees' },
  { to: 'reviews', label: 'Reviews' },
  { to: 'contacts', label: 'Messages' }
];

export default function AdminLayout() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('gl_admin') === '1');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const showToast = useToast();

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('gl_admin', '1');
      setLoggedIn(true);
      navigate('dashboard');
    } else {
      showToast('Incorrect password');
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('gl_admin');
    setLoggedIn(false);
    navigate('/');
  }

  if (!loggedIn) {
    return (
      <div className="login-shell">
        <div className="login-box">
          <h2>Admin Login</h2>
          <p className="hint">Demo only — password is checked in the browser.</p>
          <form className="stack" onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Password (hint: admin123)"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn">Log In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <h3>Green Leaf Admin</h3>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            {item.label}
          </NavLink>
        ))}
        <button onClick={handleLogout}>Logout</button>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
