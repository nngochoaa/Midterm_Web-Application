// CDN base URL — sau này người kia setup xong sẽ thay URL này
export const CDN_URL = "https://cdn.example.com";
export const ORIGIN_URL = "https://origin.example.com";

export const products = [
  {
    id: 1,
    name: "Áo thun Oversize",
    price: 250000,
    image: "/images/product1.jpg",
    category: "Áo",
    isLive: true,
    sold: 128,
  },
  {
    id: 2,
    name: "Quần Jean Baggy",
    price: 450000,
    image: "/images/product2.jpg",
    category: "Quần",
    isLive: false,
    sold: 89,
  },
  {
    id: 3,
    name: "Váy Hoa Nhí",
    price: 320000,
    image: "/images/product3.jpg",
    category: "Váy",
    isLive: true,
    sold: 214,
  },
  {
    id: 4,
    name: "Áo Khoác Denim",
    price: 580000,
    image: "/images/product4.jpg",
    category: "Áo",
    isLive: false,
    sold: 55,
  },
  {
    id: 5,
    name: "Túi Tote Canvas",
    price: 180000,
    image: "/images/product5.jpg",
    category: "Phụ kiện",
    isLive: false,
    sold: 302,
  },
  {
    id: 6,
    name: "Giày Sneaker Trắng",
    price: 720000,
    image: "/images/product6.jpg",
    category: "Giày",
    isLive: false,
    sold: 76,
  },
];

export const liveStreams = [
  {
    id: 1,
    title: "FLASH SALE Áo Hè - Giảm 50%",
    host: "Shop Thời Trang Mia",
    viewers: 1243,
    thumbnail: "/images/live1.jpg",
    products: [products[0], products[3]],
  },
  {
    id: 2,
    title: "New Arrival Váy Hoa - Limited",
    host: "Boutique Linh Chi",
    viewers: 876,
    thumbnail: "/images/live2.jpg",
    products: [products[2]],
  },
];

export const mockComments = [
  { id: 1, user: "Minh Anh", text: "Áo này có size L không shop ơi?", time: 0 },
  { id: 2, user: "Thu Hà", text: "Giá bao nhiêu vậy shop?", time: 2000 },
  { id: 3, user: "Ngọc Linh", text: "Mua 2 có giảm không ạ?", time: 4000 },
  { id: 4, user: "Bảo Nam", text: "Ship Hà Nội bao lâu shop?", time: 6000 },
  { id: 5, user: "Phương Thảo", text: "Đặt 1 cái màu trắng nha shop!", time: 8000 },
  { id: 6, user: "Khánh Ly", text: "Màu xanh còn hàng không ạ?", time: 10000 },
  { id: 7, user: "Ngọc Hoa", text: "Shop cho xem mặt sau được không?", time: 12000 },
];

// Ảnh dùng để demo benchmark CDN vs non-CDN
// Sau khi có CDN thật thì thay URL vào đây
export const benchmarkImages = [
  { id: 1, filename: "bench1.jpg", originUrl: "https://picsum.photos/800/600?random=1", cdnUrl: "https://picsum.photos/800/600?random=1" },
  { id: 2, filename: "bench2.jpg", originUrl: "https://picsum.photos/800/600?random=2", cdnUrl: "https://picsum.photos/800/600?random=2" },
  { id: 3, filename: "bench3.jpg", originUrl: "https://picsum.photos/800/600?random=3", cdnUrl: "https://picsum.photos/800/600?random=3" },
  { id: 4, filename: "bench4.jpg", originUrl: "https://picsum.photos/800/600?random=4", cdnUrl: "https://picsum.photos/800/600?random=4" },
  { id: 5, filename: "bench5.jpg", originUrl: "https://picsum.photos/800/600?random=5", cdnUrl: "https://picsum.photos/800/600?random=5" },
];