export default function Home() {
  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>🎬 Movie API Proxy</h1>
      <p>API proxy service đang hoạt động!</p>
      
      <h2>📋 Các endpoint có sẵn:</h2>
      <ul>
        <li><strong>Danh sách phim mới:</strong> <code>/api/danh-sach/phim-moi-cap-nhat?page=1</code></li>
        <li><strong>Chi tiết phim:</strong> <code>/api/phim/one-piece-tap-1001</code></li>
        <li><strong>Tìm kiếm:</strong> <code>/api/v1/api/tim-kiem?keyword=one+piece</code></li>
        <li><strong>Thể loại:</strong> <code>/api/v1/api/the-loai/hanh-dong?page=1</code></li>
        <li><strong>Quốc gia:</strong> <code>/api/v1/api/quoc-gia/han-quoc?page=1</code></li>
        <li><strong>Phim bộ:</strong> <code>/api/v1/api/danh-sach/phim-bo?page=1</code></li>
        <li><strong>Phim lẻ:</strong> <code>/api/v1/api/danh-sach/phim-le?page=1</code></li>
        <li><strong>Hoạt hình:</strong> <code>/api/v1/api/danh-sach/hoat-hinh?page=1</code></li>
        <li><strong>Theo năm:</strong> <code>/api/v1/api/nam/2024?page=1</code></li>
      </ul>

      <h2>⚡ Tính năng:</h2>
      <ul>
        <li>✅ Cache 5 phút cho hiệu suất tối ưu</li>
        <li>✅ Hỗ trợ tất cả query parameters</li>
        <li>✅ Ẩn URL gốc Google Apps Script</li>
        <li>✅ CORS headers cho cross-origin requests</li>
        <li>✅ Error handling và logging</li>
      </ul>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px' 
      }}>
        <h3>🔗 Ví dụ sử dụng:</h3>
        <pre style={{ overflow: 'auto' }}>
{`// Lấy danh sách phim mới
fetch('/api/danh-sach/phim-moi-cap-nhat?page=1')
  .then(res => res.json())
  .then(data => console.log(data));

// Lấy chi tiết phim
fetch('/api/phim/one-piece-tap-1001')
  .then(res => res.json())
  .then(data => console.log(data));`}
        </pre>
      </div>
    </div>
  );
}