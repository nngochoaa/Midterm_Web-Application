import { useParams, Link } from 'react-router-dom';
import { products } from 'src/Data/MockData';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id)) || products[0];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div style={{ padding: '60px 40px', maxWidth: '1100px', margin: '0 auto' }}>
      <Link to="/shop" style={{ color: 'var(--gray-light)', fontSize: '13px', display: 'block', marginBottom: '32px' }}>← Quay lại Shop</Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        {/* Images */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ aspectRatio: i === 0 ? 'auto' : '1', gridColumn: i === 0 ? '1 / -1' : 'auto' }}>
              <img
                src={`https://picsum.photos/${i === 0 ? '600/700' : '300/300'}?random=${product.id * 10 + i}`}
                alt={product.name}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
          <p style={{ gridColumn: '1/-1', fontSize: '11px', color: 'var(--gray-light)', textAlign: 'center', marginTop: '4px' }}>
            📡 Ảnh được phân phối qua CDN
          </p>
        </div>

        {/* Info */}
        <div>
          <p style={{ color: 'var(--gray-light)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{product.category}</p>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '48px', marginBottom: '16px' }}>{product.name}</h1>
          <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--red)', marginBottom: '8px' }}>{product.price.toLocaleString()}đ</p>
          <p style={{ color: 'var(--gray-light)', fontSize: '13px', marginBottom: '32px' }}>Đã bán: {product.sold} sản phẩm</p>

          {/* Sizes */}
          <p style={{ fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '0.08em' }}>Chọn Size</p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            {sizes.map(s => (
              <button key={s} style={{
                width: '44px', height: '44px', background: 'var(--gray)',
                color: 'white', border: '1px solid #333', fontWeight: 500,
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.target.style.background = 'var(--red)'; e.target.style.border = '1px solid var(--red)'; }}
                onMouseLeave={e => { e.target.style.background = 'var(--gray)'; e.target.style.border = '1px solid #333'; }}
              >
                {s}
              </button>
            ))}
          </div>

          <button style={{
            width: '100%', background: 'var(--red)', color: 'white',
            border: 'none', padding: '16px', fontWeight: 700,
            fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: '12px',
          }}>
            Thêm Vào Giỏ Hàng
          </button>
          <Link to="/live/1" style={{
            display: 'block', textAlign: 'center',
            border: '1px solid var(--red)', color: 'var(--red)',
            padding: '14px', fontSize: '14px', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            ● Xem Livestream Sản Phẩm Này
          </Link>
        </div>
      </div>
    </div>
  );
}