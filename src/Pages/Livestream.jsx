import { useState, useEffect, useRef } from 'react';
import { liveStreams, mockComments } from 'src/Data/MockData';

export default function LiveStream() {
  const [comments, setComments] = useState([]);
  const [viewers, setViewers] = useState(1243);
  const [spotlightProduct, setSpotlightProduct] = useState(null);
  const [showBuyPopup, setShowBuyPopup] = useState(false);
  const chatRef = useRef(null);
  const stream = liveStreams[0];

  // Giả lập comment tự chạy
  useEffect(() => {
    mockComments.forEach(comment => {
      setTimeout(() => {
        setComments(prev => [...prev, comment]);
      }, comment.time);
    });
  }, []);

  // Auto scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [comments]);

  // Giả lập số viewer thay đổi
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(v => v + Math.floor(Math.random() * 10 - 4));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Giả lập spotlight sản phẩm sau 5 giây
  useEffect(() => {
    setTimeout(() => {
      setSpotlightProduct(stream.products[0]);
    }, 5000);
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', height: 'calc(100vh - 60px)', background: 'var(--black)' }}>

      {/* Video + Overlay */}
      <div style={{ position: 'relative', background: '#000', display: 'flex', flexDirection: 'column' }}>

        {/* Video placeholder — sau này thay bằng HLS stream thật */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <img
            src="https://picsum.photos/1280/720?random=99"
            alt="livestream"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
          />

          {/* Live badge + Viewers */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ background: 'var(--red)', color: 'white', padding: '5px 12px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em' }}>
              ● LIVE
            </span>
            <span style={{ background: 'rgba(0,0,0,0.6)', color: 'white', padding: '5px 12px', fontSize: '12px' }}>
              👁 {viewers.toLocaleString()} đang xem
            </span>
          </div>

          {/* Host info */}
          <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
            <p style={{ fontFamily: 'Bebas Neue', fontSize: '24px' }}>{stream.host}</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{stream.title}</p>
          </div>

          {/* Spotlight Product Overlay */}
          {spotlightProduct && (
            <div style={{
              position: 'absolute', bottom: '16px', right: '16px',
              background: 'rgba(10,10,10,0.92)',
              border: '1px solid var(--red)',
              padding: '12px', width: '200px',
              animation: 'slideIn 0.4s ease',
            }}>
              <p style={{ fontSize: '10px', color: 'var(--red)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '8px' }}>
                ● SẢN PHẨM ĐANG GIỚI THIỆU
              </p>
              <img
                src={`https://picsum.photos/200/200?random=${spotlightProduct.id}`}
                alt={spotlightProduct.name}
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', marginBottom: '8px' }}
              />
              <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{spotlightProduct.name}</p>
              <p style={{ color: 'var(--red)', fontWeight: 700, marginBottom: '10px' }}>{spotlightProduct.price.toLocaleString()}đ</p>
              <button
                onClick={() => setShowBuyPopup(true)}
                style={{
                  width: '100%', background: 'var(--red)', color: 'white',
                  border: 'none', padding: '8px', fontWeight: 600, fontSize: '13px',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}
              >
                Mua Ngay
              </button>
            </div>
          )}
        </div>

        {/* Buy Popup */}
        {showBuyPopup && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
          }} onClick={() => setShowBuyPopup(false)}>
            <div style={{
              background: 'var(--gray)', padding: '40px', maxWidth: '400px', width: '90%',
            }} onClick={e => e.stopPropagation()}>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '32px', marginBottom: '16px' }}>ĐẶT HÀNG NGAY</h3>
              <p style={{ color: 'var(--gray-light)', marginBottom: '24px' }}>{spotlightProduct?.name} — {spotlightProduct?.price.toLocaleString()}đ</p>
              <input placeholder="Họ tên" style={{ width: '100%', background: '#111', border: '1px solid #333', color: 'white', padding: '10px', marginBottom: '12px', fontSize: '14px' }} />
              <input placeholder="Số điện thoại" style={{ width: '100%', background: '#111', border: '1px solid #333', color: 'white', padding: '10px', marginBottom: '12px', fontSize: '14px' }} />
              <input placeholder="Địa chỉ giao hàng" style={{ width: '100%', background: '#111', border: '1px solid #333', color: 'white', padding: '10px', marginBottom: '20px', fontSize: '14px' }} />
              <button style={{ width: '100%', background: 'var(--red)', color: 'white', border: 'none', padding: '14px', fontWeight: 700, fontSize: '15px', letterSpacing: '0.05em' }}>
                XÁC NHẬN ĐẶT HÀNG
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Panel */}
      <div style={{ borderLeft: '1px solid #2e2e2e', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #2e2e2e' }}>
          <p style={{ fontWeight: 600, fontSize: '14px' }}>Bình luận trực tiếp</p>
        </div>

        {/* Comments */}
        <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {comments.map(c => (
            <div key={c.id}>
              <span style={{ color: 'var(--red)', fontWeight: 600, fontSize: '13px' }}>{c.user}: </span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>{c.text}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '16px', borderTop: '1px solid #2e2e2e', display: 'flex', gap: '8px' }}>
          <input
            placeholder="Bình luận..."
            style={{ flex: 1, background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '8px 12px', fontSize: '13px' }}
          />
          <button style={{ background: 'var(--red)', color: 'white', border: 'none', padding: '8px 16px', fontWeight: 600, fontSize: '13px' }}>
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}