export default function Footer() {
  return (
    <footer style={{
      background: '#0f0f0f',
      borderTop: '1px solid #2e2e2e',
      padding: '40px',
      textAlign: 'center',
      color: 'var(--gray-light)',
      fontSize: '13px',
    }}>
      <p style={{ fontFamily: 'Bebas Neue', fontSize: '22px', color: 'var(--red)', marginBottom: '8px' }}>
        LIVESTORE
      </p>
      <p>Nền tảng livestream bán hàng — Demo minh họa CDN trong Web Programming</p>
      <p style={{ marginTop: '8px', opacity: 0.5 }}>© 2025 — Topic 8: Content Delivery Networks</p>
    </footer>
  );
}