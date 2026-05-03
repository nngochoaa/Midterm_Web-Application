import { useState, useCallback } from 'react';
import { benchmarkImages } from 'src/Data/MockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Benchmark() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('origin');
  const [cacheStatus, setCacheStatus] = useState('—');

  const measureLoadTime = useCallback((url) => {
    return new Promise((resolve) => {
      const start = performance.now();
      const img = new Image();
      img.onload = () => resolve(Math.round(performance.now() - start));
      img.onerror = () => resolve(0);
      img.src = url + '&t=' + Date.now(); // cache bust
    });
  }, []);

  const runBenchmark = async (type) => {
    setLoading(true);
    setResults([]);
    setCacheStatus('Đang đo...');

    const newResults = [];
    for (const img of benchmarkImages) {
      const url = type === 'cdn' ? img.cdnUrl : img.originUrl;
      const time = await measureLoadTime(url);
      newResults.push({ name: img.filename, time, type });
      setResults([...newResults]);
    }

    const avg = Math.round(newResults.reduce((a, b) => a + b.time, 0) / newResults.length);
    setCacheStatus(type === 'cdn' ? `HIT — Avg: ${avg}ms` : `MISS — Avg: ${avg}ms`);
    setLoading(false);
  };

  const chartData = results.map(r => ({
    name: r.name,
    'Load Time (ms)': r.time,
  }));

  return (
    <div style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '56px', marginBottom: '8px' }}>CDN <span style={{ color: 'var(--red)' }}>BENCHMARK</span></h1>
      <p style={{ color: 'var(--gray-light)', marginBottom: '48px' }}>
        So sánh tốc độ tải ảnh khi dùng Origin Server vs CDN
      </p>

      {/* Cache Status Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        background: 'var(--gray)', padding: '12px 20px',
        marginBottom: '40px', borderLeft: '3px solid var(--red)',
      }}>
        <span style={{ fontSize: '12px', color: 'var(--gray-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Cache Status:</span>
        <span style={{ fontWeight: 700, color: cacheStatus.includes('HIT') ? '#4ade80' : cacheStatus === '—' ? 'white' : '#facc15' }}>
          {cacheStatus}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '32px' }}>
        {[
          { key: 'origin', label: '🌐 Origin Server' },
          { key: 'cdn', label: '⚡ CDN' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            padding: '12px 28px', fontWeight: 600, fontSize: '14px',
            background: activeTab === tab.key ? 'var(--red)' : 'var(--gray)',
            color: 'white', border: 'none',
            letterSpacing: '0.05em',
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Run Button */}
      <button
        onClick={() => runBenchmark(activeTab)}
        disabled={loading}
        style={{
          background: loading ? '#555' : 'var(--red)', color: 'white',
          border: 'none', padding: '14px 36px', fontWeight: 700,
          fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em',
          marginBottom: '40px', opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Đang đo...' : `Chạy Benchmark (${activeTab === 'cdn' ? 'CDN' : 'Origin'})`}
      </button>

      {/* Results Table */}
      {results.length > 0 && (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <th style={{ textAlign: 'left', padding: '10px 0', fontSize: '12px', color: 'var(--gray-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>File</th>
                <th style={{ textAlign: 'right', padding: '10px 0', fontSize: '12px', color: 'var(--gray-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Load Time</th>
                <th style={{ textAlign: 'right', padding: '10px 0', fontSize: '12px', color: 'var(--gray-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Nguồn</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <td style={{ padding: '12px 0', fontSize: '14px' }}>{r.name}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: r.time < 200 ? '#4ade80' : r.time < 500 ? '#facc15' : '#f87171' }}>
                    {r.time}ms
                  </td>
                  <td style={{ textAlign: 'right', fontSize: '12px', color: 'var(--gray-light)' }}>
                    {activeTab === 'cdn' ? '⚡ CDN' : '🌐 Origin'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Chart */}
          <div style={{ background: 'var(--gray)', padding: '24px' }}>
            <p style={{ fontFamily: 'Bebas Neue', fontSize: '22px', marginBottom: '20px' }}>BIỂU ĐỒ LOAD TIME</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888', fontSize: 11 }} />
                <YAxis stroke="#888" tick={{ fill: '#888', fontSize: 11 }} unit="ms" />
                <Tooltip
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #333', color: 'white' }}
                  formatter={(v) => [`${v}ms`, 'Load Time']}
                />
                <Bar dataKey="Load Time (ms)" fill={activeTab === 'cdn' ? '#4ade80' : '#e63329'} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}