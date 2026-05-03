import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from 'src/Components/Navbar';
import Footer from 'src/Components/Footer';
import Home from 'src/Pages/Home';
import Shop from 'src/Pages/Shop';
import LiveStream from 'src/Pages/LiveStream';
import ProductDetail from 'src/Pages/ProductDetail';
import Benchmark from 'src/Pages/Benchmark';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 60px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Live/:id" element={<LiveStream />} />
          <Route path="/Product/:id" element={<ProductDetail />} />
          <Route path="/Benchmark" element={<Benchmark />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}