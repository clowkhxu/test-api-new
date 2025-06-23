# 🎬 Movie API Proxy

API proxy service để bọc lại Google Apps Script API, cung cấp caching và ẩn URL gốc.

## 🚀 Tính năng

- ✅ **Dynamic Path Routing**: Tự động map path từ request đến Google Apps Script
- ✅ **Smart Caching**: Cache thông minh với TTL khác nhau cho từng loại endpoint
- ✅ **Query Parameter Support**: Hỗ trợ đầy đủ query parameters
- ✅ **Error Handling**: Xử lý lỗi và timeout
- ✅ **CORS Support**: Headers CORS cho cross-origin requests
- ✅ **Performance Optimized**: Cache in-memory với cleanup tự động

## 📋 Endpoints

### Danh sách phim
```
GET /api/danh-sach/phim-moi-cap-nhat?page=1&limit=12
```

### Chi tiết phim
```
GET /api/phim/one-piece-tap-1001
```

### Tìm kiếm
```
GET /api/v1/api/tim-kiem?keyword=one+piece&page=1
```

### Thể loại
```
GET /api/v1/api/the-loai/hanh-dong?page=1&limit=12
GET /api/the-loai/hanh-dong?page=1
```

### Quốc gia
```
GET /api/v1/api/quoc-gia/han-quoc?page=1
```

### Phim bộ/lẻ
```
GET /api/v1/api/danh-sach/phim-bo?page=1
GET /api/v1/api/danh-sach/phim-le?page=1
```

### Hoạt hình
```
GET /api/v1/api/danh-sach/hoat-hinh?page=1
```

### Theo năm
```
GET /api/v1/api/nam/2024?page=1
```

### Lọc nâng cao
```
GET /api/v1/api/the-loai/hanh-dong?sort_field=year&sort_type=desc&country=han-quoc&year=2024
```

## ⚡ Cache Strategy

- **Movie Details**: 10 phút (600s)
- **Search Results**: 2 phút (120s)  
- **New Movies**: 3 phút (180s)
- **Other Lists**: 5 phút (300s)

## 🛠 Cache Management

### Xem thống kê cache
```
GET /api/cache
```

### Xóa cache
```
DELETE /api/cache
```

## 🔧 Deployment

### Deploy lên Vercel
1. Push code lên GitHub
2. Connect repository với Vercel
3. Deploy tự động

### Environment Variables
Không cần thiết lập environment variables - URL Google Apps Script đã được hardcode.

## 📊 Monitoring

API tự động log:
- Cache hits/misses
- Request paths và parameters
- Response times
- Errors

## 🔒 Security

- Rate limiting thông qua Vercel
- CORS headers được cấu hình
- Timeout protection (30s)
- Input validation

## 🚀 Performance

- In-memory caching với TTL
- CDN caching headers
- Stale-while-revalidate strategy
- Automatic cache cleanup
- Request timeout handling

## 📝 Usage Examples

### JavaScript/TypeScript
```javascript
// Fetch movie list
const response = await fetch('https://your-domain.vercel.app/api/danh-sach/phim-moi-cap-nhat?page=1');
const data = await response.json();

// Fetch movie details
const movieResponse = await fetch('https://your-domain.vercel.app/api/phim/one-piece-tap-1001');
const movieData = await movieResponse.json();

// Search movies
const searchResponse = await fetch('https://your-domain.vercel.app/api/v1/api/tim-kiem?keyword=naruto');
const searchData = await searchResponse.json();
```

### cURL
```bash
# Get new movies
curl "https://your-domain.vercel.app/api/danh-sach/phim-moi-cap-nhat?page=1"

# Get movie details
curl "https://your-domain.vercel.app/api/phim/one-piece-tap-1001"

# Search
curl "https://your-domain.vercel.app/api/v1/api/tim-kiem?keyword=one%20piece"
```