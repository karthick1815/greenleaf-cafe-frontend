import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/order', label: 'Order' },
  { to: '/reserve', label: 'Book Table' },
  { to: '/review', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
  { to: '/admin', label: 'Admin' }
];

export default function Navbar() {
  return (
    <header>
      <div className="logo"><h1>🌿 Green Leaf Cafe</h1></div>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
