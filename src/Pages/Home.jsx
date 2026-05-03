import { Link } from 'react-router-dom';
import { liveStreams, products } from 'src/Data/MockData';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: '80px 40px',
        background: 'linear-gradient(135deg, #0a0a0a 60%, #1a0a08)',
        borderBottom: '1px solid #2e2e2e',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(230,51,41,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <p style={{ color: 'var(--red)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '12px', marginBottom: '16px' }}>
          ● ĐANG PHÁT SÓNG TRỰC TIẾP
        </p>
        <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(60px, 10vw, 120px)', lineHeight: 0.95, marginBottom: '24px' }}>
          MUA SẮM<br />
          <span style={{ color: 'var(--red)' }}>TRỰC TIẾP</span><br />
          CÙNG CHÚNG TÔI
        </h1>
        <p style={{ color: 'var(--gray-light)', maxWidth: '480px', marginBottom: '32px', fontSize: '16px' }}>
          Trải nghiệm mua sắm realtime với hình ảnh và video tốc độ cao nhờ công nghệ CDN.
        </p>
        <Link to="/live/1" style={{
          display: 'inline-block',
          background: 'var(--red)', color: 'white',
          padding: '14px 36px', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          fontSize: '14px',
          transition: 'background 0.2s',
        }}>
          Xem Livestream →
        </Link>
      </section>

      {/* Live Now */}
      <section style={{ padding: '60px 40px' }}>
        <h2 style={{ fontSize: '42px', marginBottom: '32px' }}>
          ĐANG <span style={{ color: 'var(--red)' }}>LIVE</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {liveStreams.map(stream => (
            <Link to={`/live/${stream.id}`} key={stream.id} style={{
              background: 'var(--gray)',
              overflow: 'hidden',
              display: 'block',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#1a1a1a', overflow: 'hidden' }}>
                <img
                  src={`https://picsum.photos/640/360?random=${stream.id}`}
                  alt={stream.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                />
                <span style={{
                  position: 'absolute', top: '12px', left: '12px',
                  background: 'var(--red)', color: 'white',
                  padding: '4px 10px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
                }}>● LIVE</span>
                <span style={{
                  position: 'absolute', top: '12px', right: '12px',
                  background: 'rgba(0,0,0,0.7)', color: 'white',
                  padding: '4px 10px', fontSize: '11px',
                }}>👁 {stream.viewers.toLocaleString()}</span>
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{ fontWeight: 600, marginBottom: '4px' }}>{stream.title}</p>
                <p style={{ fontSize: '13px', color: 'var(--gray-light)' }}>{stream.host}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '0 40px 60px' }}>
        <h2 style={{ fontSize: '42px', marginBottom: '32px' }}>SẢN PHẨM <span style={{ color: 'var(--red)' }}>NỔI BẬT</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {products.slice(0, 4).map(product => (
            <Link to={`/product/${product.id}`} key={product.id} style={{
              background: 'var(--gray)', overflow: 'hidden',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'relative', aspectRatio: '3/4', background: '#1a1a1a' }}>
                <img
                  src={`https://picsum.photos/300/400?random=${product.id + 10}`}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {product.isLive && (
                  <span style={{
                    position: 'absolute', top: '8px', left: '8px',
                    background: 'var(--red)', color: 'white',
                    padding: '3px 8px', fontSize: '10px', fontWeight: 700,
                  }}>● LIVE</span>
                )}
              </div>
              <div style={{ padding: '12px' }}>
                <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{product.name}</p>
                <p style={{ color: 'var(--red)', fontWeight: 600 }}>{product.price.toLocaleString()}đ</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}