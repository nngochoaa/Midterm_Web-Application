import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Trang Chủ' },
    { to: '/shop', label: 'Shop' },
    { to: '/live/1', label: '🔴 LIVE' },
    { to: '/benchmark', label: 'CDN Demo' },
  ];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,10,0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #2e2e2e',
      padding: '0 40px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      height: '60px',
    }}>
      <Link to="/" style={{ fontFamily: 'Bebas Neue', fontSize: '26px', letterSpacing: '0.1em', color: 'var(--red)' }}>
        LIVESTORE
      </Link>

      <div style={{ display: 'flex', gap: '32px' }}>
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: location.pathname === link.to ? 'var(--red)' : 'var(--white)',
              borderBottom: location.pathname === link.to ? '2px solid var(--red)' : '2px solid transparent',
              paddingBottom: '2px',
              transition: 'color 0.2s',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}