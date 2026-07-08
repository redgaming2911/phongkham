# PHÒNG KHÁM MINI – TIẾP NHẬN BỆNH NHÂN VÀ KÊ ĐƠN THUỐC

## 1. Giới thiệu

Ứng dụng web nhỏ phục vụ quản lý phòng khám:

- Tiếp nhận bệnh nhân
- Khám bệnh và kê đơn thuốc
- Quản lý lịch sử đơn thuốc

Dự án được xây dựng nhằm mục đích học tập:

- HTML, CSS, JavaScript ES Module
- Tổ chức code theo module
- Làm việc với LocalStorage
- Viết Unit Test, Business Test
- Viết UI Test với Playwright
- CI/CD với GitHub Actions
- Deploy GitHub Pages

---

## 2. Công nghệ sử dụng

- HTML5, CSS3
- JavaScript (ES Module)
- Vite
- Vitest
- Playwright

---

## 3. Cài đặt dự án

```bash
npm install
```

---

## 4. Chạy môi trường phát triển

```bash
npm run dev
```

---

## 5. Build production

```bash
npm run build
```

---

## 6. Preview production

```bash
npm run preview
```

Dùng cho test E2E:

```bash
npm run preview:test
```

---

## 7. Chạy test

### Unit Test

```bash
npm run test:unit
```

### Business Test

```bash
npm run test:business
```

### Test có coverage

```bash
npm run test:coverage
```

### E2E Test (Playwright)

```bash
npm run test:e2e
```

### E2E UI mode

```bash
npm run test:e2e:ui
```

### Xem report E2E

```bash
npm run test:e2e:report
```

### Chạy toàn bộ test

```bash
npm run test:all
```

---

## 8. Cấu trúc thư mục

```bash
src/
  css/
  js/
    constants/
    utils/
    repositories/
    business/
    services/
    ui/

tests/
  unit/
  business/
  e2e/
```

---

## 9. Quy tắc phát triển

- Không dùng framework (React, Vue, Angular)
- Sử dụng ES Module
- Tên biến, hàm bằng tiếng Việt không dấu
- Phân tách rõ:
  - UI
  - Service
  - Business
  - Repository

- Không viết logic nghiệp vụ trong UI

---

## 10. CI/CD

- GitHub Actions chạy:
  - Unit Test
  - Business Test
  - E2E Test

---

## 11. Triển khai

Deploy lên GitHub Pages từ thư mục `dist`.

---

## 12. Ghi chú

- Không dùng đường dẫn tuyệt đối bắt đầu bằng `/`
- Không lưu dữ liệu ngoài LocalStorage
- Không tự động đề xuất thuốc

---

## 13. Tác giả

Sinh viên thực hành dự án Phòng khám Mini
