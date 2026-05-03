import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from 'src/Data/MockData';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const categories = ['Tất cả', 'Áo', 'Quần', 'Váy', 'Giày', 'Phụ kiện'];

  const filtered = activeCategory === 'Tất cả'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ padding: '60px 40px' }}>
      <h1 style={{ fontSize: '56px', marginBottom: '8px' }}>CỬA HÀNG</h1>
      <p style={{ color: 'var(--gray-light)', marginBottom: '40px' }}>
        Ảnh sản phẩm được phân phối qua CDN — tải nhanh hơn từ mọi nơi
      </p>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '8px 20px', fontSize: '13px', fontWeight: 500,
            background: activeCategory === cat ? 'var(--red)' : 'var(--gray)',
            color: 'white', border: 'none',
            letterSpacing: '0.05em', textTransform: 'uppercase',
            transition: 'background 0.2s',
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {filtered.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} style={{
            background: 'var(--gray)', overflow: 'hidden',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ position: 'relative', aspectRatio: '3/4', background: '#111' }}>
              {/* Đây là ảnh từ CDN — sau này thay bằng CDN URL thật */}
              <img
                src={`https://picsum.photos/300/400?random=${product.id + 20}`}
                alt={product.name}
                loading="lazy"
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
            <div style={{ padding: '14px' }}>
              <p style={{ fontSize: '13px', color: 'var(--gray-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{product.category}</p>
              <p style={{ fontWeight: 600, margin: '4px 0' }}>{product.name}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: 'var(--red)', fontWeight: 700 }}>{product.price.toLocaleString()}đ</p>
                <p style={{ fontSize: '12px', color: 'var(--gray-light)' }}>Đã bán: {product.sold}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}