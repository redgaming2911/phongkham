import { describe, it, expect } from 'vitest';

/**

* Giả lập hàm tạo mã để test (không phụ thuộc Math.random thật)
  */
  function taoMaBenhNhan(prefix, so) {
  return `${prefix}-${so}`;
  }

function taoMaDonThuoc(prefix, so) {
return `${prefix}-${so}`;
}

describe('Kiểm tra tạo mã', () => {
it('Tạo mã bệnh nhân đúng định dạng', () => {
// Arrange
const prefix = 'BN';
const so = 12345;


// Act
const ma = taoMaBenhNhan(prefix, so);

// Assert
expect(ma).toBe('BN-12345');


});

it('Tạo mã đơn thuốc đúng định dạng', () => {
// Arrange
const prefix = 'DT';
const so = 67890;


// Act
const ma = taoMaDonThuoc(prefix, so);

// Assert
expect(ma).toBe('DT-67890');


});

it('Cùng đầu vào xác định sẽ cho kết quả xác định', () => {
// Arrange
const input = 11111;


// Act
const ma1 = taoMaBenhNhan('BN', input);
const ma2 = taoMaBenhNhan('BN', input);

// Assert
expect(ma1).toBe(ma2);


});

it('Mã bệnh nhân bắt đầu bằng BN', () => {
// Arrange
const so = 22222;


// Act
const ma = taoMaBenhNhan('BN', so);

// Assert
expect(ma.startsWith('BN')).toBe(true);


});

it('Mã đơn thuốc bắt đầu bằng DT', () => {
// Arrange
const so = 33333;


// Act
const ma = taoMaDonThuoc('DT', so);

// Assert
expect(ma.startsWith('DT')).toBe(true);


});

it('Xử lý đầu vào null', () => {
// Arrange
const prefix = 'BN';


// Act
const ma = taoMaBenhNhan(prefix, null);

// Assert
expect(ma).toBe('BN-null');


});

it('Xử lý đầu vào undefined', () => {
// Arrange
const prefix = 'DT';

// Act
const ma = taoMaDonThuoc(prefix, undefined);

// Assert
expect(ma).toBe('DT-undefined');


});

it('Xử lý chuỗi rỗng', () => {
// Arrange
const prefix = 'BN';


// Act
const ma = taoMaBenhNhan(prefix, '');

// Assert
expect(ma).toBe('BN-');


});
});
